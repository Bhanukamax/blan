// import { Token } from "./types";

import { Token } from "./types";

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
  }

  lex() {
    const tokens = [];
    while (this.peek() !== "\0") {
      const { curChar, curPos } = this;
      console.log({ curChar, curPos });
      this.getToken();
    }
    return tokens;
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
        this.nextChar();
        break;
      default:
        this.nextChar();
    }
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
