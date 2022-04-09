let firstOperand = "";
let secondOperand = "";
let operator = "";
let needsScreenReset = false;

const upperDisplayDiv = document.querySelector(".upper-display")
const lowerDisplayDiv = document.querySelector(".lower-display")

window.addEventListener("load", () => lowerDisplayDiv.textContent = "0");
window.addEventListener("keydown", handleKeyInput);

const digitBtns = document.querySelectorAll(".digit-btn").forEach(btn => btn.addEventListener("click", processNumber));
const operatorBtns = document.querySelectorAll(".operator-btn").forEach(btn => btn.addEventListener("click", processOperator));
const equalsBtn = document.querySelector(".equals-btn").addEventListener("click", operate);
const clearBtn = document.querySelector(".clear-btn").addEventListener("click", clear);
const deleteBtn = document.querySelector(".delete-btn").addEventListener("click", deleteNumber);
const decimalBtn = document.querySelector(".decimal-btn").addEventListener("click", processDecimal);

function processNumber(event) {
    if (needsScreenReset || lowerDisplayDiv.textContent === "0") {
        resetScreen();
    };

    if (event instanceof KeyboardEvent) {
        lowerDisplayDiv.textContent += event.key;
    } else {
        lowerDisplayDiv.textContent += event.target.textContent;
    };
};

function processOperator(event) {
    if (operator.length > 0) {
        operate();
    };

    if (event instanceof KeyboardEvent) {
        operator = event.key;
    } else {
        operator = event.target.textContent;
    };

    firstOperand = lowerDisplayDiv.textContent;
    upperDisplayDiv.textContent = `${firstOperand} ${operator}`;
    needsScreenReset = true;
};

function processDecimal() {
    if (needsScreenReset) {
        resetScreen();
    };

    if (lowerDisplayDiv.textContent.includes(".")) {
        return;
    };

    lowerDisplayDiv.textContent += ".";
};

function operate() {
    if (operator.length === 0 || needsScreenReset) {
        return;
    };

    secondOperand = lowerDisplayDiv.textContent;

    if (operator === "/" && secondOperand === "0") {
        alert("Division by 0 is not allowed!");
        return;
    };

    lowerDisplayDiv.textContent = Math.round(calculate(operator, firstOperand, secondOperand) * 100) / 100;
    upperDisplayDiv.textContent = `${firstOperand} ${operator} ${secondOperand} = `;
    operator = "";
    needsScreenReset = true;
};

function resetScreen() {
    lowerDisplayDiv.textContent = "";
    needsScreenReset = false;
};

function clear() {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    lowerDisplayDiv.textContent = "0";
    upperDisplayDiv.textContent = "";
};

function deleteNumber() {
    lowerDisplayDiv.textContent = lowerDisplayDiv.textContent.slice(0, -1);
};

function handleKeyInput(event) {
    let key = event.key;

    switch (true) {
        case (key >= 0 && key <= 9):
            processNumber(event);
            break;
        case (key === "+" || key === "-" || key === "*" || key === "/"):
            processOperator(event);
            break;
        case (key === "."):
            processDecimal();
            break;
        case (key === "=" || key === "Enter"):
            operate();
            break;
        case (key === "Escape"):
            clear();
            break;
        case (key === "Backspace"):
            deleteNumber();
            break;
        default:
            break;
    };
};

function calculate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            break;
    };
};