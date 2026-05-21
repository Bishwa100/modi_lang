// 🇮🇳 Modi Lang — Comprehensive Test Suite
// "Mitron, testing bhi zaroori hai!"

const { describe, it } = require('node:test');
const assert = require('node:assert');
const { Lexer } = require('../src/lexer');
const { Parser } = require('../src/parser');
const { Evaluator } = require('../src/evaluator');

// Helper to run Modi Lang code and capture output
function runModi(source) {
  const lexer = new Lexer(source);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  const ast = parser.parse();
  const evaluator = new Evaluator();
  // Suppress console.log during tests
  const origLog = console.log;
  console.log = () => {};
  const output = evaluator.run(ast);
  console.log = origLog;
  return output;
}

// Helper to check that code throws
function assertThrows(source) {
  assert.throws(() => runModi(source));
}

// ==========================================
// 🧪 VARIABLE DECLARATIONS
// ==========================================
describe('Variable Declarations (modi)', () => {
  it('should declare and print a number', () => {
    const output = runModi('modi x = 42; mann_ki_baat(x);');
    assert.deepStrictEqual(output, ['42']);
  });

  it('should declare and print a string', () => {
    const output = runModi('modi name = "Mitron"; mann_ki_baat(name);');
    assert.deepStrictEqual(output, ['Mitron']);
  });

  it('should declare boolean acche_din (true)', () => {
    const output = runModi('modi flag = acche_din; mann_ki_baat(flag);');
    assert.deepStrictEqual(output, ['acche_din']);
  });

  it('should declare boolean jumla (false)', () => {
    const output = runModi('modi flag = jumla; mann_ki_baat(flag);');
    assert.deepStrictEqual(output, ['jumla']);
  });

  it('should declare nota (null)', () => {
    const output = runModi('modi x = nota; mann_ki_baat(x);');
    assert.deepStrictEqual(output, ['nota']);
  });

  it('should reassign variables', () => {
    const output = runModi('modi x = 1; x = 2; mann_ki_baat(x);');
    assert.deepStrictEqual(output, ['2']);
  });

  it('should throw on undefined variable', () => {
    assertThrows('mann_ki_baat(undefined_var);');
  });
});

// ==========================================
// 🧪 ARITHMETIC
// ==========================================
describe('Arithmetic Operations', () => {
  it('should add numbers', () => {
    const output = runModi('mann_ki_baat(10 + 20);');
    assert.deepStrictEqual(output, ['30']);
  });

  it('should subtract numbers', () => {
    const output = runModi('mann_ki_baat(50 - 30);');
    assert.deepStrictEqual(output, ['20']);
  });

  it('should multiply numbers', () => {
    const output = runModi('mann_ki_baat(6 * 7);');
    assert.deepStrictEqual(output, ['42']);
  });

  it('should divide numbers', () => {
    const output = runModi('mann_ki_baat(100 / 4);');
    assert.deepStrictEqual(output, ['25']);
  });

  it('should modulo numbers', () => {
    const output = runModi('mann_ki_baat(17 % 5);');
    assert.deepStrictEqual(output, ['2']);
  });

  it('should handle string concatenation', () => {
    const output = runModi('mann_ki_baat("Hello " + "World");');
    assert.deepStrictEqual(output, ['Hello World']);
  });

  it('should concatenate string and number', () => {
    const output = runModi('mann_ki_baat("Age: " + 25);');
    assert.deepStrictEqual(output, ['Age: 25']);
  });

  it('should throw on division by zero', () => {
    assertThrows('mann_ki_baat(10 / 0);');
  });

  it('should handle negative numbers', () => {
    const output = runModi('mann_ki_baat(-5);');
    assert.deepStrictEqual(output, ['-5']);
  });
});

