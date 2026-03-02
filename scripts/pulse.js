import fs from 'fs';
const role = process.argv[2] || 'unknown';
const id = process.argv[3] || 'unknown';

console.log(`📡 Pulse active for ${role}: ${id} (v2.1)`);
console.log(`📂 Monitoring conductor/execution_log.md... (Stop bij nieuwe DIRECTIVE)`);

let lastContent = '';
if (fs.existsSync('conductor/execution_log.md')) {
  lastContent = fs.readFileSync('conductor/execution_log.md', 'utf8');
}

const interval = setInterval(() => {
  if (fs.existsSync('conductor/execution_log.md')) {
    const currentContent = fs.readFileSync('conductor/execution_log.md', 'utf8');
    if (currentContent !== lastContent) {
      const diff = currentContent.replace(lastContent, '').trim();
      if (diff.includes('[DIRECTIVE]')) {
        console.log(`\n⚠️ NIEUWE DIRECTIVE GEVONDEN:\n${diff}`);
        console.log(`🛑 Pulse stopt nu voor uitvoering.`);
        clearInterval(interval);
        process.exit(0);
      }
      lastContent = currentContent;
    }
  }
}, 2000);
