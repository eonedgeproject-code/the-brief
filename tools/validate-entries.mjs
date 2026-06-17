#!/usr/bin/env node
// Validate every capture in entries/ against the frontmatter schema in STRUCTURE.md.
//
// Pure Node, no dependencies (the frontmatter is a small, constrained subset of YAML,
// so a purpose-built parser is safer here than pulling in a YAML library). Run with:
//
//     node tools/validate-entries.mjs
//
// Exit code 0 if every entry is valid, 1 if any entry has an error. Warnings never
// fail the run on their own. See tools/README.md for what is and isn't checked.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRIES = join(ROOT, 'entries');

const SURFACES = ['web-app', 'api', 'mobile', 'desktop', 'ide-extension', 'other'];
const METHODS = ['self-extracted', 'community-leaked', 'official-disclosure', 'behavioral-inference'];
const CONFIDENCE = ['high', 'medium', 'low'];
const NEEDS_SOURCES = ['community-leaked', 'official-disclosure'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// ---- tiny frontmatter parser ------------------------------------------------

function parseScalar(raw) {
  let s = raw.trim();
  if (s === '' ) return '';
  if (s === '[]') return [];
  if (s === 'null' || s === '~') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+$/.test(s)) return Number(s);
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s;
}

// Returns { ok, data, error }. data has top-level keys plus nested `subject` and `sources`.
function parseFrontmatter(text) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/);
  if (lines[0].trim() !== '---') return { ok: false, error: 'file does not start with a "---" frontmatter fence' };
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { ok: false, error: 'frontmatter is not closed by a second "---"' };

  const data = {};
  let mode = 'top';        // 'top' | 'subject' | 'sources'
  let curSource = null;

  for (let i = 1; i < end; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    if (line.trimStart().startsWith('#')) continue; // whole-line comment

    const indent = line.length - line.trimStart().length;
    const m = line.trimStart().match(/^(-\s+)?([A-Za-z_][\w]*):\s?(.*)$/);

    if (indent === 0) {
      if (!m) return { ok: false, error: `cannot parse line ${i + 1}: "${line}"` };
      const key = m[2];
      const rest = m[3];
      if (key === 'subject' && rest.trim() === '') { data.subject = {}; mode = 'subject'; continue; }
      if (key === 'sources') {
        const v = parseScalar(rest);
        if (Array.isArray(v)) { data.sources = []; mode = 'top'; }
        else { data.sources = []; mode = 'sources'; }
        continue;
      }
      data[key] = parseScalar(rest);
      mode = 'top';
      continue;
    }

    if (mode === 'subject' && indent === 2 && m) {
      data.subject[m[2]] = parseScalar(m[3]);
      continue;
    }

    if (mode === 'sources') {
      const isItem = line.trimStart().startsWith('- ');
      if (isItem && m) {              // "  - url: ..."
        curSource = {};
        data.sources.push(curSource);
        curSource[m[2]] = parseScalar(m[3]);
        continue;
      }
      if (m && curSource) {           // "    author: ..."
        curSource[m[2]] = parseScalar(m[3]);
        continue;
      }
    }
    return { ok: false, error: `unexpected indentation at line ${i + 1}: "${line}"` };
  }
  return { ok: true, data, body: lines.slice(end + 1).join('\n') };
}

// ---- validation -------------------------------------------------------------

function req(obj, key, errors, label) {
  const v = obj?.[key];
  if (v === undefined || v === '') errors.push(`missing required field: ${label || key}`);
  return v;
}

