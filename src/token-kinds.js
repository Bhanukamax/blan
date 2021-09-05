
const TokenKind = {
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  KEYWORD: "KEYWORD",
  PRINT: "PRINT",
  LET: "LET",

  EQ: "EQ",
  LT: "LT",
  GT: "GT",
  LSQ: "LSQ",
  RSQ: "RSQ",

  ASSIGN: "ASSIGN",

  // Binary operators
  PLUS: "PLUS",
  MINUS: "MINUS",
  MUL: "MUL",
  DIV: "DIV",

  IDENT: "IDENT",
  NUMBER: "NUMBER",

  NL: "NL",
  EOF: "EOF",

  LCURL: "{",
  RCURL: "}",

};

exports.TokenKind = TokenKind;