// ==========================================
// 🧪 COMPARISONS & LOGICAL
// ==========================================
describe('Comparisons & Logical Operators', () => {
  it('same2same should check equality', () => {
    const output = runModi('mann_ki_baat(5 same2same 5);');
    assert.deepStrictEqual(output, ['acche_din']);
  });

  it('jumla_hai should check inequality', () => {
    const output = runModi('mann_ki_baat(5 jumla_hai 3);');
    assert.deepStrictEqual(output, ['acche_din']);
  });

  it('should compare with < and >', () => {
    const o1 = runModi('mann_ki_baat(3 < 5);');
    assert.deepStrictEqual(o1, ['acche_din']);
    const o2 = runModi('mann_ki_baat(10 > 3);');
    assert.deepStrictEqual(o2, ['acche_din']);
  });

  it('should compare with <= and >=', () => {
    const o1 = runModi('mann_ki_baat(5 <= 5);');
    assert.deepStrictEqual(o1, ['acche_din']);
    const o2 = runModi('mann_ki_baat(5 >= 4);');
    assert.deepStrictEqual(o2, ['acche_din']);
  });

  it('aur (AND) should work', () => {
    const output = runModi('mann_ki_baat(acche_din aur acche_din);');
    assert.deepStrictEqual(output, ['acche_din']);
  });

  it('ya (OR) should work', () => {
    const output = runModi('mann_ki_baat(jumla ya acche_din);');
    assert.deepStrictEqual(output, ['acche_din']);
  });

  it('bilkul_nahi (NOT) should work', () => {
    const output = runModi('mann_ki_baat(bilkul_nahi jumla);');
    assert.deepStrictEqual(output, ['acche_din']);
  });
});

// ==========================================
// 🧪 CONDITIONALS
// ==========================================
describe('Conditionals (agar_modi / nahi_toh / warna_modi)', () => {
  it('should execute if branch when true', () => {
    const output = runModi(`
      agar_modi (acche_din) {
        mann_ki_baat("yes");
      }
    `);
    assert.deepStrictEqual(output, ['yes']);
  });

  it('should execute else branch when false', () => {
    const output = runModi(`
      agar_modi (jumla) {
        mann_ki_baat("yes");
      } nahi_toh {
        mann_ki_baat("no");
      }
    `);
    assert.deepStrictEqual(output, ['no']);
  });

  it('should handle else-if (warna_modi)', () => {
    const output = runModi(`
      modi x = 2;
      agar_modi (x same2same 1) {
        mann_ki_baat("one");
      } warna_modi (x same2same 2) {
        mann_ki_baat("two");
      } nahi_toh {
        mann_ki_baat("other");
      }
    `);
    assert.deepStrictEqual(output, ['two']);
  });
});

// ==========================================
// 🧪 LOOPS
// ==========================================
describe('Loops (ghuma_ke / sabka_saath)', () => {
  it('while loop should work', () => {
    const output = runModi(`
      modi i = 0;
      ghuma_ke (i < 3) {
        mann_ki_baat(i);
        i = i + 1;
      }
    `);
    assert.deepStrictEqual(output, ['0', '1', '2']);
  });

  it('for loop should work', () => {
    const output = runModi(`
      sabka_saath (modi i = 1; i <= 3; i = i + 1) {
        mann_ki_baat(i);
      }
    `);
    assert.deepStrictEqual(output, ['1', '2', '3']);
  });

  it('break (bas_kar) should exit loop', () => {
    const output = runModi(`
      sabka_saath (modi i = 1; i <= 10; i = i + 1) {
        agar_modi (i same2same 3) { bas_kar; }
        mann_ki_baat(i);
      }
    `);
    assert.deepStrictEqual(output, ['1', '2']);
  });

  it('continue (aage_badho) should skip iteration', () => {
    const output = runModi(`
      sabka_saath (modi i = 1; i <= 5; i = i + 1) {
        agar_modi (i same2same 3) { aage_badho; }
        mann_ki_baat(i);
      }
    `);
    assert.deepStrictEqual(output, ['1', '2', '4', '5']);
  });
});

