# 🇮🇳 Modi Lang

### *The Deshbhakt Programming Language*

> **"Mitron, ab coding bhi deshbhakti hai!"**

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

## 🚀 Quick Start

```bash
# Run a Modi Lang program
node bin/modi.js run examples/hello.modi

# Start interactive REPL
node bin/modi.js repl

# Show help
node bin/modi.js help
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
node bin/modi.js run hello.modi
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

### Election Prediction — Random Numbers 🎲
```
namaste

modi prediction = random(1, 100);
mann_ki_baat("Election prediction: " + prediction + "%");

agar_modi (prediction > 50) {
    mann_ki_baat("Acche din aane wale hain! 🎉");
} nahi_toh {
    mann_ki_baat("Congress wapas aayenge? 😅");
}

jai_hind
```

### Array Management — Rally 📊
```
namaste

modi states = ["Gujarat", "UP", "Maharashtra"];
jodo_rally(states, "Bihar");
mann_ki_baat("Total states: " + lambai(states));

modi last = nikalo(states);
mann_ki_baat("Removed: " + last);

jai_hind
```

### String Functions — Press Conference 📢
```
namaste

modi speech = "mitron, bhaiyo aur behno!";
mann_ki_baat(uppercase(speech));
mann_ki_baat(lowercase(speech));
mann_ki_baat(split(speech, ", "));

jai_hind
```

### Type Checking 🤔
```
namaste

modi x = 42;
modi y = "42";

mann_ki_baat("x type: " + type_kya_hai(x));
mann_ki_baat("y type: " + type_kya_hai(y));

modi converted = aankda(y);
mann_ki_baat("Converted: " + converted);

jai_hind
```

### Math Functions — Budget 💰
```
namaste

modi income = 1000000;
modi tax = income * power(0.3, 1);
mann_ki_baat("Tax: ₹" + round(tax));
mann_ki_baat("Ceil: ₹" + ceil(tax));
mann_ki_baat("Floor: ₹" + floor(tax));

modi diff = abs(-50000);
mann_ki_baat("Absolute: " + diff);

jai_hind
```

### Loop Control — bas_kar & aage_badho 🚫
```
namaste

sabka_saath (modi i = 1; i <= 10; i = i + 1) {
    agar_modi (i same2same 5) {
        bas_kar;  // Stop immediately!
    }
    agar_modi (i same2same 3) {
        aage_badho;  // Skip this iteration!
    }
    mann_ki_baat(i);
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

### Error Handling — Try-Catch 🛡️
```
namaste

mitron divide_safely(a, b) {
    modi_hai_toh {
        laut_aao a / b;
    } pakoda (error) {
        mann_ki_baat("Error: " + error);
        laut_aao "jumla";
    }
}

mann_ki_baat(divide_safely(10, 0));

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
├── bin/modi.js          # CLI entry point
├── src/
│   ├── tokens.js        # Token types & keywords
│   ├── ast.js           # AST node definitions
│   ├── lexer.js         # Tokenizer
│   ├── parser.js        # Parser
│   ├── evaluator.js     # Interpreter
│   ├── environment.js   # Variable scoping
│   ├── builtins.js      # Built-in functions
│   ├── errors.js        # Funny error messages
│   └── repl.js          # Interactive REPL
├── examples/
│   ├── hello.modi          # Hello World
│   ├── fizzbuzz.modi       # FizzBuzz Modi edition
│   ├── demo.modi           # Full feature demo
│   ├── election.modi       # Random election prediction 🎲
│   ├── rally.modi          # Array rally management 📊
│   ├── press.modi          # String press conference 📢
│   ├── types.modi          # Type checking & conversion 🤔
│   ├── budget.modi         # Budget calculator 💰
│   ├── rally_control.modi  # bas_kar & aage_badho 🚫
│   ├── recursion.modi      # Factorial & Fibonacci 🗣️
│   ├── error_handling.modi # Try-Catch error handling 🛡️
│   └── chai.modi           # Chai Pe Charcha ☕
├── package.json
└── README.md
```

---

## 🎉 Disclaimer

This is a **satirical/fun project** meant purely for entertainment and learning about programming language design. No political affiliation intended — just good old desi humor! 😄

**Jai Hind! 🇮🇳**
