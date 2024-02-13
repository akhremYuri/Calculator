function logMessage(message) {
  console.log(message);
}

let addFunc = (num1, num2) => num1 + num2;
let subFunc = (num1, num2) => num1 - num2;
let mulFunc = (num1, num2) => num1 * num2;
let divFunc = (num1, num2) => num1 / num2;

let operatorArr = ["+", "-", "*", "/"];
let functionArr = [addFunc, subFunc, mulFunc, divFunc];

function operate(operator, num1, num2) {
  operator = operator.trim();
  let index = operatorArr.indexOf(operator);
  if (index === -1) {
    logMessage(`ERROR: The operator ${operator} is not found.`);
    return null;
  }
  return functionArr[index](num1, num2);
}

function testMathOperations(a, b) {
  console.log(`Element1 = ${a} Element2 = ${b}`);
  console.log(`${a} + ${b} = ${addFunc(a, b)}`);
  console.log(`${a} - ${b} = ${substractFunc(a, b)}`);
  console.log(`${a} * ${b} = ${multiplyFunc(a, b)}`);
  console.log(`${a} / ${b} = ${divideFunc(a, b)}`);
}

// testMathOperations(9, 3);

function testOperateFunc(a, b) {
  console.log(`${a} + ${b} = ${operate("+", a, b)}`);
  console.log(`${a} - ${b} = ${operate("-", a, b)}`);
  console.log(`${a} * ${b} = ${operate("*", a, b)}`);
  console.log(`${a} / ${b} = ${operate("/", a, b)}`);
}

testOperateFunc(9, 3);
