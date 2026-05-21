// 🇮🇳 Modi Lang — Synchronous Readline Helper
// Simple sync input for chai_pe_charcha

const fs = require('fs');

function readlineSync(prompt) {
  if (prompt) process.stdout.write(prompt + ' ');

  // Check if stdin has data
  if (process.stdin.isTTY) {
    // Interactive mode - return empty for now
    // In a real app, use readline with async
    return '';
  } else {
    // Piped input mode
    const buf = Buffer.alloc(1024);
    try {
      const bytesRead = fs.readSync(0, buf, 0, buf.length);
      return buf.toString('utf8', 0, bytesRead).trim();
    } catch (e) {
      return '';
    }
  }
}

module.exports = readlineSync;
