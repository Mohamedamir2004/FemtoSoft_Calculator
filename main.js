// Select elements
const display = document.getElementById("input_box"); // Display for the calculator
const numberButtons = document.querySelectorAll(".number"); // Number buttons
const operatorButtons = document.querySelectorAll(".operator"); // Operator buttons
const equalsButton = document.querySelector(".equals"); // Equals button
const decimalButton = document.querySelector(".decimal"); // Decimal button
const clearButton = document.querySelector(".clear"); // Clear button
const zeroButton = document.querySelector(".zero"); // Zero button

let currentInput = "0"; // Current input displayed
let firstOperand = null; // First operand for calculations
let operator = null; // Current operator
let waitingForSecondOperand = false; // Flag to check if waiting for second operand

// Update display
function updateDisplay() {
    display.value = currentInput; // Update the display with current input
}

// Handle number input
function inputNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number; // Set current input to the new number
        waitingForSecondOperand = false; // Reset the flag
    } else {
        currentInput = currentInput === "0" ? number : currentInput + number; // Append number
    }
}

// Handle decimal point
function inputDecimal() {
    if (waitingForSecondOperand) {
        currentInput = "0."; // Start new input with decimal
        waitingForSecondOperand = false; // Reset the flag
        return;
    }
    if (!currentInput.includes(".")) {
        currentInput += "."; // Append decimal if not already present
    }
}

// Handle operators
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput); // Convert current input to a number
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator; // Update operator if waiting for second operand
        return;
    }
    
    if (firstOperand === null) {
        firstOperand = inputValue; // Set first operand
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator); // Calculate result
        currentInput = String(result); // Update current input with result
        firstOperand = result; // Set first operand to result for further calculations
    }
    
    waitingForSecondOperand = true; // Set flag to wait for second operand
    operator = nextOperator; // Update operator
}

// Calculation logic
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand; // Addition
        case "-":
            return firstOperand - secondOperand; // Subtraction
        case "*":
            return firstOperand * secondOperand; // Multiplication
        case "/":
            return firstOperand / secondOperand; // Division
        default:
            return secondOperand; // Return second operand if no operator
    }
}

// Clear everything
function clearAll() {
    currentInput = "0"; // Reset current input
    firstOperand = null; // Reset first operand
    operator = null; // Reset operator
    waitingForSecondOperand = false; // Reset flag
}

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        inputNumber(button.textContent); // Handle number input
        updateDisplay(); // Update display
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent); // Handle operator input
        updateDisplay(); // Update display
    });
});

decimalButton.addEventListener("click", () => {
    inputDecimal(); // Handle decimal input
    updateDisplay(); // Update display
});

zeroButton.addEventListener("click", () => {
    inputNumber("0"); // Handle zero input
    updateDisplay(); // Update display
});

equalsButton.addEventListener("click", () => {
    if (!operator) return; // Exit if no operator is selected
    
    const inputValue = parseFloat(currentInput); // Convert current input to number
    const result = calculate(firstOperand, inputValue, operator); // Calculate result
    
    currentInput = String(result); // Update current input with result
    firstOperand = null; // Reset first operand
    operator = null; // Reset operator
    waitingForSecondOperand = true; // Set flag to wait for second operand
    
    updateDisplay(); // Update display
});

clearButton.addEventListener("click", () => {
    clearAll(); // Clear all inputs
    updateDisplay(); // Update display
});

// Initialize display
updateDisplay(); // Set initial display value
