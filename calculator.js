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

  if (input === "0" && display.value === "0") {
    return;
  }

  const operators = ["+", "-", "*", "/"];

  // if (isCalculationPerformed) {
  //   display.value = "";
  //   isCalculationPerformed = false;
  // }

  const lastChar = display.value.slice(-1);

  if (operators.includes(lastChar) && operators.includes(input)) {
    // Replace the last operator with the new input
    display.value = display.value.slice(0, -1) + input;
  } else if (display.value === "" && operators.includes(input)) {
    alert("Enter a number first!");
  } else {
    display.value += input;
  }
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

    if (operators == null || numbers.some(isNaN)) {
      console.error("Invalid expression");
      return NaN;
    }

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextNumber = numbers[i + 1];

      switch (operator) {
        case "+":
          result += nextNumber;
          break;
        case "-":
          result -= nextNumber;
          break;
        case "*":
          result *= nextNumber;
          break;
        case "/":
          if (nextNumber === 0) {
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
  li.textContent = expression;
  calcLog.append(li);
}

function calculate(expression = display.value, addToLog = true) {
  expression = expression.trim();
  const result = calculateExpr(expression);
  if (isNaN(result)) {
    alert("Invalid expression");
    return;
  }

  // Display only the result
  display.value = result;

  if (addToLog) {
    addListItemToLogList(expression + " = " + result);
  }
  // isCalculationPerformed = true;
}

calcLog.onclick = function (event) {
  let target = event.target;
  if (target.tagName === "LI") {
    const expression = target.textContent.split(" = ")[0];
    calculate(expression, false);
  }
};

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  const key = event.key;
  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    appendDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearDisplay();
  }
}
