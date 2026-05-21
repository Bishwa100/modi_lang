// ============================================
// 🇮🇳 Modi Lang — AST Node Definitions
// "Mitron, yahi toh program ka skeleton hai!"
// ============================================

// --- Program Root ---
class Program {
  constructor(body) {
    this.type = 'Program';
    this.body = body; // array of statements
  }
}

// --- Statements ---

class VariableDeclaration {
  constructor(name, value) {
    this.type = 'VariableDeclaration';
    this.name = name;   // identifier string
    this.value = value;  // expression node
  }
}

class AssignmentStatement {
  constructor(name, value) {
    this.type = 'AssignmentStatement';
    this.name = name;
    this.value = value;
  }
}

class PrintStatement {
  constructor(expression) {
    this.type = 'PrintStatement';
    this.expression = expression;
  }
}

class IfStatement {
  constructor(condition, consequent, alternates, alternate) {
    this.type = 'IfStatement';
    this.condition = condition;       // expression
    this.consequent = consequent;     // block (array of statements)
    this.alternates = alternates;     // array of { condition, consequent } for warna_modi
    this.alternate = alternate;       // block or null (nahi_toh)
  }
}

class WhileStatement {
  constructor(condition, body) {
    this.type = 'WhileStatement';
    this.condition = condition;
    this.body = body;
  }
}

class ForStatement {
  constructor(init, condition, update, body) {
    this.type = 'ForStatement';
    this.init = init;         // variable declaration or assignment
    this.condition = condition; // expression
    this.update = update;      // assignment
    this.body = body;          // block
  }
}

class FunctionDeclaration {
  constructor(name, params, body) {
    this.type = 'FunctionDeclaration';
    this.name = name;
    this.params = params;  // array of identifier strings
    this.body = body;      // block
  }
}

class ReturnStatement {
  constructor(value) {
    this.type = 'ReturnStatement';
    this.value = value;  // expression or null
  }
}

class BreakStatement {
  constructor() {
    this.type = 'BreakStatement';
  }
}

class ContinueStatement {
  constructor() {
    this.type = 'ContinueStatement';
  }
}

class TryCatchStatement {
  constructor(tryBlock, catchParam, catchBlock) {
    this.type = 'TryCatchStatement';
    this.tryBlock = tryBlock;
    this.catchParam = catchParam;  // identifier for error
    this.catchBlock = catchBlock;
  }
}

class ExpressionStatement {
  constructor(expression) {
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }
}

// --- Expressions ---

class NumberLiteral {
  constructor(value) {
    this.type = 'NumberLiteral';
    this.value = value;
  }
}

class StringLiteral {
  constructor(value) {
    this.type = 'StringLiteral';
    this.value = value;
  }
}

class BooleanLiteral {
  constructor(value) {
    this.type = 'BooleanLiteral';
    this.value = value;
  }
}

class NullLiteral {
  constructor() {
    this.type = 'NullLiteral';
    this.value = null;
  }
}

class ArrayLiteral {
  constructor(elements) {
    this.type = 'ArrayLiteral';
    this.elements = elements;
  }
}

class Identifier {
  constructor(name) {
    this.type = 'Identifier';
    this.name = name;
  }
}

class BinaryExpression {
  constructor(operator, left, right) {
    this.type = 'BinaryExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class UnaryExpression {
  constructor(operator, operand) {
    this.type = 'UnaryExpression';
    this.operator = operator;
    this.operand = operand;
  }
}

class LogicalExpression {
  constructor(operator, left, right) {
    this.type = 'LogicalExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class CallExpression {
  constructor(callee, args) {
    this.type = 'CallExpression';
    this.callee = callee;   // identifier name
    this.args = args;        // array of expressions
  }
}

class MemberExpression {
  constructor(object, property) {
    this.type = 'MemberExpression';
    this.object = object;
    this.property = property;
  }
}

class IndexExpression {
  constructor(object, index) {
    this.type = 'IndexExpression';
    this.object = object;
    this.index = index;
  }
}

class InputExpression {
  constructor(prompt) {
    this.type = 'InputExpression';
    this.prompt = prompt;  // expression or null
  }
}

class BuiltinCallExpression {
  constructor(name, args) {
    this.type = 'BuiltinCallExpression';
    this.name = name;
    this.args = args;
  }
}

// 🤣 Opposition Party Roast Literals
class OppositionLiteral {
  constructor(party) {
    this.type = 'OppositionLiteral';
    this.party = party;  // cpim, congress, aap, tmc, rjd, pappu, sp, aimim, bsp, jdu
  }
}

module.exports = {
  Program,
  VariableDeclaration,
  AssignmentStatement,
  PrintStatement,
  IfStatement,
  WhileStatement,
  ForStatement,
  FunctionDeclaration,
  ReturnStatement,
  BreakStatement,
  ContinueStatement,
  TryCatchStatement,
  ExpressionStatement,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  ArrayLiteral,
  Identifier,
  BinaryExpression,
  UnaryExpression,
  LogicalExpression,
  CallExpression,
  MemberExpression,
  IndexExpression,
  InputExpression,
  BuiltinCallExpression,
  OppositionLiteral,
};
