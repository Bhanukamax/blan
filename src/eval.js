var scope = {};
const j = JSON.stringify;
scope.print = console.log;
function evaluator(ast) {
  ast.body.forEach((statement) => {
    eval(statement);
  });
}

function evalFunctionCall(node) {
  if (scope.defs && scope.defs[node.name]) {
  }

  if (scope.hasOwnProperty(node.name)) {
    scope[node.name].call(
      null,
      ...node.arguments.map((item) => evalExpression(item))
    );
  }
}

function evalExpression(node) {
  debugger;
  if (node.type === "NumberLiteral") {
    return node.value;
  }

  if (node.type === "Identifier") {
    if (scope.hasOwnProperty(node.value)) {
      return evalExpression(scope[node.value]);
    }
  }

  if (node.type === "BinaryExpression") {
    if (node.operator === "+") {
      return evalExpression(node.left) + evalExpression(node.right);
    }
  }
}

function evalFunctionDeclaration(node) {
  const defs = "defs";
  if (!scope[defs]) {
    scope[defs] = {};
  }
  const defName = node.name;
  scope[defs][defName] = {};
  const def = scope[defs][defName];
  def.parms = node.params.map((param) => param.value);
  def.body = node.expression;
  console.log(j(scope, null, 2));
}

function evalLetStatement(node) {
  scope[node.identifier.value] = node.expression;
}

function eval(node) {
  switch (node.type) {
    case "FunctionCall":
      evalFunctionCall(node);
      break;

    case "LetStatement":
      evalLetStatement(node);
      break;

    case "FunctionDeclaration":
      evalFunctionDeclaration(node);
      break;

    case "FunctionCall":
      evalFunctionCall(node);
      break;
  }
}

module.exports = evaluator;
