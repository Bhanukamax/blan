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

  function parseBinaryExpression(left) {
    let right;
    const node = {
      type: "BinaryExpression",
      operator: token.value,
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
        type: "NumberLiteral",
        value: Number(token.value),
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
      if (peek() === Kinds.MINUS) {
        advance();
        return parseBinaryExpression(node);
      }
      if (peek() === Kinds.MUL) {
        advance();
        return parseBinaryExpression(node);
      }
      if (peek() === Kinds.DIV) {
        advance();
        return parseBinaryExpression(node);
      }
    }
    return node;
  }

  function parseIdentifier() {
    if (token.kind !== Kinds.IDENT) {
      panik("Not an identifier -> ");
    }

    return {
      kind: Kinds.IDENT,
      value: token.value,
    };
  }

  function parseLetStatement() {
    advance();
    const identifier = parseIdentifier();

    advance();
    if (token.kind !== Kinds.ASSIGN) {
      panik("Unexpected token -> ");
    }
    advance();

    const exp = parseExpression();
    advance();

    return {
      type: "LetStatement",
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
  advance();
  while (current < tokens.length) {
    ast.body.push(parseStatements());
    console.log(`${current} ${JSON.stringify(token)}`)
    if (token.kind === Kinds.NL) {
      advance();
    }
  }
  console.log(`last token in memory >> ${JSON.stringify(token)}`);

  return ast;
}

module.exports = parser;
