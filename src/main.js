#!/usr/bin/env node
const lexer_1 = require("./lexer");
const parser = require("./parser");
const repl = require("./repl");
const evaluator = require('./eval');

const { readFileSync } = require("fs");

function main() {
  // const tokens = lexer.init(input);
  const input = `
what => this + 2
`;
  let fileName = "./test.bmax";
  if (process.argv.length > 2) {
    fileName = process.argv[2];
    const traceIndex = process.argv.indexOf("--trace-uncaught");
    if (traceIndex > 0) {
      fileName = process.argv[traceIndex +  2];
    }

    const fileInput = readFileSync(fileName);
    const lex = new lexer_1.Lexer(fileInput.toString());
    const tokens = lex.lex();
    console.log(tokens);

    const ast = parser(tokens);
    console.log("done parsing", JSON.stringify(ast, null, 2));
    console.log('evaluating the code::::')
    evaluator(ast);

  } else {
    repl();
    console.log("nothing to be done") ;
  }
}
main();
