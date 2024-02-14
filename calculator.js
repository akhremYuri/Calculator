const display = document.querySelector('#display');

let isCalculationPerformed = false;

function appendDisplay(input){
  if (input === '.' && display.value.includes('.')) {
    return;
  }

  if(isCalculationPerformed){
    display.value = '';
    isCalculationPerformed = false;
  }
  display.value = display.value + input;
}

function clearDisplay(){
  display.value = '';
}

function percentageDisplay() {
  display.value = display.value / 100;

}

function backspaceDisplay() {
  display.value = display.value.slice(0, -1)
}

function calculate(){

  const expression = display.value.trim();
  const operators = expression.match(/[\+\-\*\/]/g);
  const numbers = expression.split(/[\+\-\*\/]/g).map(parseFloat);
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++){
    const operator = operators[i];

    const nextNumber = numbers[i + 1];
    if (operator === '+'){
      result = result + nextNumber;
    }
    else if(operator === '-'){
      result = result - nextNumber;
    }
    else if(operator === '*'){
      result = result * nextNumber;
    }
    else if(operator === '/'){
      result = result / nextNumber;
    }
  }
  display.value = result;
  isCalculationPerformed = true;




};

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  const key = event.key;
  console.log(key);

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Escape') {
    clearDisplay();
  }
}23
