// 🇮🇳 Modi Lang — Interactive REPL
const readline = require('readline');
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');
const { Evaluator } = require('./evaluator');

const BANNER = `
\x1b[33m╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🇮🇳  \x1b[1;93mMODI LANG\x1b[33m — The Deshbhakt Programming Language  🇮🇳   ║
║                                                              ║
║   \x1b[0;33mVersion 1.0.0  |  "Mitron, ab coding bhi deshbhakti hai!"  \x1b[33m║
║                                                              ║
║   Type \x1b[32m.help\x1b[33m for commands  |  \x1b[31m.exit\x1b[33m to quit                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝\x1b[0m
`;

const HELP = `
\x1b[36m📋 Modi Lang REPL Commands:\x1b[0m
  \x1b[32m.help\x1b[0m       — Show this help menu
  \x1b[32m.exit\x1b[0m       — Exit REPL (Jai Hind! 🇮🇳)
  \x1b[32m.clear\x1b[0m      — Clear the screen (Swachh Bharat!)
  \x1b[32m.examples\x1b[0m   — Show example code

\x1b[36m📝 Quick Examples:\x1b[0m
  \x1b[33mmodi x = 42;\x1b[0m
  \x1b[33mmann_ki_baat("Mitron!");\x1b[0m
  \x1b[33mmodi a = 10; modi b = 20; mann_ki_baat(a + b);\x1b[0m
`;

const EXAMPLES = `
\x1b[36m🎯 Modi Lang Examples:\x1b[0m

  \x1b[33m// Variable\x1b[0m
  modi name = "Mitron";
  mann_ki_baat("Hello, " + name + "!");

  \x1b[33m// Condition\x1b[0m
  modi age = 25;
  agar_modi (age >= 18) { mann_ki_baat("Vote de sakte ho!"); }

  \x1b[33m// Loop\x1b[0m
  sabka_saath (modi i = 1; i <= 5; i = i + 1) { mann_ki_baat(i); }

  \x1b[33m// Function\x1b[0m
  mitron add(a, b) { laut_aao a + b; }
  mann_ki_baat(add(10, 20));
`;

function startRepl() {
  console.log(BANNER);

  const evaluator = new Evaluator();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[93m🪷 mitron > \x1b[0m',
  });

  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();
    if (!input) { rl.prompt(); return; }

    // REPL commands
    if (input === '.exit' || input === '.quit') {
      console.log('\n\x1b[33m🇮🇳 Jai Hind! Phir milenge mitron! 🙏\x1b[0m\n');
      process.exit(0);
    }
    if (input === '.help') { console.log(HELP); rl.prompt(); return; }
    if (input === '.clear') { console.clear(); console.log(BANNER); rl.prompt(); return; }
    if (input === '.examples') { console.log(EXAMPLES); rl.prompt(); return; }

    try {
      const lexer = new Lexer(input);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      const ast = parser.parse();
      const result = evaluator.evaluate(ast, evaluator.globalEnv);

      // Show non-null results in REPL
      if (result !== null && result !== undefined) {
        const display = evaluator.stringify(result);
        console.log(`\x1b[32m=> ${display}\x1b[0m`);
      }
    } catch (e) {
      if (e.toString) {
        console.error(`\x1b[31m${e.toString()}\x1b[0m`);
      } else {
        console.error(`\x1b[31m🚨 ${e.message || e}\x1b[0m`);
      }
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log('\n\x1b[33m🇮🇳 Jai Hind! Phir milenge mitron! 🙏\x1b[0m\n');
    process.exit(0);
  });
}

module.exports = { startRepl };
