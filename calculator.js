const display = document.querySelector("#display");
const calcLog = document.querySelector("#calcLog");

let isCalculationPerformed = false;

function appendDisplay(input) {
  if (isCalculationPerformed) {
    display.value = "";
    isCalculationPerformed = false;
  }
  display.value = display.value + input;
}

function clearDisplay() {
  display.value = "";
}

function percentageDisplay() {
  display.value = display.value / 100;
}

function calculateExpr(expression) {
  //const expression = display.value.trim();
  const operators = expression.match(/[\+\-\*\/]/g);
  const numbers = expression.split(/[\+\-\*\/]/g).map(parseFloat);
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    console.log(operator);

    const nextNumber = numbers[i + 1];
    if (operator === "+") {
      result = result + nextNumber;
    } else if (operator === "-") {
      result = result - nextNumber;
    } else if (operator === "*") {
      result = result * nextNumber;
    } else if (operator === "/") {
      result = result / nextNumber;
    }
  }
  //display.value = result;
  //isCalculationPerformed = true;
  return result;
}

function addListItemToLogList(expression) {
  const li = document.createElement("li");
  li.className = "logItem";
  li.innerHTML = expression;
  calcLog.append(li);
}

function calculate(expression = display.value, addToLog = true) {
  expression = expression.trim();
  display.value = calculateExpr(expression);
  if (addToLog) addListItemToLogList(expression);
  isCalculationPerformed = true;
}

calcLog.onclick = function (event) {
  let target = event.target;
  if (target.tagName === "LI") calculate(target.innerHTML, false);
};
