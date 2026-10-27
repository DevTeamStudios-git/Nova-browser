const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('settings translations contain all six languages and cover settings labels and descriptions', () => {
  const root = path.join(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'i18n.js'), 'utf8');
  const rows = source.match(/const rows = `([\s\S]+?)`\.trim/)[1].trim().split('\n').filter(Boolean).map(row => row.split('|'));
  for (const row of rows) {
    assert.equal(row.length, 6, row[0]);
    assert.ok(row.every(Boolean), row[0]);
  }
  const catalog = new Set(rows.map(row => row[0]));
  const unchangedNames = /^(JavaScript|Anthropic Claude|OpenAI|Google Gemini|OpenRouter|Together AI|claude-|gpt-|gemini-)/;
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of html.matchAll(/class="sp-(?:page-title|page-sub|row-title|row-desc)"[^>]*>([^<]+)</g)) {
    const text = match[1].replaceAll('&amp;', '&');
    assert.ok(catalog.has(text) || unchangedNames.test(text), `Missing translation: ${text}`);
  }
});
