import { Lexer } from "./lexer";

function main(): void {

  // const tokens = lexer.init(input);
  const input = "let +  foobar = 222 + 123";
  const lex = new Lexer(input);
  const tokens = lex.lex();

  console.log({ tokens });
}

main();
