// 🇮🇳 Modi Lang — Parser
const { TokenType } = require('./tokens');
const { ModiSyntaxError, ErrorMessages } = require('./errors');
const AST = require('./ast');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  peek() { return this.tokens[this.pos]; }
  previous() { return this.tokens[this.pos - 1]; }
  isAtEnd() { return this.peek().type === TokenType.EOF; }

  advance() {
    if (!this.isAtEnd()) this.pos++;
    return this.previous();
  }

  check(type) { return !this.isAtEnd() && this.peek().type === type; }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) { this.advance(); return true; }
    }
    return false;
  }

  expect(type, msg) {
    if (this.check(type)) return this.advance();
    const t = this.peek();
    throw new ModiSyntaxError(
      msg || ErrorMessages.unexpectedToken(type, t.value || t.type),
      t.line, t.column
    );
  }

  parse() {
    // Optional namaste
    const hasNamaste = this.match(TokenType.NAMASTE);
    if (hasNamaste) this.match(TokenType.SEMICOLON);

    const body = [];
    while (!this.isAtEnd() && !this.check(TokenType.JAI_HIND)) {
      body.push(this.parseStatement());
    }

    // Optional jai_hind
    if (this.check(TokenType.JAI_HIND)) { this.advance(); this.match(TokenType.SEMICOLON); }

    return new AST.Program(body);
  }

  parseStatement() {
    if (this.check(TokenType.MODI)) return this.parseVariableDeclaration();
    if (this.check(TokenType.MANN_KI_BAAT)) return this.parsePrintStatement();
    if (this.check(TokenType.AGAR_MODI)) return this.parseIfStatement();
    if (this.check(TokenType.GHUMA_KE)) return this.parseWhileStatement();
    if (this.check(TokenType.SABKA_SAATH)) return this.parseForStatement();
    if (this.check(TokenType.MITRON)) return this.parseFunctionDeclaration();
    if (this.check(TokenType.LAUT_AAO)) return this.parseReturnStatement();
    if (this.check(TokenType.DEMONETIZATION)) { this.advance(); this.match(TokenType.SEMICOLON); return new AST.BreakStatement(); }
    if (this.check(TokenType.AAGE_BADHO)) { this.advance(); this.match(TokenType.SEMICOLON); return new AST.ContinueStatement(); }
    if (this.check(TokenType.MODI_HAI_TOH)) return this.parseTryCatch();
    if (this.check(TokenType.BAS_KAR)) { this.advance(); this.match(TokenType.SEMICOLON); return new AST.BreakStatement(); }
    return this.parseExpressionStatement();
  }

  parseVariableDeclaration() {
    this.expect(TokenType.MODI);
    const name = this.expect(TokenType.IDENTIFIER, "Mitron, variable ka naam toh do! 📝").value;
    this.expect(TokenType.ASSIGN, "Mitron, '=' lagao variable mein value dalne ke liye! ✍️");
    const value = this.parseExpression();
    this.expect(TokenType.SEMICOLON, ErrorMessages.missingSemicolon(this.peek().line));
    return new AST.VariableDeclaration(name, value);
  }

  parsePrintStatement() {
    this.expect(TokenType.MANN_KI_BAAT);
    this.expect(TokenType.LPAREN, "mann_ki_baat ke baad '(' lagao! 📢");
    const expr = this.parseExpression();
    this.expect(TokenType.RPAREN, "')' bhool gaye mitron! 😅");
    this.expect(TokenType.SEMICOLON, ErrorMessages.missingSemicolon(this.peek().line));
    return new AST.PrintStatement(expr);
  }

  parseIfStatement() {
    this.expect(TokenType.AGAR_MODI);
    this.expect(TokenType.LPAREN);
    const condition = this.parseExpression();
    this.expect(TokenType.RPAREN);
    const consequent = this.parseBlock();

    const alternates = [];
    while (this.check(TokenType.WARNA_MODI)) {
      this.advance();
      this.expect(TokenType.LPAREN);
      const altCond = this.parseExpression();
      this.expect(TokenType.RPAREN);
      const altBody = this.parseBlock();
      alternates.push({ condition: altCond, consequent: altBody });
    }

    let alternate = null;
    if (this.match(TokenType.NAHI_TOH)) {
      alternate = this.parseBlock();
    }

    return new AST.IfStatement(condition, consequent, alternates, alternate);
  }

  parseWhileStatement() {
    this.expect(TokenType.GHUMA_KE);
    this.expect(TokenType.LPAREN);
    const condition = this.parseExpression();
    this.expect(TokenType.RPAREN);
    const body = this.parseBlock();
    return new AST.WhileStatement(condition, body);
  }

  parseForStatement() {
    this.expect(TokenType.SABKA_SAATH);
    this.expect(TokenType.LPAREN);
    // init
    let init;
    if (this.check(TokenType.MODI)) {
      this.advance();
      const name = this.expect(TokenType.IDENTIFIER).value;
      this.expect(TokenType.ASSIGN);
      const val = this.parseExpression();
      init = new AST.VariableDeclaration(name, val);
    } else {
      const name = this.expect(TokenType.IDENTIFIER).value;
      this.expect(TokenType.ASSIGN);
      const val = this.parseExpression();
      init = new AST.AssignmentStatement(name, val);
    }
    this.expect(TokenType.SEMICOLON);
    const condition = this.parseExpression();
    this.expect(TokenType.SEMICOLON);
    const updateName = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.ASSIGN);
    const updateVal = this.parseExpression();
    const update = new AST.AssignmentStatement(updateName, updateVal);
    this.expect(TokenType.RPAREN);
    const body = this.parseBlock();
    return new AST.ForStatement(init, condition, update, body);
  }

  parseFunctionDeclaration() {
    this.expect(TokenType.MITRON);
    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.LPAREN);
    const params = [];
    if (!this.check(TokenType.RPAREN)) {
      params.push(this.expect(TokenType.IDENTIFIER).value);
      while (this.match(TokenType.COMMA)) {
        params.push(this.expect(TokenType.IDENTIFIER).value);
      }
    }
    this.expect(TokenType.RPAREN);
    const body = this.parseBlock();
    return new AST.FunctionDeclaration(name, params, body);
  }

  parseReturnStatement() {
    this.expect(TokenType.LAUT_AAO);
    let value = null;
    if (!this.check(TokenType.SEMICOLON)) {
      value = this.parseExpression();
    }
    this.expect(TokenType.SEMICOLON, ErrorMessages.missingSemicolon(this.peek().line));
    return new AST.ReturnStatement(value);
  }

  parseTryCatch() {
    this.expect(TokenType.MODI_HAI_TOH);
    const tryBlock = this.parseBlock();
    this.expect(TokenType.PAKODA);
    this.expect(TokenType.LPAREN);
    const param = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.RPAREN);
    const catchBlock = this.parseBlock();
    return new AST.TryCatchStatement(tryBlock, param, catchBlock);
  }

  parseBuiltinCall() {
    const name = this.advance().value;
    this.expect(TokenType.LPAREN);
    const args = [];
    if (!this.check(TokenType.RPAREN)) {
      args.push(this.parseExpression());
      while (this.match(TokenType.COMMA)) args.push(this.parseExpression());
    }
    this.expect(TokenType.RPAREN);
    // Don't require semicolon - builtin calls are expressions, not statements
    return new AST.BuiltinCallExpression(name, args);
  }

  parseBlock() {
    this.expect(TokenType.LBRACE);
    const stmts = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      stmts.push(this.parseStatement());
    }
    this.expect(TokenType.RBRACE, "'}' kahan hai mitron? Block band karo! 🧱");
    return stmts;
  }

  parseExpressionStatement() {
    const expr = this.parseExpression();

    // Check for assignment: identifier = expr;
    if (expr.type === 'Identifier' && this.match(TokenType.ASSIGN)) {
      const value = this.parseExpression();
      this.expect(TokenType.SEMICOLON, ErrorMessages.missingSemicolon(this.peek().line));
      return new AST.AssignmentStatement(expr.name, value);
    }

    this.expect(TokenType.SEMICOLON, ErrorMessages.missingSemicolon(this.peek().line));
    return new AST.ExpressionStatement(expr);
  }

  // --- Expression Parsing (Precedence Climbing) ---

  parseExpression() { return this.parseLogicalOr(); }

  parseLogicalOr() {
    let left = this.parseLogicalAnd();
    while (this.match(TokenType.YA)) {
      const right = this.parseLogicalAnd();
      left = new AST.LogicalExpression('ya', left, right);
    }
    return left;
  }

  parseLogicalAnd() {
    let left = this.parseEquality();
    while (this.match(TokenType.AUR)) {
      const right = this.parseEquality();
      left = new AST.LogicalExpression('aur', left, right);
    }
    return left;
  }

  parseEquality() {
    let left = this.parseComparison();
    while (this.match(TokenType.SAME2SAME, TokenType.JUMLA_HAI)) {
      const op = this.previous().type === TokenType.SAME2SAME ? 'same2same' : 'jumla_hai';
      const right = this.parseComparison();
      left = new AST.BinaryExpression(op, left, right);
    }
    return left;
  }

  parseComparison() {
    let left = this.parseAddition();
    while (this.match(TokenType.LESS, TokenType.GREATER, TokenType.LESS_EQ, TokenType.GREATER_EQ)) {
      const op = this.previous().value;
      const right = this.parseAddition();
      left = new AST.BinaryExpression(op, left, right);
    }
    return left;
  }

  parseAddition() {
    let left = this.parseMultiplication();
    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const op = this.previous().value;
      const right = this.parseMultiplication();
      left = new AST.BinaryExpression(op, left, right);
    }
    return left;
  }

  parseMultiplication() {
    let left = this.parseUnary();
    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const op = this.previous().value;
      const right = this.parseUnary();
      left = new AST.BinaryExpression(op, left, right);
    }
    return left;
  }

  parseUnary() {
    if (this.match(TokenType.MINUS)) {
      return new AST.UnaryExpression('-', this.parseUnary());
    }
    if (this.match(TokenType.BILKUL_NAHI)) {
      return new AST.UnaryExpression('bilkul_nahi', this.parseUnary());
    }
    return this.parseCallOrIndex();
  }

  parseCallOrIndex() {
    let expr = this.parsePrimary();

    while (true) {
      if (this.match(TokenType.LPAREN)) {
        // Function call
        const args = [];
        if (!this.check(TokenType.RPAREN)) {
          args.push(this.parseExpression());
          while (this.match(TokenType.COMMA)) args.push(this.parseExpression());
        }
        this.expect(TokenType.RPAREN);
        // If expr is a BuiltinCallExpression or Identifier, use its name
        const calleeName = expr.type === 'BuiltinCallExpression' ? expr.name : (expr.type === 'Identifier' ? expr.name : expr);
        expr = new AST.CallExpression(calleeName, args);
      } else if (this.match(TokenType.LBRACKET)) {
        const index = this.parseExpression();
        this.expect(TokenType.RBRACKET);
        expr = new AST.IndexExpression(expr, index);
      } else {
        break;
      }
    }
    return expr;
  }

  parsePrimary() {
    // Number
    if (this.match(TokenType.NUMBER)) return new AST.NumberLiteral(this.previous().value);
    // String
    if (this.match(TokenType.STRING)) return new AST.StringLiteral(this.previous().value);
    // Booleans
    if (this.match(TokenType.ACCHE_DIN)) return new AST.BooleanLiteral(true);
    if (this.match(TokenType.JUMLA)) return new AST.BooleanLiteral(false);
    // Null
    if (this.match(TokenType.NOTA)) return new AST.NullLiteral();
    // Array literal
    if (this.match(TokenType.LBRACKET)) {
      const elements = [];
      if (!this.check(TokenType.RBRACKET)) {
        elements.push(this.parseExpression());
        while (this.match(TokenType.COMMA)) elements.push(this.parseExpression());
      }
      this.expect(TokenType.RBRACKET);
      return new AST.ArrayLiteral(elements);
    }
    // Input
    if (this.match(TokenType.CHAI_PE_CHARCHA)) {
      this.expect(TokenType.LPAREN);
      let prompt = null;
      if (!this.check(TokenType.RPAREN)) prompt = this.parseExpression();
      this.expect(TokenType.RPAREN);
      return new AST.InputExpression(prompt);
    }
    // Builtin function call (single-word like random, abs, etc.)
    if (this.check(TokenType.RANDOM) || this.check(TokenType.ABS) || this.check(TokenType.POWER) ||
        this.check(TokenType.FLOOR) || this.check(TokenType.CEIL) || this.check(TokenType.ROUND) ||
        this.check(TokenType.LAMBAI) || this.check(TokenType.JODO_RALLY) || this.check(TokenType.NIKALO) ||
        this.check(TokenType.TYPE_KYA_HAI) || this.check(TokenType.AANKDA) || this.check(TokenType.BHAASHAN) ||
        this.check(TokenType.SPLIT) || this.check(TokenType.UPPERCASE) || this.check(TokenType.LOWERCASE)) {
      return this.parseBuiltinCall();
    }
    // Grouped expression
    if (this.match(TokenType.LPAREN)) {
      const expr = this.parseExpression();
      this.expect(TokenType.RPAREN);
      return expr;
    }
    // Identifier
    if (this.match(TokenType.IDENTIFIER)) return new AST.Identifier(this.previous().value);

    const t = this.peek();
    throw new ModiSyntaxError(
      ErrorMessages.syntaxError(`Unexpected token '${t.value || t.type}'`),
      t.line, t.column
    );
  }
}

module.exports = { Parser };
