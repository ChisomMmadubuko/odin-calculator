let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  // store all components on HTML in our JS
  const clearBtn = document.querySelector(".btn.clear");
  const equalBtn = document.querySelector(".btn.equal");
  const decimalBtn = document.querySelector(".btn.decimal");
  
  const numbers = document.querySelectorAll(".btn.number");
  const operators = document.querySelectorAll(".btn.operator");
  
  const previousScreen = document.querySelector(".previous");
  const currentScreen = document.querySelector(".current");
  
  numbers.forEach((number) => {
    number.addEventListener("click", function(e) {
      handleNumber(e.target.textContent);
    });
  });
  
  operators.forEach((op) => {
    op.addEventListener("click", function(e) {
      handleOperator(e.target.textContent);
    });
  });
  
  clearBtn.addEventListener("click", function() {
    previousValue = "";
    currentValue = "";
    operator = "";
    updateDisplay();
  });
  
  equalBtn.addEventListener("click", function() {
    if(currentValue != "" && previousValue != ""){
      calculate();
      updateDisplay();
    }
  });
  
  decimalBtn.addEventListener("click", function() {
    addDecimal();
  });
});

function handleNumber(num) {
  if(currentValue.length <= 5){
    currentValue += num;
    updateDisplay();
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
  updateDisplay();
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  
  if(operator === "+"){
    previousValue += currentValue;
  } else if(operator === "-"){
    previousValue -= currentValue;
  } else if(operator === "*"){
    previousValue *= currentValue;
  } else if(operator === "/"){
    if(currentValue !== 0) {
      previousValue /= currentValue;
    } else {
      alert("Cannot divide by zero");
      return;
    }
  }
  
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function updateDisplay() {
  document.querySelector(".previous").textContent = previousValue + " " + operator;
  document.querySelector(".current").textContent = currentValue;
}

function addDecimal() {
  if(!currentValue.includes(".")){
    currentValue += '.';
    updateDisplay();
  }
}