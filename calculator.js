const display = document.querySelector("#display");
const calcLog = document.querySelector("#calcLog");

// let isCalculationPerformed = false;

function appendDisplay(input) {
  if (input === "." && display.value.includes(".")) {
    return;
  }

  if (display.value === "" && input.match(/[.\+\-\*\/]/g)) {
    alert("Enter the number first!");
    return;
  }

  // if (isCalculationPerformed) {
  //   display.value = "";
  //   isCalculationPerformed = false;
  // }
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
  function calculationMethod1() {
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
      console.log(operator);

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
    return result;
  }

  function calculationMethod2() {
    function operate(operator, num1, num2) {
      if (operator === "+") {
        return num1 + num2;
      } else if (operator === "-") {
        return num1 - num2;
      } else if (operator === "*") {
        return num1 * num2;
      } else if (operator === "/") {
        if (num2 === 0) {
          // Handle division by zero
          console.error("Division by zero");
          return NaN;
        }
        return num1 / num2;
      } else {
        console.error('ERROR in "operate": unknown operator!');
        return;
      }
    }

    function isHighPriority(operator) {
      if (operator.match(/[\*\/]/g)) {
        return 1;
      }
      return 0;
    }

    const operators = expression.match(/[\+\-\*\/]/g);
    const numbers = expression.split(/[\+\-\*\/]/g).map(parseFloat);
    if (numbers.length - operators.length != 1) {
      console.error(`ERROR in "calculationMethod2": Invalid expression!`);
      return NaN;
    }

    let result = numbers[0];
    let bufferValue, bufferOperator;
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      if (isHighPriority(operator)) {
        result = operate(operator, result, numbers[i + 1]);
      } else {
        if (bufferValue) {
          result = operate(bufferOperator, bufferValue, result);
        }
        bufferValue = result;
        bufferOperator = operator;
        result = numbers[i + 1];
      }
    }
    if (bufferValue) {
      result = operate(bufferOperator, bufferValue, result);
    }
    return result;
  }

  // return calculationMethod1();
  return calculationMethod2();
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
  // isCalculationPerformed = true;
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
