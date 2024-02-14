const display = document.querySelector("#display");
const calcLog = document.querySelector("#calcLog");

let isCalculationPerformed = false;

function appendDisplay(input) {
  if (input === "." && display.value.includes(".")) {
    return;
  }

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

function backspaceDisplay() {
  display.value = display.value.slice(0, -1);
}

function calculateExpr(expression) {
  //const expression = display.value.trim();

  const operators = expression.match(/[\+\-\*\/]/g);
  const numbers = expression.split(/[\+\-\*\/]/g).map(parseFloat);

  if (operators.length !== numbers.length - 1) {
    // Handle invalid expression
    console.error("Invalid expression");
    return NaN;
  }

  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];

    const nextNumber = numbers[i + 1];
    if (operator === "+") {
      result = result + nextNumber;
    } else if (operator === "-") {
      result = result - nextNumber;
    } else if (operator === "*") {
      result = result * nextNumber;
    } else if (operator === "/") {

      if (nextNumber === 0) {
        // Handle division by zero
        console.error("Division by zero");
        return NaN;
      }
      
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

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  const key = event.key;
  console.log(key);

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    appendDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  }
}
