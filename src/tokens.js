// ============================================
// 🇮🇳 Modi Lang — Token Types & Keyword Map
// "Mitron, yahi toh foundation hai!"
// ============================================

const TokenType = {
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',

  // Modi Keywords
  MODI: 'MODI',                     // let/var
  MANN_KI_BAAT: 'MANN_KI_BAAT',     // print
  AGAR_MODI: 'AGAR_MODI',           // if
  NAHI_TOH: 'NAHI_TOH',             // else
  WARNA_MODI: 'WARNA_MODI',         // else if
  ACCHE_DIN: 'ACCHE_DIN',           // true
  JUMLA: 'JUMLA',                   // false
  GHUMA_KE: 'GHUMA_KE',             // while
  SABKA_SAATH: 'SABKA_SAATH',       // for
  MITRON: 'MITRON',                 // function
  LAUT_AAO: 'LAUT_AAO',             // return
  NOTA: 'NOTA',                     // null
  CHAI_PE_CHARCHA: 'CHAI_PE_CHARCHA', // input
  MODI_HAI_TOH: 'MODI_HAI_TOH',     // try
  PAKODA: 'PAKODA',                 // catch
  DEMONETIZATION: 'DEMONETIZATION', // break
  AAGE_BADHO: 'AAGE_BADHO',         // continue
  NAMASTE: 'NAMASTE',               // program start
  JAI_HIND: 'JAI_HIND',             // program end
  VISHWAGURU: 'VISHWAGURU',         // class
  NAYA_BHARAT: 'NAYA_BHARAT',       // new

  // Logical Keywords
  AUR: 'AUR',                       // AND
  YA: 'YA',                         // OR
  BILKUL_NAHI: 'BILKUL_NAHI',       // NOT
  SAME2SAME: 'SAME2SAME',           // ==
  JUMLA_HAI: 'JUMLA_HAI',           // !=

  // Operators
  PLUS: 'PLUS',           // +
  MINUS: 'MINUS',         // -
  MULTIPLY: 'MULTIPLY',   // *
  DIVIDE: 'DIVIDE',       // /
  MODULO: 'MODULO',       // %
  ASSIGN: 'ASSIGN',       // =
  LESS: 'LESS',           // <
  GREATER: 'GREATER',     // >
  LESS_EQ: 'LESS_EQ',     // <=
  GREATER_EQ: 'GREATER_EQ', // >=

  // Delimiters
  LPAREN: 'LPAREN',       // (
  RPAREN: 'RPAREN',       // )
  LBRACE: 'LBRACE',       // {
  RBRACE: 'RBRACE',       // }
  LBRACKET: 'LBRACKET',   // [
  RBRACKET: 'RBRACKET',   // ]
  SEMICOLON: 'SEMICOLON', // ;
  COMMA: 'COMMA',         // ,
  DOT: 'DOT',             // .

  // Special
  EOF: 'EOF',
  NEWLINE: 'NEWLINE',
};

// Map Modi keywords to token types
const Keywords = {
  'modi': TokenType.MODI,
  'mann_ki_baat': TokenType.MANN_KI_BAAT,
  'agar_modi': TokenType.AGAR_MODI,
  'nahi_toh': TokenType.NAHI_TOH,
  'warna_modi': TokenType.WARNA_MODI,
  'acche_din': TokenType.ACCHE_DIN,
  'jumla': TokenType.JUMLA,
  'ghuma_ke': TokenType.GHUMA_KE,
  'sabka_saath': TokenType.SABKA_SAATH,
  'mitron': TokenType.MITRON,
  'laut_aao': TokenType.LAUT_AAO,
  'nota': TokenType.NOTA,
  'chai_pe_charcha': TokenType.CHAI_PE_CHARCHA,
  'modi_hai_toh': TokenType.MODI_HAI_TOH,
  'pakoda': TokenType.PAKODA,
  'demonetization': TokenType.DEMONETIZATION,
  'aage_badho': TokenType.AAGE_BADHO,
  'namaste': TokenType.NAMASTE,
  'jai_hind': TokenType.JAI_HIND,
  'vishwaguru': TokenType.VISHWAGURU,
  'naya_bharat': TokenType.NAYA_BHARAT,
  'aur': TokenType.AUR,
  'ya': TokenType.YA,
  'bilkul_nahi': TokenType.BILKUL_NAHI,
  'same2same': TokenType.SAME2SAME,
  'jumla_hai': TokenType.JUMLA_HAI,
};

class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  toString() {
    return `Token(${this.type}, ${this.value}, line:${this.line}, col:${this.column})`;
  }
}

module.exports = { TokenType, Keywords, Token };