function validate(relPath, text) {
  const errors = [];
  const warnings = [];
  const parsed = parseFrontmatter(text);
  if (!parsed.ok) { errors.push(parsed.error); return { errors, warnings }; }
  const d = parsed.data;
  const body = parsed.body || '';

  // subject
  const subj = d.subject || {};
  if (!d.subject) errors.push('missing required block: subject');
  req(subj, 'vendor', errors, 'subject.vendor');
  req(subj, 'product', errors, 'subject.product');
  req(subj, 'model', errors, 'subject.model');
  const surface = req(subj, 'surface', errors, 'subject.surface');
  if (surface && !SURFACES.includes(surface)) errors.push(`subject.surface "${surface}" not in {${SURFACES.join(', ')}}`);
  if (!('model_id' in subj)) warnings.push('subject.model_id absent (use null if unknown)');

  // method
  const method = req(d, 'method', errors);
  if (method && !METHODS.includes(method)) errors.push(`method "${method}" not in {${METHODS.join(', ')}}`);

  // dates
  const captured = req(d, 'captured', errors);
  if (captured && !ISO_DATE.test(String(captured))) errors.push(`captured "${captured}" is not ISO 8601 (YYYY-MM-DD)`);
  if (NEEDS_SOURCES.includes(method)) {
    if (d.accessed === undefined) errors.push('accessed is required for ' + method);
    else if (d.accessed && !ISO_DATE.test(String(d.accessed))) errors.push(`accessed "${d.accessed}" is not ISO 8601`);
    else if (d.accessed === null) warnings.push(`accessed is null but ${method} should record an access date`);
  }

  // confidence
  const confidence = req(d, 'confidence', errors);
  if (confidence && !CONFIDENCE.includes(confidence)) errors.push(`confidence "${confidence}" not in {${CONFIDENCE.join(', ')}}`);
  if (method === 'behavioral-inference' && confidence === 'high') errors.push('behavioral-inference cannot be confidence high (see methodology/behavioral-inference.md)');

  // reproduced / attempts / partial
  if ('reproduced' in d && ![true, false, null].includes(d.reproduced)) errors.push('reproduced must be true, false, or null');
  if ('attempts' in d && !(d.attempts === null || Number.isInteger(d.attempts))) errors.push('attempts must be an integer or null');
  if (!('partial' in d)) errors.push('missing required field: partial');
  else if (typeof d.partial !== 'boolean') errors.push('partial must be true or false');

  // sources
  if (!('sources' in d)) errors.push('missing required field: sources (use [] when not applicable)');
  else {
    const srcs = d.sources;
    if (NEEDS_SOURCES.includes(method) && (!Array.isArray(srcs) || srcs.length === 0)) {
      errors.push(`sources must be non-empty for ${method}`);
    }
    if (Array.isArray(srcs)) srcs.forEach((s, i) => { if (!s.url) errors.push(`sources[${i}] missing url`); });
  }

  // filename: <YYYY-MM-DD>-<method>.md
  const fname = basename(relPath);
  const fm = fname.match(/^(\d{4}-\d{2}-\d{2})-([a-z-]+?)(?:-\d+)?\.md$/);
  if (!fm) warnings.push(`filename "${fname}" does not match <YYYY-MM-DD>-<method>.md`);
  else if (method && fm[2] !== method) warnings.push(`filename method "${fm[2]}" disagrees with frontmatter method "${method}"`);

  // required body sections
  for (const h of ['## Provenance', '## Prompt', '## Confidence']) {
    if (!body.includes(h)) errors.push(`body is missing required section "${h}"`);
  }
  if (d.supersedes && !body.includes('## Changes from previous capture')) {
    errors.push('supersedes is set but body has no "## Changes from previous capture" section');
  }

  return { errors, warnings };
}

// ---- walk & report ----------------------------------------------------------

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md') && name !== 'README.md' && name !== 'TEMPLATE.md') out.push(p);
  }
  return out;
}

const files = walk(ENTRIES).sort();
let bad = 0, warned = 0;
for (const f of files) {
  const rel = f.slice(ROOT.length + 1).replace(/\\/g, '/');
  const { errors, warnings } = validate(rel, readFileSync(f, 'utf8'));
  if (errors.length) {
    bad++;
    console.log(`✗ ${rel}`);
    for (const e of errors) console.log(`    ERROR: ${e}`);
    for (const w of warnings) console.log(`    warn:  ${w}`);
  } else if (warnings.length) {
    warned++;
    console.log(`⚠ ${rel}`);
    for (const w of warnings) console.log(`    warn:  ${w}`);
  } else {
    console.log(`✓ ${rel}`);
  }
}

console.log(`\n${files.length} entr${files.length === 1 ? 'y' : 'ies'} checked — ${files.length - bad} valid, ${bad} with errors, ${warned} with warnings only.`);
process.exit(bad ? 1 : 0);
