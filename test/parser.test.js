var expect = require("chai").expect;
const parser = require("../src/parser");

describe("praser()", () => {
  it("sould works for simple assignment: let a = 45", () => {
    const input = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "a", line: 1, col: 6 },
      { kind: "ASSIGN", value: "=", line: 1, col: 8 },
      { kind: "NUMBER", value: "45", line: 1, col: 11 },
      { kind: "EOF", value: "\x00", line: 1, col: 13 },
    ];

    const output = {
      type: "Program",
      body: [
        {
          type: "LetStatement",
          identifier: {
            type: "Identifier",
            value: "a",
          },
          expression: {
            type: "NumberLiteral",
            value: 45,
          },
        },
      ],
    };

    expect(parser(input)).to.eql(output);
  });

  it("should work for function declrations let sum a b = a + b", () => {
    const input = [
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
    const output = {
      type: "Program",
      body: [
        {
          type: "FunctionDeclaration",
          name: "sum",
          params: [
            {
              type: "Parameter",
              value: "a",
            },
            {
              type: "Parameter",
              value: "b",
            },
          ],
          expression: {
            type: "BinaryExpression",
            operator: "+",
            left: {
              type: "Identifier",
              value: "a",
            },
            right: {
              type: "Identifier",
              value: "b",
            },
          },
        },
      ],
    };

    expect(parser(input)).to.eql(output);
  });

  it("should work for function declartions and calls: ", () => {
    /* CODE
        let sum a b = a + b
        sum 4 5
        */
    const input = [
      { kind: "LET", value: "let", line: 1, col: 4 },
      { kind: "IDENT", value: "sum", line: 1, col: 8 },
      { kind: "IDENT", value: "a", line: 1, col: 10 },
      { kind: "IDENT", value: "b", line: 1, col: 12 },
      { kind: "ASSIGN", value: "=", line: 1, col: 14 },
      { kind: "IDENT", value: "a", line: 1, col: 16 },
      { kind: "PLUS", value: "+", line: 1, col: 18 },
      { kind: "IDENT", value: "b", line: 1, col: 20 },
      { kind: "NL", value: "\n", line: 1, col: 21 },
      { kind: "IDENT", value: "sum", line: 2, col: 4 },
      { kind: "NUMBER", value: "4", line: 2, col: 6 },
      { kind: "NUMBER", value: "5", line: 2, col: 8 },
      { kind: "NL", value: "\n", line: 2, col: 9 },
      { kind: "EOF", value: "\x00", line: 3, col: 3 },
    ];
    const output = {
      type: "Program",
      body: [
        {
          type: "FunctionDeclaration",
          name: "sum",
          params: [
            {
              type: "Parameter",
              value: "a",
            },
            {
              type: "Parameter",
              value: "b",
            },
          ],
          expression: {
            type: "BinaryExpression",
            operator: "+",
            left: {
              type: "Identifier",
              value: "a",
            },
            right: {
              type: "Identifier",
              value: "b",
            },
          },
        },
        {
          type: "NewLine",
        },
        {
          type: "FunctionCall",
          name: "sum",
          arguments: [
            {
              type: "NumberLiteral",
              value: 4,
            },
            {
              type: "NumberLiteral",
              value: 5,
            },
          ],
        },
        {
          type: "NewLine",
        },
      ],
    };
    expect(parser(input)).to.eql(output);
  });
});
