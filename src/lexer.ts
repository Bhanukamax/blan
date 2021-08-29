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
    if (this.curChar === " ") {
      while (this.curChar === " ") {
        this.nextChar();
      }
      return;
    }

    if (this.curChar === "+") {
      this.addToken(TokenKind.PLUS);
      this.nextChar();
      return;
    }

    if (this.curChar === "=") {
      this.addToken(TokenKind.ASSIGNMENT);
      this.nextChar();
      return;
    }

    if (this.curChar === ">") {
      this.addToken(TokenKind.GT);
      this.nextChar();
      return;
    }

    if (this.curChar === "<") {
      this.addToken(TokenKind.LT);
      this.nextChar();
      return;
    }

    if (this.curChar === "(") {
      this.addToken(TokenKind.LPAREN);
      this.nextChar();
      return;
    }

    // Identifiers
    if (this.curChar.match(/[a-zA-Z]/)) {
      let word = this.curChar;
      this.nextChar();
      while (this.curChar.match(/[a-zA-Z]/)) {
        word += this.curChar;
        this.nextChar();
      }
      this.addToken(TokenKind.IDENTIFIER, word);
    }

    if (this.curChar.match(/[0-9]/)) {
      let word = this.curChar;
      this.nextChar();

      while (this.curChar.match(/[0-9]/)) {
        word += this.curChar;
        this.nextChar();
      }

      this.addToken(TokenKind.INTEGER, word);
    }

    this.nextChar();
    return;
  }

  addToken(kind: TokenKind, value: string = "") {
    this.tokens.push({
      kind,
      value: value || this.curChar,
    });
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
