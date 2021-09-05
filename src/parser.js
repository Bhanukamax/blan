const { TokenKind: Kinds } = require("./token-kinds");

function parser(tokens) {
  let current = 0;
  let token = tokens[current];

  function panik(prefix = "Unexpected token") {
    throw `${prefix} ${JSON.stringify(token)}`;
  }

  function advance() {
    token = tokens[current++];
  }

  function peek() {
    if (current < tokens.length) {
      return tokens[current].kind;
    } else {
      return Kinds.EOF;
    }
  }

  function NumberLiteral(token) {
    return {
      type: "NumberLiteral",
      value: Number(token.value),
    };
  }

  function MathOperator(token) {
    return {
      type: "MathOperator",
      kind: token.kind,
      value: token.value,
    };
  }

  function parseBinaryExpression(left) {
    let right;
    const node = {
      kind: "BinaryExpression",
      value: token.value,
      left,
      right,
    };
    advance();
    if (token.kind === Kinds.NUMBER) {
      node.right = parseExpression();
    }

    return node;
  }

  function parseNumber() {
    if (token.kind === Kinds.NUMBER) {
      return {
        kind: "Number",
        value: token.value,
      };
    }
    panik();
  }

  function parseExpression() {
    let node = {};
    if (token.kind === Kinds.NUMBER) {
      node = parseNumber();
      if (peek() === Kinds.PLUS) {
        advance();
        return parseBinaryExpression(node);
      }
    }
    return node;
  }

  function parseIdentifier() {
    if (token.kind !== Kinds.IDENT) {
      throw `Not an identifier ${JSON.stringify(token)}`;
    }

    return {
      kind: Kinds.IDENT,
      token: token.value,
    };
  }

  function parseLetStatement() {
    advance();
    advance();
    const identifier = parseIdentifier();

    advance();
    if (token.kind !== Kinds.ASSIGN) {
      throw `Unexpected token ${JSON.stringify(token)} `;
    }
    advance();

    const exp = parseExpression();

    return {
      kind: "LetStatement",
      identifier,
      expression: exp,
    };
  }

  function parseStatements() {
    if (token.kind === Kinds.LET) {
      return parseLetStatement();
    }
  }

  const ast = {
    type: "Program",
    body: [],
  };
  ast.body.push(parseStatements());

  return ast;
}

module.exports = parser;
