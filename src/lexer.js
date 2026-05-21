// ============================================
// 🇮🇳 Modi Lang — Lexer (Tokenizer)
// "Mitron, pehle shabdon ko samjho!"
// ============================================

const { TokenType, Keywords, Token } = require('./tokens');
const { ModiSyntaxError, ErrorMessages } = require('./errors');

class Lexer {
  constructor(source) {
    this.source = source;
    this.tokens = [];
    this.current = 0;
    this.line = 1;
    this.column = 1;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  peek() {
    if (this.isAtEnd()) return '\0';
    return this.source[this.current];
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source[this.current + 1];
  }

  advance() {
    const ch = this.source[this.current];
    this.current++;
    if (ch === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    return ch;
  }

  addToken(type, value) {
    this.tokens.push(new Token(type, value, this.line, this.column));
  }

  skipWhitespace() {
    while (!this.isAtEnd()) {
      const ch = this.peek();
      if (ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n') {
        this.advance();
      } else {
        break;
      }
    }
  }

  skipComment() {
    // Single line comment: // suno mitron ...
    if (this.peek() === '/' && this.peekNext() === '/') {
      while (!this.isAtEnd() && this.peek() !== '\n') {
        this.advance();
      }
      return true;
    }
    // Multi-line comment: /* ... */
    if (this.peek() === '/' && this.peekNext() === '*') {
      this.advance(); // /
      this.advance(); // *
      while (!this.isAtEnd()) {
        if (this.peek() === '*' && this.peekNext() === '/') {
          this.advance(); // *
          this.advance(); // /
          return true;
        }
        this.advance();
      }
      throw new ModiSyntaxError(
        ErrorMessages.syntaxError('Multi-line comment band karo! */ lagao!'),
        this.line, this.column
      );
    }
    return false;
  }

  readString(quote) {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';

    while (!this.isAtEnd() && this.peek() !== quote) {
      if (this.peek() === '\\') {
        this.advance();
        const escaped = this.advance();
        switch (escaped) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          case "'": value += "'"; break;
          default: value += escaped;
        }
      } else {
        value += this.advance();
      }
    }

    if (this.isAtEnd()) {
      throw new ModiSyntaxError(
        ErrorMessages.syntaxError('String band karo! Closing quote bhool gaye!'),
        startLine, startCol
      );
    }

    this.advance(); // closing quote
    return value;
  }

  readNumber() {
    let value = '';
    while (!this.isAtEnd() && (this.isDigit(this.peek()) || this.peek() === '.')) {
      value += this.advance();
    }
    return parseFloat(value);
  }

  readIdentifier() {
    let value = '';
    while (!this.isAtEnd() && (this.isAlphaNumeric(this.peek()) || this.peek() === '_')) {
      value += this.advance();
    }
    return value;
  }

  isDigit(ch) {
    return ch >= '0' && ch <= '9';
  }

  isAlpha(ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
  }

  isAlphaNumeric(ch) {
    return this.isAlpha(ch) || this.isDigit(ch);
  }

  /**
   * Try to match a multi-word keyword starting from the current position.
   * Returns the matched keyword string or null.
   */
  tryMultiWordKeyword(firstWord) {
    // Multi-word keywords to try extending
    const multiWordStarts = {
      'mann': ['mann_ki_baat'],
      'agar': ['agar_modi'],
      'nahi': ['nahi_toh'],
      'warna': ['warna_modi'],
      'acche': ['acche_din'],
      'sabka': ['sabka_saath'],
      'laut': ['laut_aao'],
      'chai': ['chai_pe_charcha'],
      'modi': ['modi_hai_toh'],
      'aage': ['aage_badho'],
      'jai': ['jai_hind'],
      'naya': ['naya_bharat'],
      'bilkul': ['bilkul_nahi'],
      'jumla': ['jumla_hai'],
      'ghuma': ['ghuma_ke'],
      'swachh': ['swachh_bharat'],
      'bas': ['bas_kar'],
    };

    const possibleKeywords = multiWordStarts[firstWord];
    if (!possibleKeywords) return null;

    // Save position
    const savedPos = this.current;
    const savedLine = this.line;
    const savedCol = this.column;

    for (const keyword of possibleKeywords) {
      const remaining = keyword.substring(firstWord.length);
      // remaining starts with _ so we need to check if source matches
      let matched = true;
      let tempPos = this.current;

      // Skip whitespace between words or check for underscore
      for (let i = 0; i < remaining.length; i++) {
        if (tempPos >= this.source.length) {
          matched = false;
          break;
        }

        // Allow either underscore or whitespace between word parts
        if (remaining[i] === '_') {
          if (this.source[tempPos] === '_') {
            tempPos++;
          } else if (this.source[tempPos] === ' ' || this.source[tempPos] === '\t') {
            // Skip whitespace
            while (tempPos < this.source.length &&
                   (this.source[tempPos] === ' ' || this.source[tempPos] === '\t')) {
              tempPos++;
            }
          } else {
            matched = false;
            break;
          }
        } else {
          if (this.source[tempPos] !== remaining[i]) {
            matched = false;
            break;
          }
          tempPos++;
        }
      }

      // Make sure the keyword isn't part of a longer identifier
      if (matched && tempPos < this.source.length && this.isAlphaNumeric(this.source[tempPos])) {
        matched = false;
      }

      if (matched) {
        // Advance cursor to tempPos
        while (this.current < tempPos) {
          this.advance();
        }
        return keyword;
      }
    }

    return null;
  }

  tokenize() {
    while (!this.isAtEnd()) {
      this.skipWhitespace();
      if (this.isAtEnd()) break;

      // Skip comments
      if (this.skipComment()) continue;

      const ch = this.peek();
      const startLine = this.line;
      const startCol = this.column;

      // Strings
      if (ch === '"' || ch === "'") {
        this.advance(); // opening quote
        const value = this.readString(ch);
        this.tokens.push(new Token(TokenType.STRING, value, startLine, startCol));
        continue;
      }

      // Numbers
      if (this.isDigit(ch)) {
        const value = this.readNumber();
        this.tokens.push(new Token(TokenType.NUMBER, value, startLine, startCol));
        continue;
      }

      // Identifiers and Keywords
      if (this.isAlpha(ch)) {
        const word = this.readIdentifier();

        // Try multi-word keyword first (e.g., "mann_ki_baat", "agar_modi")
        const multiWord = this.tryMultiWordKeyword(word);
        if (multiWord) {
          // Special case: "modi_hai_toh" — only if it starts as "modi" and extends
          if (multiWord === 'modi_hai_toh' && word === 'modi') {
            this.tokens.push(new Token(TokenType.MODI_HAI_TOH, multiWord, startLine, startCol));
            continue;
          }
          const tokenType = Keywords[multiWord];
          if (tokenType) {
            this.tokens.push(new Token(tokenType, multiWord, startLine, startCol));
            continue;
          }
        }

        // Check if it's a single keyword
        if (Keywords[word]) {
          // Special handling: "modi" could be variable declaration
          // "jumla" could be boolean false (not part of "jumla_hai")
          this.tokens.push(new Token(Keywords[word], word, startLine, startCol));
        } else {
          this.tokens.push(new Token(TokenType.IDENTIFIER, word, startLine, startCol));
        }
        continue;
      }

      // Operators and Delimiters
      this.advance();
      switch (ch) {
        case '+': this.tokens.push(new Token(TokenType.PLUS, '+', startLine, startCol)); break;
        case '-': this.tokens.push(new Token(TokenType.MINUS, '-', startLine, startCol)); break;
        case '*': this.tokens.push(new Token(TokenType.MULTIPLY, '*', startLine, startCol)); break;
        case '/': this.tokens.push(new Token(TokenType.DIVIDE, '/', startLine, startCol)); break;
        case '%': this.tokens.push(new Token(TokenType.MODULO, '%', startLine, startCol)); break;
        case '(':  this.tokens.push(new Token(TokenType.LPAREN, '(', startLine, startCol)); break;
        case ')': this.tokens.push(new Token(TokenType.RPAREN, ')', startLine, startCol)); break;
        case '{': this.tokens.push(new Token(TokenType.LBRACE, '{', startLine, startCol)); break;
        case '}': this.tokens.push(new Token(TokenType.RBRACE, '}', startLine, startCol)); break;
        case '[': this.tokens.push(new Token(TokenType.LBRACKET, '[', startLine, startCol)); break;
        case ']': this.tokens.push(new Token(TokenType.RBRACKET, ']', startLine, startCol)); break;
        case ';': this.tokens.push(new Token(TokenType.SEMICOLON, ';', startLine, startCol)); break;
        case ',': this.tokens.push(new Token(TokenType.COMMA, ',', startLine, startCol)); break;
        case '.': this.tokens.push(new Token(TokenType.DOT, '.', startLine, startCol)); break;
        case '=':
          if (this.peek() === '=') {
            this.advance();
            this.tokens.push(new Token(TokenType.SAME2SAME, '==', startLine, startCol));
          } else {
            this.tokens.push(new Token(TokenType.ASSIGN, '=', startLine, startCol));
          }
          break;
        case '!':
          if (this.peek() === '=') {
            this.advance();
            this.tokens.push(new Token(TokenType.JUMLA_HAI, '!=', startLine, startCol));
          } else {
            this.tokens.push(new Token(TokenType.BILKUL_NAHI, '!', startLine, startCol));
          }
          break;
        case '<':
          if (this.peek() === '=') {
            this.advance();
            this.tokens.push(new Token(TokenType.LESS_EQ, '<=', startLine, startCol));
          } else {
            this.tokens.push(new Token(TokenType.LESS, '<', startLine, startCol));
          }
          break;
        case '>':
          if (this.peek() === '=') {
            this.advance();
            this.tokens.push(new Token(TokenType.GREATER_EQ, '>=', startLine, startCol));
          } else {
            this.tokens.push(new Token(TokenType.GREATER, '>', startLine, startCol));
          }
          break;
        case '&':
          if (this.peek() === '&') {
            this.advance();
            this.tokens.push(new Token(TokenType.AUR, '&&', startLine, startCol));
          } else {
            throw new ModiSyntaxError(
              ErrorMessages.unknownToken('&'), startLine, startCol
            );
          }
          break;
        case '|':
          if (this.peek() === '|') {
            this.advance();
            this.tokens.push(new Token(TokenType.YA, '||', startLine, startCol));
          } else {
            throw new ModiSyntaxError(
              ErrorMessages.unknownToken('|'), startLine, startCol
            );
          }
          break;
        default:
          throw new ModiSyntaxError(
            ErrorMessages.unknownToken(ch), startLine, startCol
          );
      }
    }

    this.tokens.push(new Token(TokenType.EOF, null, this.line, this.column));
    return this.tokens;
  }
}

module.exports = { Lexer };
