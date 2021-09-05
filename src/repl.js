var readlineSync = require("readline-sync");
const lexer_1 = require("./lexer");
const parser = require("./parser");
const eval = require('./eval');

// Wait for user's response.

console.log("BLAN Repl!!")

function repl(str) {

  const lex = new lexer_1.Lexer(str);
  const tokens = lex.lex();
  console.log(tokens);
  try {
    // console.log("dadsfads");
    const ast = parser(tokens);
    return ast;
  } catch (e) {
    console.log("\x1b[33m%s\x1b[0m", "Parsing error:", e);
  }
  // const ast = {};
  // .map(({kind, value})  => kind + " : " + value);
}

function runRepl() {
  while (true) {
    try {
      var q = readlineSync.question("> ");
      const ast = repl(q);
      // console.log(JSON.stringify(ast, null, 2));
      eval(ast);
    } catch (e) {
      console.log("Error: ", e);
    }
  }
}

module.exports = runRepl;
