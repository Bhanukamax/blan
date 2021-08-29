export enum TokenKind {
  LPAREN,
  RPAREN,
  KEYWORD,
  EQ,
  LT,
  GT,
  ASSIGNMENT,
}
export type Token = {
  kind: TokenKind;
  value: string;
};
