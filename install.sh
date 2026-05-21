#!/bin/bash
# 🇮🇳 Modi Lang — Install Script (Mac/Linux)
# "Mitron, ek hi command mein sab ho jayega!"

set -e

# Colors
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo ""
echo -e "${ORANGE}"
echo "  ███╗   ███╗ ██████╗ ██████╗ ██╗    ██╗      █████╗ ███╗   ██╗ ██████╗ "
echo "  ████╗ ████║██╔═══██╗██╔══██╗██║    ██║     ██╔══██╗████╗  ██║██╔════╝ "
echo "  ██╔████╔██║██║   ██║██║  ██║██║    ██║     ███████║██╔██╗ ██║██║  ███╗"
echo "  ██║╚██╔╝██║██║   ██║██║  ██║██║    ██║     ██╔══██║██║╚██╗██║██║   ██║"
echo "  ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║    ███████╗██║  ██║██║ ╚████║╚██████╔╝"
echo "  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ "
echo -e "${NC}"
echo -e "${ORANGE}  🇮🇳 Installing Modi Lang — The Deshbhakt Programming Language${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}🚨 Node.js nahi mila! Pehle Node.js install karo!${NC}"
    echo ""
    echo -e "${CYAN}Install Node.js:${NC}"
    echo "  macOS:  brew install node"
    echo "  Ubuntu: sudo apt install nodejs npm"
    echo "  Or visit: https://nodejs.org"
    echo ""
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js found: ${NODE_VERSION}${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}🚨 npm nahi mila! Node.js ke saath npm aana chahiye.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm found: v${NPM_VERSION}${NC}"
echo ""

# Install Modi Lang
echo -e "${CYAN}📦 Installing Modi Lang globally...${NC}"
echo ""
npm install -g modi-lang

echo ""
echo -e "${GREEN}${BOLD}🎉 Modi Lang successfully installed!${NC}"
echo ""
echo -e "${CYAN}Quick start:${NC}"
echo -e "  ${ORANGE}modi repl${NC}                  — Start interactive REPL"
echo -e "  ${ORANGE}modi init my-project${NC}       — Create a new project"
echo -e "  ${ORANGE}modi run file.modi${NC}         — Run a program"
echo -e "  ${ORANGE}modi help${NC}                  — Show help"
echo ""
echo -e "${ORANGE}Mitron, ab coding bhi deshbhakti hai! Jai Hind! 🇮🇳${NC}"
echo ""
