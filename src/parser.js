const { TokenKind: Kinds } = require("./token-kinds");

function parser(tokens) {
  const j = JSON.stringify;
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
    if (token.kind === Kinds.NUMBER || token.kind === Kinds.IDENT) {
      node.right = parseExpression();
    }

    return node;
  }

  function parseIdentifier() {
    if (token.kind !== Kinds.IDENT) {
      panik("Not an identifier -> ");
    }

    return {
      type: "Identifier",
      value: token.value,
    };
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
    if (token.kind === Kinds.NUMBER || token.kind === Kinds.IDENT) {
      switch (token.kind) {
        case Kinds.NUMBER:
          node = parseNumber();
          break;
        case Kinds.IDENT:
          node = parseIdentifier();
          break;
        default:
          break;
      }

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

  function parseLetStatement() {
    advance();
    const identifier = parseIdentifier();

    advance();

    switch (token.kind) {
      case Kinds.ASSIGN: {
        advance();

        const exp = parseExpression();
        advance();

        return {
          type: "LetStatement",
          identifier,
          expression: exp,
        };
      }

      case Kinds.IDENT: {
        const node = {
          type: "FunctionDeclaration",
          name: identifier.value,
          params: [],
        };

        while (token.kind === Kinds.IDENT) {
          node.params.push({
            type: "Parameter",
            value: token.value,
          });
          advance();
        }

        if (token.kind === Kinds.ASSIGN) {
          advance();

          const exp = parseExpression();
          advance();
          node.expression = exp;
          return node;
        } else {
          panik(`Expected number, got ${JSON.stringify(token)}`);
        }

        panik("Failed to parse function declaration, Unexpected token -> ");
      }
      default:
        return panik("Failed to parse Let statement, Unexpected token -> ");
    }
  }

  function parseFunctionCall() {
    const node = {
      type: "FunctionCall",
      name: token.value,
      arguments: [],
    };

    advance();
    while (token.kind === Kinds.IDENT || token.kind === Kinds.NUMBER) {
      switch (token.kind) {
        case Kinds.IDENT:
          node.arguments.push(parseIdentifier());
          break;
        case Kinds.NUMBER:
          node.arguments.push(parseNumber());
      }
      advance();
    }
    return node;
  }

  function parseStatements() {
    if (token.kind === Kinds.LET) {
      return parseLetStatement();
    }

    if (token.kind === Kinds.IDENT) {
      return parseFunctionCall();
    }
    if (token.kind === Kinds.NL) {
      advance();
      return { type: "NewLine" };
    }
    panik("Unable to parse statement, unexpected token -> ");
  }

  const ast = {
    type: "Program",
    body: [],
  };
  advance();
  while (current < tokens.length) {
    ast.body.push(parseStatements());
    // console.log(`${current} ${JSON.stringify(token)}`);
  }
  // console.log(`last token in memory >> ${JSON.stringify(token)}`);

  return ast;
}

module.exports = parser;