// ==========================================
// 🧪 FUNCTIONS
// ==========================================
describe('Functions (mitron / laut_aao)', () => {
  it('should declare and call a function', () => {
    const output = runModi(`
      mitron greet() {
        mann_ki_baat("Namaste!");
      }
      greet();
    `);
    assert.deepStrictEqual(output, ['Namaste!']);
  });

  it('should handle parameters', () => {
    const output = runModi(`
      mitron add(a, b) {
        laut_aao a + b;
      }
      mann_ki_baat(add(10, 20));
    `);
    assert.deepStrictEqual(output, ['30']);
  });

  it('should handle recursion (factorial)', () => {
    const output = runModi(`
      mitron factorial(n) {
        agar_modi (n same2same 0) { laut_aao 1; }
        laut_aao n * factorial(n - 1);
      }
      mann_ki_baat(factorial(5));
    `);
    assert.deepStrictEqual(output, ['120']);
  });

  it('should return null if no laut_aao', () => {
    const output = runModi(`
      mitron nothing() {
        modi x = 1;
      }
      mann_ki_baat(nothing());
    `);
    assert.deepStrictEqual(output, ['nota']);
  });
});

// ==========================================
// 🧪 ARRAYS
// ==========================================
describe('Arrays (Rally)', () => {
  it('should create and access arrays', () => {
    const output = runModi(`
      modi arr = [10, 20, 30];
      mann_ki_baat(arr[0]);
      mann_ki_baat(arr[2]);
    `);
    assert.deepStrictEqual(output, ['10', '30']);
  });

  it('lambai should return length', () => {
    const output = runModi(`
      modi arr = [1, 2, 3, 4, 5];
      mann_ki_baat(lambai(arr));
    `);
    assert.deepStrictEqual(output, ['5']);
  });

  it('jodo_rally should push element', () => {
    const output = runModi(`
      modi arr = [1, 2];
      jodo_rally(arr, 3);
      mann_ki_baat(lambai(arr));
      mann_ki_baat(arr[2]);
    `);
    assert.deepStrictEqual(output, ['3', '3']);
  });

  it('nikalo should pop element', () => {
    const output = runModi(`
      modi arr = [1, 2, 3];
      modi last = nikalo(arr);
      mann_ki_baat(last);
      mann_ki_baat(lambai(arr));
    `);
    assert.deepStrictEqual(output, ['3', '2']);
  });
});

// ==========================================
// 🧪 BUILT-IN FUNCTIONS
// ==========================================
describe('Built-in Functions', () => {
  it('type_kya_hai should return correct types', () => {
    const output = runModi(`
      mann_ki_baat(type_kya_hai(42));
      mann_ki_baat(type_kya_hai("hello"));
      mann_ki_baat(type_kya_hai(acche_din));
      mann_ki_baat(type_kya_hai(nota));
      mann_ki_baat(type_kya_hai([1,2]));
    `);
    assert.deepStrictEqual(output, ['aankda', 'bhaashan', 'acche_din', 'nota', 'rally']);
  });

  it('aankda should convert to number', () => {
    const output = runModi('mann_ki_baat(aankda("42") + 8);');
    assert.deepStrictEqual(output, ['50']);
  });

  it('bhaashan should convert to string', () => {
    const output = runModi('mann_ki_baat(bhaashan(42));');
    assert.deepStrictEqual(output, ['42']);
  });

  it('uppercase/lowercase should work', () => {
    const output = runModi(`
      mann_ki_baat(uppercase("hello"));
      mann_ki_baat(lowercase("HELLO"));
    `);
    assert.deepStrictEqual(output, ['HELLO', 'hello']);
  });

  it('split should work', () => {
    const output = runModi(`
      modi parts = split("a,b,c", ",");
      mann_ki_baat(lambai(parts));
      mann_ki_baat(parts[0]);
    `);
    assert.deepStrictEqual(output, ['3', 'a']);
  });

  it('abs should return absolute value', () => {
    const output = runModi('mann_ki_baat(abs(-42));');
    assert.deepStrictEqual(output, ['42']);
  });

  it('power should compute exponentiation', () => {
    const output = runModi('mann_ki_baat(power(2, 10));');
    assert.deepStrictEqual(output, ['1024']);
  });

  it('floor/ceil/round should work', () => {
    const output = runModi(`
      mann_ki_baat(floor(3.7));
      mann_ki_baat(ceil(3.2));
      mann_ki_baat(round(3.5));
    `);
    assert.deepStrictEqual(output, ['3', '4', '4']);
  });

  it('lambai should work on strings', () => {
    const output = runModi('mann_ki_baat(lambai("Modi"));');
    assert.deepStrictEqual(output, ['4']);
  });
});

