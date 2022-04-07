let firstOperand = "";
let secondOperand = "";
let operator = "";
let needsScreenReset = false;

const upperDisplayDiv = document.querySelector(".upper-display");
const lowerDisplayDiv = document.querySelector(".lower-display");

const digitBtns = document.querySelectorAll(".digit-btn").forEach(btn => btn.addEventListener("click", processNumber));
const operatorBtns = document.querySelectorAll(".operator-btn").forEach(btn => btn.addEventListener("click", processOperator));
const equalsBtn = document.querySelector(".equals-btn").addEventListener("click", operate);

function processNumber(event) {
    if (needsScreenReset) {
        resetScreen();
    };

    lowerDisplayDiv.textContent += event.target.textContent;
};

function processOperator(event) {
    if (operator.length > 0) {
        operate();
    };

    operator = event.target.textContent;
    firstOperand = lowerDisplayDiv.textContent;
    upperDisplayDiv.textContent = `${firstOperand} ${operator}`;
    needsScreenReset = true;
};

function operate() {
    if (operator.length === 0 || needsScreenReset) {
        return;
    };

    secondOperand = lowerDisplayDiv.textContent;
    lowerDisplayDiv.textContent = calculate(operator, firstOperand, secondOperand);
    upperDisplayDiv.textContent = `${firstOperand} ${operator} ${secondOperand} = `;
    operator = "";
};

function resetScreen() {
    lowerDisplayDiv.textContent = "";
    needsScreenReset = false;
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


function test(event) {
    console.log("Hello");
};