const { TokenKind } = require("./token-kinds");
const keywords = ["let"];

class Lexer {
  constructor(source) {
    this.source = source + " \0";
    this.curPos = -1;
    this.curLine = 1;
    this.curCol = 1;
    this.curChar = "";
    this.nextChar();
    this.tokens = [];
  }

  lex() {
    console.log("source", this.source);
    while (this.peek() !== "\0") {
      const { curChar, curPos } = this;
      this.getToken();
      this.nextChar();
    }
    this.nextChar();
    this.addToken(TokenKind.EOF);

    return this.tokens;
  }

  nextChar() {
    this.curPos += 1;
    this.curCol += 1;
    if (this.curPos >= this.source.length) {
      // # EOF
      this.curChar = "\0";
    } else {
      this.curChar = this.source[this.curPos];
    }
  }

  getToken() {
    if (this.curChar === "[") {
      this.addToken(TokenKind.LSQ);
      return;
    }

    if (this.curChar === "]") {
      this.addToken(TokenKind.RSQ);
      return;
    }

    if (this.curChar === "(") {
      this.addToken(TokenKind.LPAREN);
      return;
    }

    if (this.curChar === ")") {
      this.addToken(TokenKind.RPAREN);
      return;
    }

    if (this.curChar === "+") {
      this.addToken(TokenKind.PLUS);
      return;
    }

    if (this.curChar === "-") {
      this.addToken(TokenKind.MINUS);
      return;
    }

    if (this.curChar === "*") {
      this.addToken(TokenKind.MUL);
      return;
    }

    if (this.curChar === "/") {
      this.addToken(TokenKind.DIV);
      return;
    }

    // if (this.curChar === ":") {
    //   if (this.peek() === "=") {
    //     let word = this.curChar;
    //     this.nextChar();
    //     word += this.curChar;
    //     this.addToken(TokenKind.ASSIGN, word);
    //   }
    //   return;
    // }

    if (this.curChar === "=") {
      if (this.peek() === ">") {
        this.nextChar();
        this.addToken(TokenKind.ARROW, "=>");
        return;
      }
      this.addToken(TokenKind.ASSIGN);
      return;
    }

    if (this.curChar === ">") {
      this.addToken(TokenKind.GT);
      return;
    }

    if (this.curChar === "<") {
      this.addToken(TokenKind.LT);
      return;
    }

    if (this.curChar === "(") {
      this.addToken(TokenKind.LPAREN);
      return;
    }

    // Identifiers
    if (this.curChar.match(/[a-zA-Z]/)) {
      let word = this.curChar;
      while (this.peek().match(/[a-zA-Z-]/)) {
        this.nextChar();
        word += this.curChar;
      }
      if (word === "let") {
        this.addToken(TokenKind.LET, word);
        return;
      }
      this.addToken(TokenKind.IDENT, word);
      return;
    }

    if (this.curChar.match(/[0-9]/)) {
      let word = this.curChar;
      // this.nextChar();
      while (this.peek().match(/[0-9]/)) {
        this.nextChar();
        word += this.curChar;
      }

      this.addToken(TokenKind.NUMBER, word);
      return;
    }

    if (this.curChar === " ") {
      return;
    }

    if (this.curChar === "\n") {
      this.addToken(TokenKind.NL, this.curChar);
      this.curLine++;
      this.curCol = 1;
      return;
    }

    if (this.curChar === "\0") {
      this.addToken(TokenKind.EOF);
      return;
    }

    console.log(
      `Unknown token at line: ${this.curLine} col: ${this.curPos + 1}`
    );
    throw new Error(`Unexpected character: '${this.curChar}'`);
  }

  addToken(kind, value = "") {
    this.tokens.push({
      kind,
      value: value || this.curChar,
      line: this.curLine,
      col: this.curCol,
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

exports.Lexer = Lexer;
