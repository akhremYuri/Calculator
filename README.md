
**Calculator Using Vanilla JavaScript**   https://akhremyuri.github.io/Calculator/

**Overview:**
This is a simple calculator that was designed using HTML, CSS and Vanilla JavaScript which allows individual to perform simple calculations.

**Functions:**


**appendDisplay():** This function is responsible for appending characters to the display value. It simply concatenates the input parameter to the current display value.  Also the if statement adds a variable "isCalculationPerformed" to track whether a calculation has been performed. When 'appendDisplay" is called, it checks if a calculation has been performed("isCalculationPerformed" is "true"). If so, it clears the display and set the "iscalculationPerformed" back to "false". this ensures that when you start typing a new number after a calculation, the display is cleared.

**clearDisplay():** this function clears the display value by setting it to an empty string.

**percentageDisplay():** this function converts the current value in the display by dividing it by 100 and updating the display with the result.

**calculate():** it starts with getting the current expression from the display. Then use the regular expressions to split the expression into an array of operators and an array of numbers. Next, it initializes a variable "result" with the first number from the array. it then iterated through the array of operators. For each operator, it fetches the next number from the array of numbers and performs the corresponding operation("+", "-", "*", "/") with the current result. Finally, it updates the display value with the calculated result.



