// import { Token } from "./types";

import { Token, TokenKind } from "./types";


const keywords = ["let"];

export class Lexer {
  source: string;
  curPos: number;
  curChar: string;
  tokens: Array<Token>;

  constructor(source: string) {
    this.source = source;
    this.curPos = -1;
    this.curChar = "";
    this.nextChar();
    this.tokens = [];
  }

  lex() {
    while (this.peek() !== "\0") {
      const { curChar, curPos } = this;
      console.log({ curChar, curPos });
      this.getToken();
    }

    return this.tokens;
  }

  nextChar() {
    this.curPos += 1;
    if (this.curPos >= this.source.length) {
      // # EOF
      this.curChar = "\0";
    } else {
      this.curChar = this.source[this.curPos];
    }
  }

  getToken() {
    switch (this.curChar) {
      case " ":
        while (this.curChar === " ") {
          this.nextChar();
        }
        break;

      case "+":
        this.addToken(TokenKind.PLUS);
        break;

      case "=":
        this.addToken(TokenKind.ASSIGNMENT);
        break;

      case ">":
        this.addToken(TokenKind.GT);
        break;

      case "<":
        this.addToken(TokenKind.LT);
        break;

      case "(":
        this.addToken(TokenKind.LPAREN);
        break;

      default:
        this.nextChar();
    }
  }

  addToken(kind: TokenKind) {
    this.tokens.push({
      kind,
      value: this.curChar,
    });
    this.nextChar();
  }

  peek() {
    if (this.curPos + 1 >= this.source.length) {
      return "\0";
    }

    return this.source[this.curPos + 1];
  }
}
/*
function abort() {}

function skipWhitespace() {}

function skipComment() {}

function getToken() {}
*/
