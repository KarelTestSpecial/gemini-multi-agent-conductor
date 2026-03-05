import fs from 'fs';
import path from 'path';

const role = process.argv[2];
const id = process.argv[3] || 'A1';
const signalDir = 'conductor';
// ARCHITECT wacht op ARCHITECT.GO, AGENT wacht op AGENT.GO
const signalFile = path.join(signalDir, (role === 'architect' || role === 'lead') ? 'ARCHITECT.GO' : 'AGENT.GO');

console.log(`📡 [PULSE v9.0] ${role.toUpperCase()} listening for ${signalFile}...`);

function checkSignal() {
    if (fs.existsSync(signalFile)) {
        console.log(`\n✅ [SIGNAL DETECTED] ${signalFile} found!`);
        // We verwijderen het bestand direct (Acknowledge)
        try { fs.unlinkSync(signalFile); } catch (e) {}
        process.exit(0);
    }
}

// Initial Scan
checkSignal();

// Polling Loop (Elke 500ms voor maximale betrouwbaarheid)
const interval = setInterval(checkSignal, 500);

// Safety Timeout (280s)
setTimeout(() => {
    clearInterval(interval);
    console.log(`\n⏳ [TIMEOUT] No signal.`);
    process.exit(2);
}, 280000);
