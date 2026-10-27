const { test } = require('node:test');
const assert = require('node:assert/strict');
const { requestAI } = require('../ai-request');
const request = { url: 'https://api.openai.com/v1/chat/completions',
  headers: { Authorization: 'Bearer test-only-key' }, body: JSON.stringify({messages:[{role:'user',content:'Hello'}]}) };

test('AI transport passes credentials and provider errors without browser CORS', async () => {
  const result = await requestAI(request, async (url, options) => {
    assert.equal(url, request.url);
    assert.equal(options.headers.Authorization, 'Bearer test-only-key');
    assert.equal(options.method, 'POST');
    assert.equal(options.redirect, 'error');
    assert.equal(options.credentials, 'omit');
    return {ok:false,status:401,json:async () => ({error:{message:'Invalid test key'}})};
  });
  assert.equal(result.status, 401);
  assert.equal(result.data.error.message, 'Invalid test key');
});

test('AI transport limits requests to supported provider endpoints', async () => {
  for (const url of ['https://example.com/', 'http://api.openai.com/v1/chat/completions',
    'https://api.openai.com/v1/files', 'https://test:secret@api.openai.com/v1/chat/completions']) {
    await assert.rejects(requestAI({...request,url}, () => assert.fail('must not fetch')), /Unsupported/);
  }
});

test('AI transport times out and releases the pending request', async () => {
  await assert.rejects(requestAI(request, (_url, {signal}) => new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')));
  }), 20), /timed out/);
});

test('AI transport explains invalid provider responses', async () => {
  await assert.rejects(requestAI(request, async () => ({status:502,json:async () => { throw Error('not JSON'); }})), /invalid response.*502/);
});
