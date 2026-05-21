// 🇮🇳 Modi Lang — Evaluator (AST Interpreter)
const { Environment } = require('./environment');
const { builtins } = require('./builtins');
const { ModiRuntimeError, ModiTypeError, ErrorMessages } = require('./errors');
const readlineSync = require('./readline_sync');

// Signals for control flow
class ReturnSignal { constructor(value) { this.value = value; } }
class BreakSignal {}
class ContinueSignal {}

class Evaluator {
  constructor() {
    this.globalEnv = new Environment();
    this.callDepth = 0;
    this.maxCallDepth = 500;
    this.inLoop = false;
    this.output = []; // capture output for testing
  }

  run(ast) {
    this.evaluate(ast, this.globalEnv);
    return this.output;
  }

  evaluate(node, env) {
    switch (node.type) {
      case 'Program': return this.evalProgram(node, env);
      case 'VariableDeclaration': return this.evalVarDecl(node, env);
      case 'AssignmentStatement': return this.evalAssignment(node, env);
      case 'PrintStatement': return this.evalPrint(node, env);
      case 'IfStatement': return this.evalIf(node, env);
      case 'WhileStatement': return this.evalWhile(node, env);
      case 'ForStatement': return this.evalFor(node, env);
      case 'FunctionDeclaration': return this.evalFuncDecl(node, env);
      case 'ReturnStatement': return this.evalReturn(node, env);
      case 'BreakStatement': 
        if (this.inLoop) throw new BreakSignal();
        throw new ModiRuntimeError(ErrorMessages.basKarOutsideLoop());
      case 'ContinueStatement': 
        if (this.inLoop) throw new ContinueSignal();
        throw new ModiRuntimeError(ErrorMessages.breakOutsideLoop());
      case 'TryCatchStatement': return this.evalTryCatch(node, env);
      case 'ExpressionStatement': return this.evaluate(node.expression, env);
      case 'NumberLiteral': return node.value;
      case 'StringLiteral': return node.value;
      case 'BooleanLiteral': return node.value;
      case 'NullLiteral': return null;
      case 'ArrayLiteral': return node.elements.map(e => this.evaluate(e, env));
      case 'Identifier': return env.get(node.name);
      case 'BinaryExpression': return this.evalBinary(node, env);
      case 'UnaryExpression': return this.evalUnary(node, env);
      case 'LogicalExpression': return this.evalLogical(node, env);
      case 'CallExpression': return this.evalCall(node, env);
      case 'IndexExpression': return this.evalIndex(node, env);
      case 'InputExpression': return this.evalInput(node, env);
      case 'BuiltinCallExpression': return this.evalBuiltin(node, env);
      case 'OppositionLiteral': return this.evalOpposition(node);
      default:
        throw new ModiRuntimeError(ErrorMessages.runtimeCrash(`Unknown node: ${node.type}`));
    }
  }

  evalProgram(node, env) {
    let result = null;
    for (const stmt of node.body) {
      result = this.evaluate(stmt, env);
    }
    return result;
  }

  evalVarDecl(node, env) {
    const value = this.evaluate(node.value, env);
    env.declare(node.name, value);
    return value;
  }

  evalAssignment(node, env) {
    const value = this.evaluate(node.value, env);
    env.set(node.name, value);
    return value;
  }

  evalPrint(node, env) {
    const value = this.evaluate(node.expression, env);
    const output = this.stringify(value);
    console.log(output);
    this.output.push(output);
    return value;
  }

  evalIf(node, env) {
    const condition = this.evaluate(node.condition, env);
    if (this.isTruthy(condition)) {
      return this.evalBlock(node.consequent, env);
    }
    for (const alt of node.alternates) {
      if (this.isTruthy(this.evaluate(alt.condition, env))) {
        return this.evalBlock(alt.consequent, env);
      }
    }
    if (node.alternate) {
      return this.evalBlock(node.alternate, env);
    }
    return null;
  }

  evalWhile(node, env) {
    this.inLoop = true;
    while (this.isTruthy(this.evaluate(node.condition, env))) {
      try {
        this.evalBlock(node.body, env);
      } catch (e) {
        if (e instanceof BreakSignal) break;
        if (e instanceof ContinueSignal) continue;
        throw e;
      }
    }
    this.inLoop = false;
    return null;
  }

  evalFor(node, env) {
    this.inLoop = true;
    const forEnv = env.createChild();
    this.evaluate(node.init, forEnv);
    while (this.isTruthy(this.evaluate(node.condition, forEnv))) {
      try {
        this.evalBlock(node.body, forEnv);
      } catch (e) {
        if (e instanceof BreakSignal) break;
        if (e instanceof ContinueSignal) { /* fall through to update */ }
        else throw e;
      }
      this.evaluate(node.update, forEnv);
    }
    this.inLoop = false;
    return null;
  }

