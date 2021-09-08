#!/usr/bin/env node
const lexer_1 = require("./lexer");
const parser = require("./parser");
const repl = require("./repl");
const evaluator = require("./eval");
const compile = require("./compiler");

const { readFileSync } = require("fs");

function hasFlag(flag) {
  return process.argv.indexOf(flag) > -1;
}

function main() {
  // const tokens = lexer.init(input);
  const input = `
what => this + 2
`;
  let fileNameIndex = 1;
  let debugLexer = false;
  let debugParser = false;
  const fileExtention = ".bmax";
  const argvLength = process.argv.length;
  const fileName = process.argv[argvLength - 1];
  const hasFile = fileName.match(/\.bmax/);
  if (hasFlag("--lex")) {
    fileNameIndex++;
    debugLexer = true;
  }

  if (hasFlag("--parse")) {
    fileNameIndex++;
    debugParser = true;
  }

  const shouldCompile = hasFlag("-c");
  if (hasFile) {
    fileNameIndex = 2;

    const traceIndex = process.argv.indexOf("--trace-uncaught");

    if (traceIndex > 0) {
      fileNameIndex = traceIndex + 2;
    }

    const fileInput = readFileSync(fileName);
    const lex = new lexer_1.Lexer(fileInput.toString());
    const tokens = lex.lex();
    if (debugLexer) {
      console.log(tokens);
    }

    const ast = parser(tokens);
    if (debugParser) {
      console.log("done parsing", JSON.stringify(ast, null, 2));
    }
    if (shouldCompile) {
      const code = compile(ast);
      console.log(code);
    } else {
      evaluator(ast);
    }
  } else {
    repl();
  }
}
main();
