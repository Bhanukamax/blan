var readlineSync = require("readline-sync");
const lexer_1 = require("./lexer");
const parser = require("./parser");
const eval = require("./eval");

// Wait for user's response.

console.log("BLAN Repl!!");
function hasFlag(flag) {
  return process.argv.indexOf(flag) > -1;
}

function repl(str) {
  let debugLexer = false;
  let debugParser = false;
  if (hasFlag("--lex")) {
    debugLexer = true;
  }

  if (hasFlag("--parse")) {
    debugParser = true;
  }
  const lex = new lexer_1.Lexer(str);
  const tokens = lex.lex();
  if (debugLexer) {
    console.log(tokens);
  }
  try {
    const ast = parser(tokens);
    if (debugParser) {
      console.log(JSON.stringify(ast, null, 2));
    }
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
      eval(ast);
    } catch (e) {
      console.log("Error: ", e);
    }
  }
}

module.exports = runRepl;
