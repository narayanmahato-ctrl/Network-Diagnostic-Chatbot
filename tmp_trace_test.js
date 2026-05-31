const http = require('http');
const data = JSON.stringify({ command: 'trace google.com' });
const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/command',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  },
  timeout: 120000
};
const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
  });
});
req.on('timeout', () => { console.log('REQUEST TIMEOUT'); req.abort(); });
req.on('error', e => console.log('ERROR', e.message));
req.write(data);
req.end();
