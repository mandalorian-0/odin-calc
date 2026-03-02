const buttons = document.querySelectorAll("button")
const inputField = document.querySelector("input")

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    inputField.value = 0
})

const OPERATORS = ["+", "-", "*", "/", "%"]

let result = null
let first_num = null
let second_num = null
let operator = null
let afterOperation = false
let afterClear = false

const add = (first_num, second_num) => {
    return first_num + second_num
}

const sub = (first_num, second_num) => {
    return first_num - second_num
}

const mult = (first_num, second_num) => {
    return first_num * second_num
}

const mod_div = (sign, first_num, second_num) => {
    let result = 0

    if(second_num === 0) {
        sign === "/" 
        ? updateField(inputField, "Division by Zero Error")
        : updateField(inputField, "Modulo by Zero Error")
        return false
    }
    else {
        result = sign === "/" 
        ? result = first_num / second_num
        : result = first_num % second_num
        return result
    }

}


const updateField = (field, newValue) => {
    field.value = newValue 
}

const clearField = (field) => {
    field.value = ""
}

const makeOperations = (operator, first_num, second_num = 0) => {

    switch (operator) {
        case "+":
            result = add(parseInt(first_num), parseInt(second_num))
            updateField(inputField, result)
            break;
        case "-":
            result = sub(parseInt(first_num), parseInt(second_num))
            updateField(inputField, result)
            break;
        case "*":
            result = mult(parseInt(first_num), parseInt(second_num))
            updateField(inputField, result)
            break;
        case "/":
        case "%":
            result = mod_div(operator, parseInt(first_num), parseInt(second_num))
            if (result !== false) updateField(inputField, result)
            break;
    
        default:
            break;
    }
}

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        e.preventDefault()

        let clickedButton = e.target.textContent

        if (clickedButton === "=") {
            second_num = inputField.value
            makeOperations(operator, first_num, second_num)
            afterOperation = true
        }
        else if(clickedButton === "AC") {
            clearField(inputField)
            inputField.value = 0
            afterClear = true
        }
        else if (OPERATORS.includes(clickedButton)) {
            operator = clickedButton

            first_num = inputField.value
            clearField(inputField)
        }
        else {
            /* If next click button is not an operator after an operation
             have been made then we clear out the result and start fresh
             */
            if (!OPERATORS.includes(clickedButton) && afterOperation){
                inputField.value = clickedButton
                afterOperation = false
            }
            else {
                if (afterClear) {
                    inputField.value = clickedButton
                    afterClear = false;
                }
                else {
                    inputField.value += clickedButton
                }
            }
        }
    })
}
