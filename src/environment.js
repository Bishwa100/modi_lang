// 🇮🇳 Modi Lang — Environment (Variable Scope)
const { ModiRuntimeError, ErrorMessages } = require('./errors');

class Environment {
  constructor(parent = null) {
    this.variables = new Map();
    this.parent = parent;
  }

  declare(name, value) {
    if (this.variables.has(name)) {
      throw new ModiRuntimeError(ErrorMessages.alreadyDeclared(name));
    }
    this.variables.set(name, value);
  }

  get(name) {
    if (this.variables.has(name)) return this.variables.get(name);
    if (this.parent) return this.parent.get(name);
    throw new ModiRuntimeError(ErrorMessages.undefinedVariable(name));
  }

  set(name, value) {
    if (this.variables.has(name)) { this.variables.set(name, value); return; }
    if (this.parent) { this.parent.set(name, value); return; }
    throw new ModiRuntimeError(ErrorMessages.undefinedVariable(name));
  }

  has(name) {
    if (this.variables.has(name)) return true;
    if (this.parent) return this.parent.has(name);
    return false;
  }

  createChild() { return new Environment(this); }
}

module.exports = { Environment };
