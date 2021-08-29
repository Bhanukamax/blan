import { Lexer } from "./lexer";

function main(): void {
  const input = "LET foobar = 123";

  // const tokens = lexer.init(input);
  const lex = new Lexer(input);
  const tokens = lex.lex();

  console.log(tokens);
}

main();
