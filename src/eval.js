var scope = {};
const j = JSON.stringify
scope.print = console.log;
function evaluator(ast) {
  ast.body.forEach((statement) => {
    eval(statement);
  });
}

function evalFunctionCall(node) {
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
}

function evalLetStatement(node) {
  debugger;
  scope[node.identifier.value] = node.expression;
}

function eval(node) {
  if (node.type === "FunctionCall") {
    evalFunctionCall(node);
  }
  if (node.type === "LetStatement") {
    evalLetStatement(node);
  }
}

module.exports = evaluator;
