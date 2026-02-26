const http = require('http');
const PORT = 9999; // Of kies een andere vrije poort

const mode = process.argv[2];

if (mode === 'wait') {
  console.log(`📡 LEAD: Waiting for Execution Agent signal on port ${PORT}...`);
  http.createServer((req, res) => {
    console.log('🔔 SIGNAL RECEIVED: Execution Agent is done!');
    res.end('OK');
    process.exit(0);
  }).listen(PORT);
} else if (mode === 'ping') {
  http.get(`http://localhost:${PORT}`, (res) => {
    console.log('🚀 PING SENT: Lead Architect notified.');
  }).on('error', (err) => {
    console.error('❌ ERROR: Could not reach Lead Architect. Is the wait script running?');
    process.exit(1);
  });
} else {
  console.log('Usage: node sync.js [wait|ping]');
}