  evalFuncDecl(node, env) {
    const func = { type: 'function', name: node.name, params: node.params, body: node.body, closure: env };
    env.declare(node.name, func);
    return func;
  }

  evalReturn(node, env) {
    const value = node.value ? this.evaluate(node.value, env) : null;
    throw new ReturnSignal(value);
  }

  evalTryCatch(node, env) {
    try {
      this.evalBlock(node.tryBlock, env);
    } catch (e) {
      if (e instanceof ReturnSignal || e instanceof BreakSignal || e instanceof ContinueSignal) throw e;
      const catchEnv = env.createChild();
      catchEnv.declare(node.catchParam, e.message || String(e));
      this.evalBlock(node.catchBlock, catchEnv);
    }
    return null;
  }

  evalCall(node, env) {
    const name = typeof node.callee === 'string' ? node.callee : node.callee;
    const args = node.args.map(a => this.evaluate(a, env));

    // Check builtins first (single-word builtins like random, abs, etc.)
    if (['random', 'abs', 'power', 'floor', 'ceil', 'round', 'lambai', 'jodo_rally', 'nikalo', 
         'type_kya_hai', 'aankda', 'bhaashan', 'split', 'uppercase', 'lowercase'].includes(name)) {
      return this.evalBuiltin({ name: name, args: args }, env);
    }

    // User-defined function
    const func = env.get(name);
    if (!func || func.type !== 'function') {
      throw new ModiRuntimeError(ErrorMessages.notCallable(name));
    }

    if (args.length !== func.params.length) {
      const errFn = args.length > func.params.length ? ErrorMessages.tooManyArguments : ErrorMessages.tooFewArguments;
      throw new ModiRuntimeError(errFn(name, func.params.length, args.length));
    }

    this.callDepth++;
    if (this.callDepth > this.maxCallDepth) {
      this.callDepth = 0;
      throw new ModiRuntimeError(ErrorMessages.stackOverflow());
    }

    const funcEnv = func.closure.createChild();
    for (let i = 0; i < func.params.length; i++) {
      funcEnv.declare(func.params[i], args[i]);
    }

    let result = null;
    try {
      this.evalBlock(func.body, funcEnv);
    } catch (e) {
      if (e instanceof ReturnSignal) { result = e.value; }
      else throw e;
    } finally {
      this.callDepth--;
    }
    return result;
  }

  evalBinary(node, env) {
    const left = this.evaluate(node.left, env);
    const right = this.evaluate(node.right, env);

    switch (node.operator) {
      case '+':
        if (typeof left === 'string' || typeof right === 'string') return String(left) + String(right);
        return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/':
        if (right === 0) throw new ModiRuntimeError(ErrorMessages.divisionByZero());
        return left / right;
      case '%':
        if (right === 0) throw new ModiRuntimeError(ErrorMessages.divisionByZero());
        return left % right;
      case '<': return left < right;
      case '>': return left > right;
      case '<=': return left <= right;
      case '>=': return left >= right;
      case 'same2same': return left === right;
      case 'jumla_hai': return left !== right;
      default:
        throw new ModiRuntimeError(ErrorMessages.invalidOperator(node.operator, typeof left));
    }
  }

  evalUnary(node, env) {
    const val = this.evaluate(node.operand, env);
    if (node.operator === '-') return -val;
    if (node.operator === 'bilkul_nahi') return !this.isTruthy(val);
    throw new ModiRuntimeError(ErrorMessages.invalidOperator(node.operator, typeof val));
  }

  evalLogical(node, env) {
    const left = this.evaluate(node.left, env);
    if (node.operator === 'ya') return this.isTruthy(left) ? left : this.evaluate(node.right, env);
    if (node.operator === 'aur') return !this.isTruthy(left) ? left : this.evaluate(node.right, env);
    throw new ModiRuntimeError(ErrorMessages.invalidOperator(node.operator, typeof left));
  }

  evalIndex(node, env) {
    const obj = this.evaluate(node.object, env);
    const idx = this.evaluate(node.index, env);
    if (Array.isArray(obj)) {
      if (idx < 0 || idx >= obj.length) throw new ModiRuntimeError(ErrorMessages.indexOutOfBounds(idx, obj.length));
      return obj[idx];
    }
    if (typeof obj === 'string') {
      if (idx < 0 || idx >= obj.length) throw new ModiRuntimeError(ErrorMessages.indexOutOfBounds(idx, obj.length));
      return obj[idx];
    }
    throw new ModiTypeError(ErrorMessages.typeError('rally/bhaashan', typeof obj));
  }

  evalInput(node, env) {
    const prompt = node.prompt ? this.evaluate(node.prompt, env) : '';
    return readlineSync(this.stringify(prompt));
  }

