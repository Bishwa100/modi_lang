# 🇮🇳 Modi Lang — Install Script (Windows PowerShell)
# "Mitron, ek hi command mein sab ho jayega!"

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "  ███╗   ███╗ ██████╗ ██████╗ ██╗    ██╗      █████╗ ███╗   ██╗ ██████╗ " -ForegroundColor Yellow
Write-Host "  ████╗ ████║██╔═══██╗██╔══██╗██║    ██║     ██╔══██╗████╗  ██║██╔════╝ " -ForegroundColor Yellow
Write-Host "  ██╔████╔██║██║   ██║██║  ██║██║    ██║     ███████║██╔██╗ ██║██║  ███╗" -ForegroundColor Yellow
Write-Host "  ██║╚██╔╝██║██║   ██║██║  ██║██║    ██║     ██╔══██║██║╚██╗██║██║   ██║" -ForegroundColor Yellow
Write-Host "  ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║    ███████╗██║  ██║██║ ╚████║╚██████╔╝" -ForegroundColor Yellow
Write-Host "  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ " -ForegroundColor Yellow
Write-Host ""
Write-Host "  🇮🇳 Installing Modi Lang — The Deshbhakt Programming Language" -ForegroundColor Yellow
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node -v 2>$null
    Write-Host "  ✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  🚨 Node.js nahi mila! Pehle Node.js install karo!" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Install Node.js from: https://nodejs.org" -ForegroundColor Cyan
    Write-Host "  Or use winget: winget install OpenJS.NodeJS.LTS" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Check npm
try {
    $npmVersion = npm -v 2>$null
    Write-Host "  ✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  🚨 npm nahi mila! Node.js ke saath npm aana chahiye." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "  📦 Installing Modi Lang globally..." -ForegroundColor Cyan
Write-Host ""

# Install Modi Lang
npm install -g modi-lang

Write-Host ""
Write-Host "  🎉 Modi Lang successfully installed!" -ForegroundColor Green
Write-Host ""
Write-Host "  Quick start:" -ForegroundColor Cyan
Write-Host "    modi repl                  — Start interactive REPL" -ForegroundColor Yellow
Write-Host "    modi init my-project       — Create a new project" -ForegroundColor Yellow
Write-Host "    modi run file.modi         — Run a program" -ForegroundColor Yellow
Write-Host "    modi help                  — Show help" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Mitron, ab coding bhi deshbhakti hai! Jai Hind! 🇮🇳" -ForegroundColor Yellow
Write-Host ""
