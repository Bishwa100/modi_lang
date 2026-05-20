// 🇮🇳 Modi Lang — Built-in Functions
// "Mitron, ye toh free mein milta hai!"

const builtins = {
  // Type conversion
  aankda: (args) => {
    if (args.length !== 1) throw new Error("'aankda' ko ek argument do!");
    return Number(args[0]);
  },
  bhaashan: (args) => {
    if (args.length !== 1) throw new Error("'bhaashan' ko ek argument do!");
    return String(args[0]);
  },

  // Array functions
  lambai: (args) => {
    if (args.length !== 1) throw new Error("'lambai' ko ek argument do!");
    if (typeof args[0] === 'string' || Array.isArray(args[0])) return args[0].length;
    throw new Error("'lambai' sirf string ya array pe chalega!");
  },
  jodo_rally: (args) => {
    if (args.length < 2) throw new Error("'jodo_rally' ko array aur value do!");
    if (!Array.isArray(args[0])) throw new Error("Pehla argument array hona chahiye!");
    args[0].push(args[1]);
    return args[0];
  },
  nikalo: (args) => {
    if (args.length !== 1) throw new Error("'nikalo' ko ek array do!");
    if (!Array.isArray(args[0])) throw new Error("Argument array hona chahiye!");
    return args[0].pop();
  },

  // Math
  power: (args) => {
    if (args.length !== 2) throw new Error("'power' ko do numbers do!");
    return Math.pow(args[0], args[1]);
  },
  abs: (args) => {
    if (args.length !== 1) throw new Error("'abs' ko ek number do!");
    return Math.abs(args[0]);
  },
  random: (args) => {
    if (args.length === 0) return Math.random();
    if (args.length === 2) return Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];
    throw new Error("'random' ko 0 ya 2 arguments do!");
  },
  floor: (args) => Math.floor(args[0]),
  ceil: (args) => Math.ceil(args[0]),
  round: (args) => Math.round(args[0]),

  // String
  uppercase: (args) => String(args[0]).toUpperCase(),
  lowercase: (args) => String(args[0]).toLowerCase(),
  split: (args) => String(args[0]).split(args[1] || ''),

  // Utility
  type_kya_hai: (args) => {
    if (args.length !== 1) throw new Error("'type_kya_hai' ko ek argument do!");
    const v = args[0];
    if (v === null) return 'nota';
    if (Array.isArray(v)) return 'rally';
    if (typeof v === 'number') return 'aankda';
    if (typeof v === 'string') return 'bhaashan';
    if (typeof v === 'boolean') return v ? 'acche_din' : 'jumla';
    return 'unknown';
  },
};

module.exports = { builtins };
