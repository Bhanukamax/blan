export enum TokenKind {
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  KEYWORD = "KEYWORD",
  EQ = "EQ",
  LT = "LT",
  GT = "GT",
  ASSIGNMENT = "ASSIGNMENT",
  PLUS = "PLUS",
  MINUS = "MINUS",
}

export type Token = {
  kind: TokenKind;
  value: string;
};
