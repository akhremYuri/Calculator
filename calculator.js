const display = document.querySelector('#display');

let isCalculationPerformed = false;

function appendDisplay(input){
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

function calculate(){


  const expression = display.value.trim();
  const operators = expression.match(/[\+\-\*\/]/g);
  const numbers = expression.split(/[\+\-\*\/]/g).map(parseFloat);
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++){
    const operator = operators[i];
    console.log(operator);

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
