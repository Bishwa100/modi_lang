// ============================================
// 🇮🇳 Modi Lang — Hilarious Error Messages
// "Mitron, galti sabse hoti hai!"
// ============================================

class ModiError extends Error {
  constructor(message, line, column) {
    super(message);
    this.name = 'ModiError';
    this.line = line;
    this.column = column;
  }

  toString() {
    const location = this.line ? ` (Line ${this.line}, Column ${this.column})` : '';
    return `\n🚨 MODI LANG ERROR${location}:\n   ${this.message}\n`;
  }
}

class ModiSyntaxError extends ModiError {
  constructor(message, line, column) {
    super(message, line, column);
    this.name = 'ModiSyntaxError';
  }
}

class ModiRuntimeError extends ModiError {
  constructor(message, line, column) {
    super(message, line, column);
    this.name = 'ModiRuntimeError';
  }
}

class ModiTypeError extends ModiError {
  constructor(message, line, column) {
    super(message, line, column);
    this.name = 'ModiTypeError';
  }
}

// --- Funny Error Message Generators ---

const ErrorMessages = {
  syntaxError: (details) =>
    `Mitron, ye kya likh diya? Galat syntax hai! 🤦\n   ${details}`,

  undefinedVariable: (name) =>
    `Ye variable toh Note-bandi mein chala gaya! 💸 '${name}' not found.\n   Pehle 'modi ${name} = ...' se declare karo!`,

  divisionByZero: () =>
    `Zero se divide? Ye toh jumla hai mitron! ➗🚫\n   Maths ke acche din nahi aayenge aise!`,

  typeError: (expected, got) =>
    `Mitron, ye types match nahi kar rahe! Chai aur pakoda mix mat karo! 🍵🍳\n   Expected '${expected}', but got '${got}'`,

  stackOverflow: () =>
    `Itna recursion? Modiji bhi thak jayenge! 😵‍💫\n   Apne function ko rokna seekho!`,

  missingSemicolon: (line) =>
    `Semicolon bhool gaye? Digital India mein precision zaroori hai! ⌨️\n   Line ${line} pe semicolon lagao!`,

  fileNotFound: (filename) =>
    `File nahi mili! Shayad Swachh Bharat mein saaf ho gayi! 🧹\n   '${filename}' not found`,

  missingJaiHind: () =>
    `Program khatam karo 'jai_hind' ke saath! Deshbhakti dikhao! 🇮🇳`,

  missingNamaste: () =>
    `Pehle 'namaste' toh bolo! Tameez se shuru karo! 🙏`,

  unknownToken: (token) =>
    `Ye kya hai mitron? '${token}' toh hamare dictionary mein nahi hai! 📖`,

  tooManyArguments: (funcName, expected, got) =>
    `Itne arguments? Ye Mann Ki Baat hai, Parliament nahi! 🏛️\n   '${funcName}' expects ${expected} arguments, got ${got}`,

  tooFewArguments: (funcName, expected, got) =>
    `Itne kam arguments? Mitron, puri taiyari ke saath aao! 📋\n   '${funcName}' expects ${expected} arguments, got ${got}`,

  runtimeCrash: (details) =>
    `BREAKING: Program crashed! Blame it on Congress! 😂\n   ${details}`,

  unexpectedToken: (expected, got) =>
    `Mitron, yahan '${expected}' chahiye tha, lekin '${got}' aa gaya! 🤷`,

  functionNotFound: (name) =>
    `'${name}' function nahi mila! Ye toh jumla nikla! 📢\n   Pehle 'mitron ${name}(...)' se define karo!`,

  alreadyDeclared: (name) =>
    `'${name}' toh pehle se declare hai! Double engine sarkar nahi chalegi yahan! 🚂🚂`,

  breakOutsideLoop: () =>
    `'demonetization' sirf loop ke andar use karo! Bahar demonetize nahi kar sakte! 💸`,

  continueOutsideLoop: () =>
    `'aage_badho' sirf loop ke andar! Pehle loop mein toh aao! 🏃`,

  returnOutsideFunction: () =>
    `'laut_aao' sirf function ke andar! Bina gaye kahan se lautoge? 🤔`,

  invalidOperator: (op, type) =>
    `'${op}' operator '${type}' pe kaam nahi karta! Ye toh galat hai mitron! ❌`,

  indexOutOfBounds: (index, length) =>
    `Index ${index} out of bounds! Rally mein sirf ${length} log hain! 📊`,

  notCallable: (name) =>
    `'${name}' ko call nahi kar sakte! Ye function nahi hai, mitron! 📞❌`,
};

module.exports = {
  ModiError,
  ModiSyntaxError,
  ModiRuntimeError,
  ModiTypeError,
  ErrorMessages,
};
