var scope = {};
scope.print = console.log;
function evaluator(ast) {
  ast.body.forEach((statement) => {
    eval(statement);
  });
}

function evalFunctionCall(node) {
  if (scope.hasOwnProperty(node.name)) {
      scope[node.name].call(null, ...node.arguments.map(item => item.value));
  }
}

function eval(node) {
  if (node.type === "FunctionCall") {
    evalFunctionCall(node);
  }
}

module.exports = evaluator;
