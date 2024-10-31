// Initialize variables
let operator = null;
let operandOne = null;
let operandTwo = null;
let result = null;
let arr = [];
let Result = document.getElementById("Results");

// Get DOM elements
const operandOneOutput = document.getElementById("Operand-One");
const operandTwoOutput = document.getElementById("Operand-Two");
const operatorOutput = document.getElementById("Operator");
const screenOutput = document.getElementById("Screen");

// Calculate function to perform the operation
function calculate() {
  console.log("-------------------");

  switch (operator) {
    case "+":
      result = operandOne + operandTwo;
      break;
    case "-":
      result = operandOne - operandTwo;
      break;
    case "×":
      result = operandOne * operandTwo;
      break;
    case "÷":
      result = operandTwo !== 0 ? operandOne / operandTwo : "Error";
      break;
    default:
      return;
  }
  calculationHistory();

  // Display result and reset variables
  console.log("Result", result);
  //   calculate();
  updateScreen(result);
  operandOne = result;
  operandTwo = null;
  operator = null;
  updateDisplay();

  console.log("res --- ", arr);
}

// Update screen and display
function updateScreen(value) {
  console.log("Value", value);
  screenOutput.innerText = value;
}

function updateDisplay() {
  operandOneOutput.innerText = operandOne || "";
  operandTwoOutput.innerText = operandTwo || "";
  operatorOutput.innerText = operator || "";
}

// See all Result
function displayResults() {
  console.log("Results---");
  let resultFromSessionStorage=JSON.parse(sessionStorage.getItem("Results"))
  
   console.log("Result form the session storage",resultFromSessionStorage)
  // Assuming Result is the container element and arr is defined
  Result.innerHTML = ""; // Clear any existing content
if(Array.isArray(resultFromSessionStorage))
{
  for (let i = resultFromSessionStorage.length - 1; i >= 0; i--) {
    let a = resultFromSessionStorage[i];
    // Create a new paragraph element
    const paragraph = document.createElement("p");
    const resultVariable = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.textContent = `${a.operandOne} ${a.operator} ${a.operandTwo} =`;
    resultVariable.textContent = a.result;
    resultVariable.style.color = "white";
    resultVariable.style.fontSize = "16px";
    resultVariable.style.textAlign = "end";
    resultVariable.style.paddingRight = "10px";
    paragraph.appendChild(resultVariable);
    paragraph.style.color = "white";
    paragraph.style.fontSize = "16px";
    paragraph.style.paddingRight = "10px";
    paragraph.style.textAlign = "end";
    // Append the paragraph to the Result container
    Result.appendChild(paragraph);
  }
}
}
// clear Storage
function clearStorage()
{
    let resultStorage=JSON.parse(sessionStorage.getItem("Results"))
    if(Array.isArray(resultStorage))
    {
        sessionStorage.removeItem("Results")
        alert("Your History is Reset")
        location.reload();
        return
    }
    else{
        alert("Already Empty History")
    }
}
// Store in session storage
function storeResults(arr){
    // sessionStorage.removeItem("Results");
    let checkData = JSON.parse(sessionStorage.getItem("Results") || "[]");
if(Array.isArray(checkData))
{
   console.log("have data ")
   checkData=[...arr,...checkData]
}
else{
    console.log("no data in session storage")
    checkData=arr
}
sessionStorage.setItem("Results",JSON.stringify(checkData))
}
// History of calculation function
function calculationHistory() {
  console.log(operandOne, operator, operandTwo, result);
  arr.push({
      operandOne: operandOne,
      operandTwo: operandTwo,
      operator: operator,
      result: result,
    });
    const paragraph = document.createElement("p");
    const resultVariable = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.textContent = `${operandOne} ${operator} ${operandTwo} =`;
    resultVariable.textContent = result;
    resultVariable.style.color = "white";
    resultVariable.style.fontSize = "16px";
    resultVariable.style.textAlign = "end";
    resultVariable.style.paddingRight = "10px";
    paragraph.appendChild(resultVariable);
    paragraph.style.color = "white";
    paragraph.style.fontSize = "16px";
    paragraph.style.paddingRight = "10px";
    paragraph.style.textAlign = "end";
    // Append the paragraph to the Result container
    Result.appendChild(paragraph);
    storeResults(arr)
    
  console.log("History of results", arr);
  
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
  } else if (["+", "-", "×", "÷"].includes(value)) {
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

document.addEventListener("DOMContentLoaded", displayResults);
