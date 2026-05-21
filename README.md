# 🇮🇳 Modi Lang

### *The Deshbhakt Programming Language*

> **"Mitron, ab coding bhi deshbhakti hai!"**

[![npm version](https://img.shields.io/npm/v/modi-lang.svg?style=flat-square&color=FF9933)](https://www.npmjs.com/package/modi-lang)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-007ACC?style=flat-square&logo=visual-studio-code)](https://github.com/bishwa100/modi-lang/tree/main/modi-lang-vscode)

Modi Lang is a hilarious, fully functional programming language where every keyword is a famous Modi catchphrase. Write programs that compile your patriotism into actual code! 🎉

```
███╗   ███╗ ██████╗ ██████╗ ██╗    ██╗      █████╗ ███╗   ██╗ ██████╗ 
████╗ ████║██╔═══██╗██╔══██╗██║    ██║     ██╔══██╗████╗  ██║██╔════╝ 
██╔████╔██║██║   ██║██║  ██║██║    ██║     ███████║██╔██╗ ██║██║  ███╗
██║╚██╔╝██║██║   ██║██║  ██║██║    ██║     ██╔══██║██║╚██╗██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝██████╔╝██║    ███████╗██║  ██║██║ ╚████║╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
```

---

## 📥 Installation

### Quick Install (Recommended)

```bash
npm install -g modi-lang
```

That's it! The `modi` command is now available globally. 🎉

### One-Line Install Scripts

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/bishwa100/modi-lang/main/install.ps1 | iex
```

**Mac / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/bishwa100/modi-lang/main/install.sh | bash
```

### Verify Installation

```bash
modi --version    # Modi Lang v1.0.0 🇮🇳
modi help         # Show all commands
```

### Uninstall

```bash
npm uninstall -g modi-lang
```

---

## 🎨 VS Code Extension (IDE Support)

Get full syntax highlighting for `.modi` files in VS Code!

### Install from Source

1. Copy the `modi-lang-vscode` folder to your VS Code extensions:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\modi-lang`
   - **Mac/Linux**: `~/.vscode/extensions/modi-lang`
2. Restart VS Code
3. Open any `.modi` file — enjoy colorful syntax! 🎨

### Install from VSIX

```bash
cd modi-lang-vscode
npx -y @vscode/vsce package
# Then in VS Code: Ctrl+Shift+P → "Install from VSIX"
```

### Features
- 🎨 Full syntax highlighting for all Modi Lang keywords
- ⌨️ Auto-closing brackets and quotes
- 💬 Comment toggling with `Ctrl+/`
- 📁 `.modi` file icon and association
- 🔧 Smart indentation

---

## 🚀 Quick Start

```bash
# Create a new project
modi init my-project
cd my-project

# Run the program
modi run main.modi

# Start interactive REPL
modi repl

# Run any .modi file
modi run examples/hello.modi

# Show help
modi help
```

---

## 📝 Your First Program

Create a file called `hello.modi`:

```
namaste

modi greeting = "Mitron, Bhaiyo aur Behno!";
mann_ki_baat(greeting);
mann_ki_baat("Acche din aane wale hain! 🎉");

jai_hind
```

Run it:
```bash
modi run hello.modi
```

Output:
```
Mitron, Bhaiyo aur Behno!
Acche din aane wale hain! 🎉
```

---

## 🗣️ Language Reference

### Keywords

| What You Want | Modi Lang Says | Why It's Funny |
|---|---|---|
| `let` / `var` | `modi` | Modi creates everything |
| `print` | `mann_ki_baat` | He speaks to the nation |
| `if` | `agar_modi` | Conditional on Modi's will |
| `else` | `nahi_toh` | The alternative |
| `else if` | `warna_modi` | Another condition, another promise |
| `true` | `acche_din` | Good days = True ✨ |
| `false` | `jumla` | Jumla = False 😂 |
| `while` | `ghuma_ke` | Loops around and around |
| `for` | `sabka_saath` | Iterate with everyone |
| `function` | `mitron` | Every speech starts with "Mitron..." |
| `return` | `laut_aao` | Return home with a value |
| `null` | `nota` | None of the Above |
| `input` | `chai_pe_charcha` | Take input over chai ☕ |
| `try` | `modi_hai_toh` | Modi hai toh mumkin hai! |
| `catch` | `pakoda` | When things go wrong, sell pakodas 🍳 |
| `break` | `demonetization` | Breaks the loop like it broke the economy 💸 |
| `continue` | `aage_badho` | Skip and move forward |
| `==` | `same2same` | Equality check, desi style |
| `!=` | `jumla_hai` | That's a jumla! |
| `AND` | `aur` | And in Hindi |
| `OR` | `ya` | Or in Hindi |
| `NOT` | `bilkul_nahi` | Absolutely not! |
| `// comment` | `// suno mitron` | Listen friends... (ignored) |

### Program Structure

Every Modi Lang program starts with `namaste` and ends with `jai_hind`:

```
namaste
// your code here
jai_hind
```

*(Both are optional but good deshbhakti practice! 🇮🇳)*

---

## 📚 Examples

### Variables
```
modi name = "Mitron";
modi age = 74;
modi is_pm = acche_din;
modi score = nota;
```

### Conditions
```
agar_modi (votes >= 272) {
    mann_ki_baat("Majority! 🎉");
} warna_modi (votes >= 200) {
    mann_ki_baat("Coalition needed! 🤝");
} nahi_toh {
    mann_ki_baat("Opposition mein baitho! 😤");
}
```

### Loops
```
// For loop
sabka_saath (modi i = 1; i <= 10; i = i + 1) {
    mann_ki_baat(i);
}

// While loop
modi count = 5;
ghuma_ke (count > 0) {
    mann_ki_baat("Countdown: " + count);
    count = count - 1;
}
```

### Functions
```
mitron add(a, b) {
    laut_aao a + b;
}

mann_ki_baat(add(10, 20));  // 30
```

### Arrays (Rally)
```
modi states = ["Gujarat", "UP", "Maharashtra"];
mann_ki_baat(states[0]);        // Gujarat
mann_ki_baat(lambai(states));   // 3
```

### Try-Catch
```
modi_hai_toh {
    modi x = 10 / 0;
} pakoda (error) {
    mann_ki_baat("Error: " + error);
}
```

### FizzBuzz — Modi Edition 🎪
```
namaste

sabka_saath (modi i = 1; i <= 30; i = i + 1) {
    agar_modi (i % 15 same2same 0) {
        mann_ki_baat("🎉 Acche Din!");
    } warna_modi (i % 3 same2same 0) {
        mann_ki_baat("🇮🇳 Modi!");
    } warna_modi (i % 5 same2same 0) {
        mann_ki_baat("🎤 Mitron!");
    } nahi_toh {
        mann_ki_baat(i);
    }
}

jai_hind
```

### Recursion — Factorial 🗣️
```
namaste

mitron factorial(n) {
    agar_modi (n same2same 0) { laut_aao 1; }
    laut_aao n * factorial(n - 1);
}

mann_ki_baat("5! = " + factorial(5));

jai_hind
```

---

## 😤 Error Messages (The Best Part!)

Modi Lang doesn't just show errors — it *roasts* you:

| Error | Modi Lang Says |
|---|---|
| Syntax Error | *"Mitron, ye kya likh diya? Galat syntax hai! 🤦"* |
| Undefined Variable | *"Ye variable toh Note-bandi mein chala gaya! 💸"* |
| Division by Zero | *"Zero se divide? Ye toh jumla hai mitron! ➗🚫"* |
| Type Error | *"Chai aur pakoda mix mat karo! 🍵🍳"* |
| Stack Overflow | *"Itna recursion? Modiji bhi thak jayenge! 😵‍💫"* |
| Missing Semicolon | *"Digital India mein precision zaroori hai! ⌨️"* |
| File Not Found | *"Shayad Swachh Bharat mein saaf ho gayi! 🧹"* |
| Runtime Crash | *"BREAKING: Program crashed! Blame it on Congress! 😂"* |

---

## 🧰 Built-in Functions

| Function | Description |
|---|---|
| `mann_ki_baat(value)` | Print to console |
| `chai_pe_charcha(prompt)` | Read user input ☕ |
| `lambai(array_or_string)` | Get length |
| `aankda(value)` | Convert to number |
| `bhaashan(value)` | Convert to string |
| `jodo_rally(array, value)` | Push to array |
| `nikalo(array)` | Pop from array |
| `type_kya_hai(value)` | Get type name |
| `split(str, delimiter)` | Split string |
| `uppercase(str)` | To uppercase |
| `lowercase(str)` | To lowercase |
| `abs(value)` | Absolute value |
| `power(base, exp)` | Exponentiation |
| `random()` / `random(min, max)` | Random number 🎲 |
| `floor(value)` | Floor |
| `ceil(value)` | Ceiling |
| `round(value)` | Round |

---

## 🏗️ Architecture

```
Source Code (.modi)  →  Lexer (Tokens)  →  Parser (AST)  →  Evaluator (Execute)  →  Output
```

Built as a **tree-walking interpreter** in Node.js. No external dependencies!

---

## 📁 Project Structure

```
Modi Lang/
├── bin/modi.js              # CLI entry point (the `modi` command)
├── src/
│   ├── tokens.js            # Token types & keywords
│   ├── ast.js               # AST node definitions
│   ├── lexer.js             # Tokenizer
│   ├── parser.js            # Parser
│   ├── evaluator.js         # Interpreter
│   ├── environment.js       # Variable scoping
│   ├── builtins.js          # Built-in functions
│   ├── errors.js            # Funny error messages
│   └── repl.js              # Interactive REPL
├── examples/                # Example .modi programs
│   ├── hello.modi           # Hello World
│   ├── fizzbuzz.modi        # FizzBuzz Modi edition
│   ├── demo.modi            # Full feature demo
│   └── ...                  # Many more examples!
├── tests/                   # Test suite
│   └── test_basic.js        # Comprehensive tests
├── modi-lang-vscode/        # VS Code extension
│   ├── syntaxes/            # TextMate grammar
│   ├── language-configuration.json
│   └── package.json
├── install.sh               # Mac/Linux install script
├── install.ps1              # Windows install script
├── package.json             # npm package config
├── LICENSE                  # MIT License
└── README.md
```

---

## 🛠️ CLI Commands

| Command | Description |
|---|---|
| `modi run <file.modi>` | Run a Modi Lang program |
| `modi repl` | Start interactive REPL |
| `modi init [name]` | Create a new Modi Lang project |
| `modi help` | Show help |
| `modi version` | Show version |
| `modi <file.modi>` | Run directly (shorthand) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📦 Publishing

### Publish to npm
```bash
npm login
npm publish
```

### Publish VS Code Extension
```bash
cd modi-lang-vscode
npx -y @vscode/vsce package
npx -y @vscode/vsce publish
```

---

## 🎉 Disclaimer

This is a **satirical/fun project** meant purely for entertainment and learning about programming language design. No political affiliation intended — just good old desi humor! 😄

**Jai Hind! 🇮🇳**
