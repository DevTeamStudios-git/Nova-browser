const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

test('Electron page rendering, layout and browser controls', { timeout: 90000 }, () => {
  const env = { ...process.env };
  env.NOVA_UI_PORT = '0';
  delete env.ELECTRON_RUN_AS_NODE;
  const result = spawnSync(require('electron'), [path.join(__dirname, 'rendering-smoke.cjs')], {
    env, encoding: 'utf8', timeout: 80000, windowsHide: true,
  });
  assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Rendering checks passed/);
  console.log(result.stdout.trim());
});
