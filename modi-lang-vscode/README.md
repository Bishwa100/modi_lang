# Modi Lang — VS Code Extension 🇮🇳

**Syntax highlighting and language support for [Modi Lang](https://github.com/bishwa100/modi-lang) — The Deshbhakt Programming Language!**

> "Mitron, ab coding bhi deshbhakti hai!"

## Features

🎨 **Full Syntax Highlighting**
- Keywords colored for easy readability
- Built-in functions highlighted as library calls
- Constants (`acche_din`, `jumla`, `nota`) shown as language constants
- String, number, and comment highlighting

⌨️ **Smart Editing**
- Auto-closing brackets and quotes
- Comment toggling with `Ctrl+/`
- Code folding for `{}` blocks
- Smart indentation

📁 **File Association**
- Automatically recognizes `.modi` files
- Custom file icon

## Supported Keywords

| Category | Keywords |
|----------|----------|
| Variables | `modi` |
| Functions | `mitron`, `laut_aao` |
| Control Flow | `agar_modi`, `nahi_toh`, `warna_modi` |
| Loops | `ghuma_ke`, `sabka_saath`, `bas_kar`, `aage_badho` |
| Error Handling | `modi_hai_toh`, `pakoda` |
| I/O | `mann_ki_baat`, `chai_pe_charcha` |
| Constants | `acche_din`, `jumla`, `nota` |
| Logical | `aur`, `ya`, `bilkul_nahi`, `same2same`, `jumla_hai` |
| Program | `namaste`, `jai_hind` |

## Installation

### From VSIX (Local)

1. Build the extension:
   ```bash
   cd modi-lang-vscode
   npx -y @vscode/vsce package
   ```
2. In VS Code: `Ctrl+Shift+P` → "Install from VSIX" → select the `.vsix` file

### From Source (Development)

1. Copy the `modi-lang-vscode` folder to your VS Code extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\modi-lang`
   - **Mac/Linux**: `~/.vscode/extensions/modi-lang`
2. Restart VS Code

## Example

```modi
namaste

modi greeting = "Mitron!";
mann_ki_baat(greeting);

agar_modi (acche_din) {
    mann_ki_baat("Sab badiya! 🎉");
}

jai_hind
```

## License

MIT — Jai Hind! 🇮🇳
