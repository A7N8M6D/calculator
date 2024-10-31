// Initialize variables
let operator = null;
let operandOne = null;
let operandTwo = null;
let result = null;

// Get DOM elements
const operandOneOutput = document.getElementById("Operand-One");
const operandTwoOutput = document.getElementById("Operand-Two");
const operatorOutput = document.getElementById("Operator");
const screenOutput = document.getElementById("Screen");

// Calculate function to perform the operation
function calculate() {
  switch (operator) {
    case "+":
      result = operandOne + operandTwo;
      break;
    case "-":
      result = operandOne - operandTwo;
      break;
    case "*":
      result = operandOne * operandTwo;
      break;
    case "/":
      result = operandTwo !== 0 ? operandOne / operandTwo : "Error";
      break;
    default:
      return;
  }

  // Display result and reset variables
  updateScreen(result);
  operandOne = result;
  operandTwo = null;
  operator = null;
  updateDisplay();
}

// Update screen and display
function updateScreen(value) {
  screenOutput.innerText = value;
}

function updateDisplay() {
  operandOneOutput.innerText = operandOne || "";
  operandTwoOutput.innerText = operandTwo || "";
  operatorOutput.innerText = operator || "";
}

// Handle button value input
function getValue(element) {
  const value = element.innerText;

  if (value === "C") {
    resetCalculator();
    return;
  }

  if (/^-?\d*\.?\d+$/.test(value)) {
    // Check if value is a number
    if (!operator) {
      operandOne = (operandOne || 0) * 10 + parseInt(value);
      updateScreen(operandOne);
    } else {
      operandTwo = (operandTwo || 0) * 10 + parseInt(value);
      updateScreen(operandTwo);
    }
    updateDisplay();
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (operandOne !== null) {
      operator = value;
      updateDisplay();
      updateScreen("");
    }
  } else if (value === "=") {
    if (operandOne !== null && operator && operandTwo !== null) {
      calculate();
    } else {
      alert("Please complete the expression");
    }
  }
}

// Reset calculator function
function resetCalculator() {
  operandOne = null;
  operandTwo = null;
  operator = null;
  result = null;
  updateScreen("");
  updateDisplay();
}