// ==========================================
// 🧪 ERROR HANDLING
// ==========================================
describe('Error Handling (modi_hai_toh / pakoda)', () => {
  it('should catch errors in try block', () => {
    const output = runModi(`
      modi_hai_toh {
        modi x = 10 / 0;
      } pakoda (err) {
        mann_ki_baat("caught");
      }
    `);
    assert.deepStrictEqual(output, ['caught']);
  });

  it('should pass error message to catch', () => {
    const output = runModi(`
      modi_hai_toh {
        mann_ki_baat(undefined_var);
      } pakoda (err) {
        mann_ki_baat("error happened");
      }
    `);
    assert.deepStrictEqual(output, ['error happened']);
  });

  it('should not catch if no error', () => {
    const output = runModi(`
      modi_hai_toh {
        mann_ki_baat("ok");
      } pakoda (err) {
        mann_ki_baat("error");
      }
    `);
    assert.deepStrictEqual(output, ['ok']);
  });
});

// ==========================================
// 🧪 PROGRAM DELIMITERS
// ==========================================
describe('Program Delimiters (namaste / jai_hind)', () => {
  it('should work with namaste and jai_hind', () => {
    const output = runModi(`
      namaste
      mann_ki_baat("hello");
      jai_hind
    `);
    assert.deepStrictEqual(output, ['hello']);
  });

  it('should work without delimiters', () => {
    const output = runModi('mann_ki_baat("hello");');
    assert.deepStrictEqual(output, ['hello']);
  });
});

// ==========================================
// 🧪 COMMENTS
// ==========================================
describe('Comments', () => {
  it('should ignore single-line comments', () => {
    const output = runModi(`
      // this is a comment
      mann_ki_baat("hello");
      // another comment
    `);
    assert.deepStrictEqual(output, ['hello']);
  });

  it('should ignore multi-line comments', () => {
    const output = runModi(`
      /* this is a
         multi-line comment */
      mann_ki_baat("hello");
    `);
    assert.deepStrictEqual(output, ['hello']);
  });
});

// ==========================================
// 🧪 STRINGS
// ==========================================
describe('String Features', () => {
  it('should handle escape sequences', () => {
    const output = runModi('mann_ki_baat("hello\\nworld");');
    assert.deepStrictEqual(output, ['hello\nworld']);
  });

  it('should handle single-quoted strings', () => {
    const output = runModi("mann_ki_baat('hello');");
    assert.deepStrictEqual(output, ['hello']);
  });
});

