var expect = require("chai").expect;
const lexer = require("../src/lexer");

describe("lexer()", () => {
  it("sould works for simple assignment", () => {
    const input = `let a = 4`;
    const output = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "a", line: 1, col: 6 },
      { kind: "ASSIGN", value: "=", line: 1, col: 8 },
      { kind: "NUMBER", value: "4", line: 1, col: 10 },
      { kind: "EOF", value: "\x00", line: 1, col: 12 },
    ];

    const lex = new lexer.Lexer(input);

    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });

  it("tokenize an assignment with expression", () => {
    const input = `let a = b + 4`;
    const output = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "a", line: 1, col: 6 },
      { kind: "ASSIGN", value: "=", line: 1, col: 8 },
      { kind: "IDENT", value: "b", line: 1, col: 10 },
      { kind: "PLUS", value: "+", line: 1, col: 12 },
      { kind: "NUMBER", value: "4", line: 1, col: 14 },
      { kind: "EOF", value: "\x00", line: 1, col: 16 },
    ];
    const lex = new lexer.Lexer(input);

    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });

  it("sould works for function calls", () => {
    const input = `sum 2 5`;
    const output = [
      { kind: "IDENT", value: "sum", line: 1, col: 4 },
      { kind: "NUMBER", value: "2", line: 1, col: 6 },
      { kind: "NUMBER", value: "5", line: 1, col: 8 },
      { kind: "EOF", value: "\x00", line: 1, col: 10 },
    ];

    const lex = new lexer.Lexer(input);
    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });

  it("tokenize multiple lines", () => {
    const input = `let a = 5
let a = b + 4`;

    const output = [
      { kind: "LET", value: "let" },
      { kind: "IDENT", value: "a" },
      { kind: "ASSIGN", value: "=" },
      { kind: "NUMBER", value: "5" },
      { kind: "NL", value: "\n" },

      { kind: "LET", value: "let" },
      { kind: "IDENT", value: "a" },
      { kind: "ASSIGN", value: "=" },
      { kind: "IDENT", value: "b" },
      { kind: "PLUS", value: "+" },
      { kind: "NUMBER", value: "4" },
      { kind: "EOF", value: "\x00" },
    ];

    const lex = new lexer.Lexer(input);
    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });

  it("tokenizes function declarations", () => {
    const input = `let sum a b = a + b`;

    const output = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "sum", line: 1, col: 8 },
      { kind: "IDENT", value: "a", line: 1, col: 10 },
      { kind: "IDENT", value: "b", line: 1, col: 12 },
      { kind: "ASSIGN", value: "=", line: 1, col: 14 },
      { kind: "IDENT", value: "a", line: 1, col: 16 },
      { kind: "PLUS", value: "+", line: 1, col: 18 },
      { kind: "IDENT", value: "b", line: 1, col: 20 },
      { kind: "EOF", value: "\x00", line: 1, col: 22 },
    ];

    const lex = new lexer.Lexer(input);
    expect(lex.lex()).to.eql(output);
  });

  it("tokenizes function declarations and other stuff in the same file in multi lines", () => {
    const input = ` let b = 4
let foo a b  = 5 + 5
let foo a b  = 5 + 5
let b = 4
`;

    const output = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "b", line: 1, col: 6 },
      { kind: "ASSIGN", value: "=", line: 1, col: 8 },
      { kind: "NUMBER", value: "4", line: 1, col: 10 },
      { kind: "NL", value: "\n", line: 1, col: 11 },
      { kind: "LET", value: "let", line: 2, col: 4 },
      { kind: "IDENT", value: "foo", line: 2, col: 8 },
      { kind: "IDENT", value: "a", line: 2, col: 10 },
      { kind: "IDENT", value: "b", line: 2, col: 12 },
      { kind: "ASSIGN", value: "=", line: 2, col: 15 },
      { kind: "NUMBER", value: "5", line: 2, col: 17 },
      { kind: "PLUS", value: "+", line: 2, col: 19 },
      { kind: "NUMBER", value: "5", line: 2, col: 21 },
      { kind: "NL", value: "\n", line: 2, col: 22 },
      { kind: "LET", value: "let", line: 3, col: 4 },
      { kind: "IDENT", value: "foo", line: 3, col: 8 },
      { kind: "IDENT", value: "a", line: 3, col: 10 },
      { kind: "IDENT", value: "b", line: 3, col: 12 },
      { kind: "ASSIGN", value: "=", line: 3, col: 15 },
      { kind: "NUMBER", value: "5", line: 3, col: 17 },
      { kind: "PLUS", value: "+", line: 3, col: 19 },
      { kind: "NUMBER", value: "5", line: 3, col: 21 },
      { kind: "NL", value: "\n", line: 3, col: 22 },
      { kind: "LET", value: "let", line: 4, col: 4 },
      { kind: "IDENT", value: "b", line: 4, col: 6 },
      { kind: "ASSIGN", value: "=", line: 4, col: 8 },
      { kind: "NUMBER", value: "4", line: 4, col: 10 },
      { kind: "NL", value: "\n", line: 4, col: 11 },
      { kind: "EOF", value: "\x00", line: 5, col: 3 },
    ];

    const lex = new lexer.Lexer(input);

    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });

  it("tokenizes function declarations and with function call together", () => {
    const input = `let sum a b = a + b
sum 4 5
`;

    const output = [
  { kind: 'LET', value: 'let', line: 1, col: 4 },
  { kind: 'IDENT', value: 'sum', line: 1, col: 8 },
  { kind: 'IDENT', value: 'a', line: 1, col: 10 },
  { kind: 'IDENT', value: 'b', line: 1, col: 12 },
  { kind: 'ASSIGN', value: '=', line: 1, col: 14 },
  { kind: 'IDENT', value: 'a', line: 1, col: 16 },
  { kind: 'PLUS', value: '+', line: 1, col: 18 },
  { kind: 'IDENT', value: 'b', line: 1, col: 20 },
  { kind: 'NL', value: '\n', line: 1, col: 21 },
  { kind: 'IDENT', value: 'sum', line: 2, col: 4 },
  { kind: 'NUMBER', value: '4', line: 2, col: 6 },
  { kind: 'NUMBER', value: '5', line: 2, col: 8 },
  { kind: 'NL', value: '\n', line: 2, col: 9 },
  { kind: 'EOF', value: '\x00', line: 3, col: 3 }
]

    const lex = new lexer.Lexer(input);

    lex.lex().forEach(({ kind, value }, idx) => {
      const { kind: oKind, value: oValue } = output[idx];

      expect({ kind, value }).to.eql({ kind: oKind, value: oValue });
    });
  });


});
