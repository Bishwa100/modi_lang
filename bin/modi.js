#!/usr/bin/env node
// 🇮🇳 Modi Lang CLI — "Mitron, chaliye shuru karte hain!"

const fs = require('fs');
const path = require('path');
const { Lexer } = require('../src/lexer');
const { Parser } = require('../src/parser');
const { Evaluator } = require('../src/evaluator');
const { startRepl } = require('../src/repl');
const { ModiError } = require('../src/errors');

// Read version from package.json
const pkg = require('../package.json');
const VERSION = pkg.version;

const BANNER = `\x1b[93m
  ███╗   ███╗ ██████╗ ██████╗ ██╗    ██╗      █████╗ ███╗   ██╗ ██████╗ 
  ████╗ ████║██╔═══██╗██╔══██╗██║    ██║     ██╔══██╗████╗  ██║██╔════╝ 
  ██╔████╔██║██║   ██║██║  ██║██║    ██║     ███████║██╔██╗ ██║██║  ███╗
  ██║╚██╔╝██║██║   ██║██║  ██║██║    ██║     ██╔══██║██║╚██╗██║██║   ██║
  ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║    ███████╗██║  ██║██║ ╚████║╚██████╔╝
  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
\x1b[0m\x1b[33m  🇮🇳 The Deshbhakt Programming Language — v${VERSION}
  "Mitron, ab coding bhi deshbhakti hai!"\x1b[0m
`;

function runFile(filePath) {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`\n\x1b[31m🚨 File nahi mili! Shayad Swachh Bharat mein saaf ho gayi! 🧹\n   '${filePath}' not found\x1b[0m\n`);
    process.exit(1);
  }

  if (!resolvedPath.endsWith('.modi')) {
    console.error(`\n\x1b[31m🚨 Mitron, sirf .modi files chalegi! Ye koi aur language nahi hai! 🤷\x1b[0m\n`);
    process.exit(1);
  }

  const source = fs.readFileSync(resolvedPath, 'utf-8');

  try {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const evaluator = new Evaluator();
    evaluator.run(ast);
  } catch (e) {
    if (e instanceof ModiError) {
      console.error(`\x1b[31m${e.toString()}\x1b[0m`);
    } else {
      console.error(`\x1b[31m\n🚨 BREAKING: Program crashed! Blame it on Congress! 😂\n   ${e.message}\x1b[0m\n`);
    }
    process.exit(1);
  }
}

function initProject(dirName) {
  const targetDir = dirName ? path.resolve(dirName) : process.cwd();
  const projectName = dirName || path.basename(targetDir);

  // Create directory if specified
  if (dirName && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const mainFile = path.join(targetDir, 'main.modi');
  const readmeFile = path.join(targetDir, 'README.md');

  if (fs.existsSync(mainFile)) {
    console.error('\x1b[31m🚨 main.modi already exists! Pehle se project hai yahan! 📁\x1b[0m');
    process.exit(1);
  }

  // Create main.modi
  const mainContent = `namaste

// 🇮🇳 ${projectName} — A Modi Lang Project
// Mitron, yahan se shuru karo!

modi message = "Namaste Duniya! 🇮🇳";
mann_ki_baat(message);

// Variables
modi name = "Mitron";
modi year = 2026;
mann_ki_baat(name + ", saal hai " + year + "!");

// Conditionals
agar_modi (year >= 2026) {
    mann_ki_baat("Acche din aa gaye! 🎉");
} nahi_toh {
    mann_ki_baat("Acche din aane wale hain...");
}

// Loop
mann_ki_baat("\\nGinti:");
sabka_saath (modi i = 1; i <= 5; i = i + 1) {
    mann_ki_baat("  " + i + " 🪷");
}

mann_ki_baat("\\nJai Hind! 🇮🇳");

jai_hind
`;

  // Create README.md
  const readmeContent = `# ${projectName}

A project built with [Modi Lang](https://github.com/bishwa100/modi-lang) 🇮🇳

## Run

\`\`\`bash
modi run main.modi
\`\`\`

## About Modi Lang

Modi Lang is a fun programming language where every keyword is a famous Modi catchphrase.

Install: \`npm install -g modi-lang\`
`;

  fs.writeFileSync(mainFile, mainContent, 'utf-8');
  fs.writeFileSync(readmeFile, readmeContent, 'utf-8');

  console.log(`
\x1b[32m🇮🇳 Naya Bharat! Project initialized successfully! 🎉\x1b[0m

  \x1b[36mCreated:\x1b[0m
    📄 main.modi    — Your first Modi Lang program
    📄 README.md    — Project documentation

  \x1b[36mNext steps:\x1b[0m
    \x1b[33m${dirName ? `cd ${dirName}\n    ` : ''}modi run main.modi\x1b[0m

  Jai Hind! 🇮🇳
`);
}

function showHelp() {
  console.log(BANNER);
  console.log(`
\x1b[36mUsage:\x1b[0m
  modi <command> [options]

\x1b[36mCommands:\x1b[0m
  \x1b[32mrun <file.modi>\x1b[0m     Run a Modi Lang program
  \x1b[32mrepl\x1b[0m                Start interactive REPL
  \x1b[32minit [name]\x1b[0m          Create a new Modi Lang project
  \x1b[32mhelp\x1b[0m                Show this help message
  \x1b[32mversion\x1b[0m             Show version

\x1b[36mExamples:\x1b[0m
  modi run hello.modi          \x1b[90m# Run a program\x1b[0m
  modi repl                    \x1b[90m# Start interactive REPL\x1b[0m
  modi init my-project         \x1b[90m# Create new project\x1b[0m
  modi hello.modi              \x1b[90m# Run directly (shorthand)\x1b[0m

\x1b[36mInstallation:\x1b[0m
  npm install -g modi-lang     \x1b[90m# Install globally\x1b[0m

\x1b[33mMitron, coding mein deshbhakti dikhao! 🇮🇳\x1b[0m
`);
}

// --- CLI Entry ---
const args = process.argv.slice(2);

if (args.length === 0) {
  // No args = start REPL
  console.log(BANNER);
  startRepl();
} else {
  const command = args[0];

  switch (command) {
    case 'run':
      if (!args[1]) {
        console.error('\x1b[31m🚨 Mitron, file ka naam toh batao! Usage: modi run <file.modi>\x1b[0m');
        process.exit(1);
      }
      runFile(args[1]);
      break;
    case 'repl':
      console.log(BANNER);
      startRepl();
      break;
    case 'init':
      initProject(args[1]);
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    case 'version':
    case '--version':
    case '-v':
      console.log(`Modi Lang v${VERSION} 🇮🇳`);
      break;
    default:
      // Assume it's a file path
      if (command.endsWith('.modi')) {
        runFile(command);
      } else {
        console.error(`\x1b[31m🚨 Ye kya command hai mitron? '${command}' toh samajh nahi aaya!\x1b[0m`);
        showHelp();
        process.exit(1);
      }
  }
}
