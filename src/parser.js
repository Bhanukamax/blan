const { TokenKind: Kinds } = require("./token-kinds");

function parser(tokens) {
  let current = 0;
  let token = tokens[current];

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

    return {
      kind: "LetStatement",
      identifier,
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
