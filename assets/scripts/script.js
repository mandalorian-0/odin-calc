const buttons = document.querySelectorAll("button");
const inputField = document.querySelector("input");

const OPERATORS = ["+", "-", "*", "/", "%"];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SPECIALS = ["=", "AC", "⌫", "±", "M+", "MR", "MC"];
const SYMBOLS = ["."];

const ACCEPTED_INPUT = [...OPERATORS, ...NUMBERS, ...SYMBOLS];

let result = null;
let firstNum = null;
let secondNum = null;
let operator = null;
let afterOperation = false;

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b === 0 ? null : a / b),
  "%": (a, b) => (b === 0 ? null : a % b),
};

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  inputField.value = 0;
  inputField.focus();
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  const keyMap = {
    Escape: "AC",
    Backspace: "⌫",
    Delete: "AC",
    "*": "*",
    "/": "/",
    "+": "+",
    "-": "-",
    "%": "%",
    Enter: "=",
    "=": "=",
    // n: "±", // Alt + n for negative
    // m: "M+", // Alt + m for memory
    // r: "MR", // Alt + r for memory recall
    // c: "MC", // Alt + c for memory clear
  };

  const mappedKey = keyMap[event.key] || event.key;

  if (ACCEPTED_INPUT.includes(mappedKey) || SPECIALS.includes(mappedKey)) {
    proceed(mappedKey);
  }
});

const updateField = (field, newValue) => {
  if (typeof newValue === "number" && !isFinite(newValue)) {
    field.value = "Error";
    afterOperation = true;
  } else {
    field.value = newValue;
  }
};

const clearField = (field) => {
  field.value = "";
};

const formatNumber = (num) => {
  const maxDecimals = 10;
  return parseFloat(num.toFixed(maxDecimals));
};

const makeOperations = (operator, firstNum, secondNum = 0) => {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);

  if (isNaN(num1) || isNaN(num2)) {
    updateField(inputField, "Invalid Input");
    afterOperation = true;
    return false;
  }

  const operation = operations[operator];

  if (!operation) {
    console.error(`Unknown operator: ${operator}`);
    return false;
  }

  const result = operation(num1, num2);

  if (result === null) {
    const errorMsg =
      operator === "/" ? "Cannot divide by zero" : "Cannot modulo by zero";
    updateField(inputField, errorMsg);
    afterOperation = true;
    return false;
  }

  if (!isFinite(result)) {
    updateField(inputField, "Error");
    afterOperation = true;
    return false;
  }

  const formattedResult = parseFloat(result.toPrecision(12));
  updateField(inputField, formattedResult);
  afterOperation = true;
  return formattedResult;
};
// Memory functions
const handleMemory = (operation) => {
  switch (operation) {
    case "MC":
      memory = 0;
      break;
    case "MR":
      inputField.value = memory;
      break;
    case "M+":
      memory += parseFloat(inputField.value) || 0;
      break;
    case "M-":
      memory -= parseFloat(inputField.value) || 0;
      break;
  }
};

// Input handlers
const handleNumber = (key) => {
  if (afterOperation) {
    inputField.value = key;
    afterOperation = false;
    return;
  }

  // Prevent leading zeros
  if (inputField.value === "0" && key !== ".") {
    inputField.value = key;
  } else {
    inputField.value += key;
  }
};

const handleDecimal = () => {
  if (!inputField.value.includes(".")) {
    inputField.value = inputField.value === "" ? "0." : inputField.value + ".";
  }
};

const handleBackspace = () => {
  if (inputField.value.length > 1) {
    inputField.value = inputField.value.slice(0, -1);
  } else {
    inputField.value = "0";
  }
};

const handleClear = () => {
  inputField.value = "0";
  firstNum = null;
  secondNum = null;
  operator = null;
  afterOperation = false;
};

const handleEquals = () => {
  if (operator && firstNum !== null) {
    secondNum = inputField.value;
    const calcResult = makeOperations(operator, firstNum, secondNum);
    if (calcResult !== false) {
      firstNum = calcResult;
      operator = null;
    }
  }
};

const handleOperator = (key) => {
  if (operator !== null && !afterOperation) {
    // Chain operations: 5 + 3 + 2 should calculate intermediate results
    secondNum = inputField.value;
    const calcResult = makeOperations(operator, firstNum, secondNum);
    if (calcResult !== false) {
      firstNum = calcResult;
    }
  } else {
    firstNum = inputField.value;
  }

  operator = key;
  afterOperation = true;
};

const toggleSign = () => {
  if (inputField.value !== "0") {
    inputField.value = (parseFloat(inputField.value) * -1).toString();
  }
};

// Main proceed function
const proceed = (key) => {
  // Handle special cases first
  if (key === "=" || key === "Enter") {
    handleEquals();
    return;
  }

  if (key === "AC") {
    handleClear();
    return;
  }

  if (key === "⌫") {
    handleBackspace();
    return;
  }

  if (key === "±") {
    toggleSign();
    return;
  }

  if (["M+", "M-", "MR", "MC"].includes(key)) {
    handleMemory(key);
    return;
  }

  if (key === ".") {
    handleDecimal();
    return;
  }

  if (OPERATORS.includes(key)) {
    handleOperator(key);
    return;
  }

  // Handle numbers
  handleNumber(key);
};

// Button event listeners
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    let clickedButton = event.target.textContent;
    proceed(clickedButton);
  });
}

// Add some helpful constants
const CONSTANTS = {
  π: Math.PI,
  e: Math.E,
};

// Optional: Add keyboard shortcuts display
const displayShortcuts = () => {
  console.log(`
Calculator Keyboard Shortcuts:
- Numbers: 0-9
- Operators: +, -, *, /, %
- Equals: Enter or =
- Clear: Escape or Delete
- Backspace: Backspace
- Toggle Sign: Alt + n
- Memory: Alt + m (M+), Alt + r (MR), Alt + c (MC)
  `);
};

// displayShortcuts();
