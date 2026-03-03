const buttons = document.querySelectorAll("button");
const inputField = document.querySelector("input");

const OPERATORS = ["+", "-", "*", "/", "%"];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SYMBOLS = ["."];
const ACCEPTED_INPUT = [...OPERATORS, ...NUMBERS, ...SYMBOLS];

let result = null;
let first_num = null;
let second_num = null;
let operator = null;
let afterOperation = false;
let afterClear = false;
let justStarted = true;

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  inputField.value = 0;
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  inputField.focus();
  let keyPressed = event.key;

  if (ACCEPTED_INPUT.includes(keyPressed) || keyPressed === "Enter") {
    proceed(keyPressed);
  }
});

const add = (first_num, second_num) => {
  return first_num + second_num;
};

const sub = (first_num, second_num) => {
  return first_num - second_num;
};

const mult = (first_num, second_num) => {
  return first_num * second_num;
};

const mod_div = (sign, first_num, second_num) => {
  let result = 0;

  if (second_num === 0) {
    sign === "/"
      ? updateField(inputField, "Division by Zero Error")
      : updateField(inputField, "Modulo by Zero Error");
    return false;
  } else {
    result =
      sign === "/"
        ? (result = first_num / second_num)
        : (result = first_num % second_num);
    return result;
  }
};

const updateField = (field, newValue) => {
  field.value = newValue;
};

const clearField = (field) => {
  field.value = "";
};

const makeOperations = (operator, first_num, second_num = 0) => {
  switch (operator) {
    case "+":
      result = add(parseFloat(first_num), parseFloat(second_num));
      updateField(inputField, result);
      break;
    case "-":
      result = sub(parseFloat(first_num), parseFloat(second_num));
      updateField(inputField, result);
      break;
    case "*":
      result = mult(parseFloat(first_num), parseFloat(second_num));
      updateField(inputField, result);
      break;
    case "/":
    case "%":
      result = mod_div(operator, parseFloat(first_num), parseFloat(second_num));
      if (result !== false) updateField(inputField, result);
      break;

    default:
      break;
  }
};

const proceed = (key) => {
  if (key === "=" || key === "Enter") {
    second_num = inputField.value;
    makeOperations(operator, first_num, second_num);
    afterOperation = true;
  } else if (key === ".") {
    if (!inputField.value.includes(key)) inputField.value += key;
  } else if (key === "AC") {
    clearField(inputField);
    inputField.value = 0;
    afterClear = true;
  } else if (OPERATORS.includes(key)) {
    operator = key;

    first_num = inputField.value;
    clearField(inputField);
  } else {
    /* If next click button is not an operator after an operation
     have been made then we clear out the result and start fresh
     */
    if (!OPERATORS.includes(key) && afterOperation) {
      inputField.value = key;
      afterOperation = false;
    } else {
      if (afterClear) {
        afterClear = false;

        inputField.value += key;
      } else {
        inputField.value += key;
      }
    }
  }
};

for (let button of buttons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    let clickedButton = event.target.textContent;
    proceed(clickedButton);
  });
}