  evalBuiltin(node, env) {
    const name = node.name;
    const args = node.args.map(a => this.evaluate(a, env));

    switch (name) {
      case 'lambai':
        if (args.length !== 1) throw new ModiRuntimeError("'lambai' ko ek argument do!");
        if (typeof args[0] === 'string' || Array.isArray(args[0])) return args[0].length;
        throw new ModiRuntimeError("'lambai' sirf string ya array pe chalega!");
      
      case 'jodo_rally':
        if (args.length !== 2) throw new ModiRuntimeError("'jodo_rally' ko array aur value do!");
        if (!Array.isArray(args[0])) throw new ModiRuntimeError("Pehla argument array hona chahiye!");
        args[0].push(args[1]);
        return args[0];
      
      case 'nikalo':
        if (args.length !== 1) throw new ModiRuntimeError("'nikalo' ko ek array do!");
        if (!Array.isArray(args[0])) throw new ModiRuntimeError("Argument array hona chahiye!");
        return args[0].pop();
      
      case 'type_kya_hai':
        if (args.length !== 1) throw new ModiRuntimeError("'type_kya_hai' ko ek argument do!");
        const v = args[0];
        if (v === null) return 'nota';
        if (Array.isArray(v)) return 'rally';
        if (typeof v === 'number') return 'aankda';
        if (typeof v === 'string') return 'bhaashan';
        if (typeof v === 'boolean') return v ? 'acche_din' : 'jumla';
        return 'unknown';
      
      case 'aankda':
        if (args.length !== 1) throw new ModiRuntimeError("'aankda' ko ek argument do!");
        return Number(args[0]);
      
      case 'bhaashan':
        if (args.length !== 1) throw new ModiRuntimeError("'bhaashan' ko ek argument do!");
        return String(args[0]);
      
      case 'split':
        if (args.length < 1 || args.length > 2) throw new ModiRuntimeError("'split' ko 1 ya 2 arguments do!");
        return String(args[0]).split(args[1] || '');
      
      case 'uppercase':
        if (args.length !== 1) throw new ModiRuntimeError("'uppercase' ko ek argument do!");
        return String(args[0]).toUpperCase();
      
      case 'lowercase':
        if (args.length !== 1) throw new ModiRuntimeError("'lowercase' ko ek argument do!");
        return String(args[0]).toLowerCase();
      
      case 'abs':
        if (args.length !== 1) throw new ModiRuntimeError("'abs' ko ek argument do!");
        return Math.abs(args[0]);
      
      case 'power':
        if (args.length !== 2) throw new ModiRuntimeError("'power' ko do numbers do!");
        return Math.pow(args[0], args[1]);
      
      case 'random':
        if (args.length === 0) return Math.random();
        if (args.length === 2) return Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];
        throw new ModiRuntimeError("'random' ko 0 ya 2 arguments do!");
      
      case 'floor':
        if (args.length !== 1) throw new ModiRuntimeError("'floor' ko ek argument do!");
        return Math.floor(args[0]);
      
      case 'ceil':
        if (args.length !== 1) throw new ModiRuntimeError("'ceil' ko ek argument do!");
        return Math.ceil(args[0]);
      
      case 'round':
        if (args.length !== 1) throw new ModiRuntimeError("'round' ko ek argument do!");
        return Math.round(args[0]);
      
      default:
        throw new ModiRuntimeError("Unknown builtin function: " + name);
    }
  }

  evalBlock(stmts, parentEnv) {
    const blockEnv = parentEnv.createChild();
    let result = null;
    for (const stmt of stmts) {
      result = this.evaluate(stmt, blockEnv);
    }
    return result;
  }

  // 🤣 Opposition Party Roasts — Each party returns a hilariously fixed value
  evalOpposition(node) {
    const OPPOSITION_ROASTS = {
      'cpim':     0,                    // Zero seats, zero impact! 😂
      'congress': "",                   // Empty promises, empty result! 🫗
      'aap':      "muft",              // Everything is free! Revdi culture! 🆓
      'tmc':      "khela_hobe",        // Khela ho raha hai! 🏏
      'rjd':      "jungle_raj",        // Back to the jungle era! 🌿
      'pappu':    null,                // Pappu can't pass! 🎓❌
      'sp':       "cycle",             // Cycle chalate raho! 🚲
      'aimim':    1,                   // Ek hi seat milti hai! 1️⃣
      'bsp':      "haathi",            // Elephant walking slow! 🐘
      'jdu':      "paltu",             // Switches sides every season! 🔄
    };
    return OPPOSITION_ROASTS[node.party];
  }

  isTruthy(val) {
    if (val === null) return false;
    if (val === false) return false;
    if (val === 0) return false;
    if (val === '') return false;
    return true;
  }

  stringify(val) {
    if (val === null) return 'nota';
    if (val === true) return 'acche_din';
    if (val === false) return 'jumla';
    if (Array.isArray(val)) return '[' + val.map(v => this.stringify(v)).join(', ') + ']';
    if (typeof val === 'object' && val.type === 'function') return `<mitron ${val.name}>`;
    return String(val);
  }
}

module.exports = { Evaluator };