// ==========================================
// 🧪 EDGE CASES
// ==========================================
describe('Edge Cases', () => {
  it('should handle nested functions', () => {
    const output = runModi(`
      mitron outer() {
        mitron inner() {
          laut_aao 42;
        }
        laut_aao inner();
      }
      mann_ki_baat(outer());
    `);
    assert.deepStrictEqual(output, ['42']);
  });

  it('should handle nested loops', () => {
    const output = runModi(`
      modi result = "";
      sabka_saath (modi i = 1; i <= 2; i = i + 1) {
        sabka_saath (modi j = 1; j <= 2; j = j + 1) {
          result = result + i + j;
        }
      }
      mann_ki_baat(result);
    `);
    assert.deepStrictEqual(output, ['11122122']);
  });

  it('should handle complex expressions', () => {
    const output = runModi('mann_ki_baat((2 + 3) * (4 - 1));');
    assert.deepStrictEqual(output, ['15']);
  });

  it('should handle FizzBuzz', () => {
    const output = runModi(`
      sabka_saath (modi i = 1; i <= 5; i = i + 1) {
        agar_modi (i % 3 same2same 0) {
          mann_ki_baat("Fizz");
        } nahi_toh {
          mann_ki_baat(i);
        }
      }
    `);
    assert.deepStrictEqual(output, ['1', '2', 'Fizz', '4', '5']);
  });
});

// ==========================================
// 🧪 OPPOSITION PARTY ROASTS 🤣
// ==========================================
describe('Opposition Party Roasts 🤣', () => {
  it('cpim should always return 0 (zero seats!)', () => {
    const output = runModi('mann_ki_baat(cpim);');
    assert.deepStrictEqual(output, ['0']);
  });

  it('congress should always return empty string', () => {
    const output = runModi('mann_ki_baat("Congress: " + congress);');
    assert.deepStrictEqual(output, ['Congress: ']);
  });

  it('aap should always return "muft"', () => {
    const output = runModi('mann_ki_baat(aap);');
    assert.deepStrictEqual(output, ['muft']);
  });

  it('tmc should always return "khela_hobe"', () => {
    const output = runModi('mann_ki_baat(tmc);');
    assert.deepStrictEqual(output, ['khela_hobe']);
  });

  it('rjd should always return "jungle_raj"', () => {
    const output = runModi('mann_ki_baat(rjd);');
    assert.deepStrictEqual(output, ['jungle_raj']);
  });

  it('pappu should always return null (nota)', () => {
    const output = runModi('mann_ki_baat(pappu);');
    assert.deepStrictEqual(output, ['nota']);
  });

  it('sp should always return "cycle"', () => {
    const output = runModi('mann_ki_baat(sp);');
    assert.deepStrictEqual(output, ['cycle']);
  });

  it('aimim should always return 1', () => {
    const output = runModi('mann_ki_baat(aimim);');
    assert.deepStrictEqual(output, ['1']);
  });

  it('bsp should always return "haathi"', () => {
    const output = runModi('mann_ki_baat(bsp);');
    assert.deepStrictEqual(output, ['haathi']);
  });

  it('jdu should always return "paltu"', () => {
    const output = runModi('mann_ki_baat(jdu);');
    assert.deepStrictEqual(output, ['paltu']);
  });

  it('cpim + aimim should equal 1 (0 + 1)', () => {
    const output = runModi('mann_ki_baat(cpim + aimim);');
    assert.deepStrictEqual(output, ['1']);
  });

  it('cpim should be falsy (0 is falsy)', () => {
    const output = runModi(`
      agar_modi (cpim) {
        mann_ki_baat("impossible");
      } nahi_toh {
        mann_ki_baat("CPIM is nothing!");
      }
    `);
    assert.deepStrictEqual(output, ['CPIM is nothing!']);
  });

  it('congress should be falsy (empty string is falsy)', () => {
    const output = runModi(`
      agar_modi (congress) {
        mann_ki_baat("impossible");
      } nahi_toh {
        mann_ki_baat("Congress is empty!");
      }
    `);
    assert.deepStrictEqual(output, ['Congress is empty!']);
  });

  it('pappu should be falsy (null is falsy)', () => {
    const output = runModi(`
      agar_modi (pappu) {
        mann_ki_baat("impossible");
      } nahi_toh {
        mann_ki_baat("Pappu fail!");
      }
    `);
    assert.deepStrictEqual(output, ['Pappu fail!']);
  });
});
