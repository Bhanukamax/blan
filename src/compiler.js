const globalScope = {
  print: `function print(...args) { console.log(...args) }`,
};
const defs = { print: "print" };
function compiler(ast) {
  const astCompiled = ast.body.reduce(
    (acc, statement) => acc + compile(statement),
    ""
  );
  debugger;
  const scopeCompiled = Object.keys(globalScope).map(item => globalScope[item]).join("\n")
  return scopeCompiled + astCompiled;
}

function panik(msg) {
  throw msg;
}

function compileExpression(node) {
  if (node.type === "NumberLiteral") {
    return node.value;
  }
}

function compileLetStatement(node) {
  return (
    `var ${node.identifier.value} = ` +
    compileExpression(node.expression) +
    ";\n"
  );
}

function compileFunctionCall(node) {
  const def = globalScope[node.name];
  if (!def) {
    panik(`Undefined function ${node.name}`);
  }

  const j = JSON.stringify;

  const args = node.arguments.reduce(
    (acc, arg, idx, arr) =>
      (acc += arg.value) + (idx === arr.length - 1 ? "" : ", "),
    ""
  );
  const func = `${node.name} (${args})`;

  return func;
}

function compilerFunctionDeclaration(node) {
  const args = node.params.reduce(
    (acc, arg, idx, arr) =>
      (acc += arg.value) + (idx === arr.length - 1 ? "" : ", "),
    ""
  );
  globalScope[node.name] = `function ${
    node.name
  } ( ${args} ) {return ${compileExpression(node.expression)}}`;
}

function compile(node) {
  switch (node.type) {
    // case "FunctionCall":
    //   return evalFunctionCall(node);

    case "LetStatement":
      return compileLetStatement(node);

    case "FunctionDeclaration":
      return compilerFunctionDeclaration(node);

    case "FunctionCall":
      return compileFunctionCall(node);
    default:
      return "";
  }
}

module.exports = compiler;
