#!/usr/bin/env node
// 🇮🇳 Modi Lang CLI — "Mitron, chaliye shuru karte hain!"

const fs = require('fs');
const path = require('path');
const { Lexer } = require('../src/lexer');
const { Parser } = require('../src/parser');
const { Evaluator } = require('../src/evaluator');
const { startRepl } = require('../src/repl');
const { ModiError } = require('../src/errors');

const BANNER = `\x1b[93m
  ███╗   ███╗ ██████╗ ██████╗ ██╗    ██╗      █████╗ ███╗   ██╗ ██████╗ 
  ████╗ ████║██╔═══██╗██╔══██╗██║    ██║     ██╔══██╗████╗  ██║██╔════╝ 
  ██╔████╔██║██║   ██║██║  ██║██║    ██║     ███████║██╔██╗ ██║██║  ███╗
  ██║╚██╔╝██║██║   ██║██║  ██║██║    ██║     ██╔══██║██║╚██╗██║██║   ██║
  ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║    ███████╗██║  ██║██║ ╚████║╚██████╔╝
  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
\x1b[0m\x1b[33m  🇮🇳 The Deshbhakt Programming Language — v1.0.0
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

function showHelp() {
  console.log(BANNER);
  console.log(`
\x1b[36mUsage:\x1b[0m
  node bin/modi.js <command> [options]

\x1b[36mCommands:\x1b[0m
  \x1b[32mrun <file.modi>\x1b[0m    Run a Modi Lang program
  \x1b[32mrepl\x1b[0m               Start interactive REPL
  \x1b[32mhelp\x1b[0m               Show this help message
  \x1b[32mversion\x1b[0m            Show version

\x1b[36mExamples:\x1b[0m
  node bin/modi.js run examples/hello.modi
  node bin/modi.js repl
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
      startRepl();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    case 'version':
    case '--version':
    case '-v':
      console.log('Modi Lang v1.0.0 🇮🇳');
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
