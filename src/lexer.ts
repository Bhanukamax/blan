// import { Token } from "./types";

export class Lexer {
  source: string;
  curPos: number;
  curChar: string;

  constructor(source: string) {
    this.source = source;
    this.curPos = -1;
    this.curChar = "";
    this.movePos();
  }

  lex() {
    const tokens = [];
    while (this.peek() !== "\0") {
      const { curChar, curPos } = this;
      console.log({ curChar, curPos });
      tokens.push({ curChar, curPos });
      this.movePos();
    }
    return tokens;
  }

  movePos() {
    this.curPos += 1;
    if (this.curPos >= this.source.length) {
      // # EOF
      this.curChar = "\0";
    } else {
      this.curChar = this.source[this.curPos];
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
