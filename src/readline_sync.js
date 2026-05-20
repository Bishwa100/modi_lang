// 🇮🇳 Modi Lang — Synchronous Readline Helper
// Simple sync input for chai_pe_charcha

const fs = require('fs');

function readlineSync(prompt) {
  if (prompt) process.stdout.write(prompt + ' ');

  const buf = Buffer.alloc(1024);
  let input = '';

  // Read from stdin synchronously
  try {
    const fd = fs.openSync('/dev/stdin', 'r');
    const bytesRead = fs.readSync(fd, buf, 0, buf.length);
    input = buf.toString('utf8', 0, bytesRead).trim();
    fs.closeSync(fd);
  } catch (e) {
    // Windows fallback using child_process
    try {
      const { execSync } = require('child_process');
      input = execSync('cmd /c "set /p input= && echo %input%"', {
        stdio: ['inherit', 'pipe', 'pipe'],
        encoding: 'utf8'
      }).trim();
    } catch (e2) {
      // Last resort — use 0 for stdin fd
      try {
        const bytesRead = fs.readSync(0, buf, 0, buf.length);
        input = buf.toString('utf8', 0, bytesRead).trim();
      } catch (e3) {
        input = '';
      }
    }
  }

  return input;
}

module.exports = readlineSync;
