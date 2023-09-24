//DOMConentLoaded useful when you need to initialize JS funcitionality or attach event listeners to DOM elements after the documnent has been loaded
//event function
document.addEventListener('DOMContentLoaded', (event) => {
    let firstOperand = '';
    let secondOperand = '';
    let currentOperation = '';
//display everything in .total
    const display = document.querySelector('.total');



    //for each div button / number do action
    document.querySelectorAll('.g1').forEach(button => {
        button.addEventListener('click', () => {
            //get attribute used for recieving attribute from HTML, in this case, data-action attribute
            const action = button.getAttribute('data-action');
            //textConent is used to return the text content of a specified node 
            const value = button.textContent;

            if (action === 'number') {
                appendNumber(value);
            } else if (action === 'operation') {
                setOperation(value);
            } else if (action === 'equals') {
                calculate();
            } else if (action === 'clear') {
                clearAll();
            } else if (action === 'decimal') {
                appendDecimal();
            } else if (action === 'percent') {
                percent();
            } else if (action === 'plusMinus') {
                plusMinus();
            }
        });
    });

    function appendNumber(number) {
        if (currentOperation === null) {
            firstOperand += number;
            display.textContent = firstOperand;
        } else {
            secondOperand += number;
            display.textContent = secondOperand;
        }
    }

    function setOperation(operation) {
        if (firstOperand === '') return;
        currentOperation = operation;
    }

    function calculate() {
        let a = parseFloat(firstOperand);
        let b = parseFloat(secondOperand);

        let result;
        if (currentOperation === '+') {
            result = a + b;
        } else if (currentOperation === '-') {
            result = a - b;
        } else if (currentOperation === '×') {
            result = a * b;
        } else if (currentOperation === '÷') {
            if (b !== 0) {
                result = a / b;
            } else {
                alert('Cannot divide by zero');
                return;
            }
        }

        display.textContent = result;
        firstOperand = `${result}`;
        secondOperand = '';
        currentOperation = null;
    }

    function clearAll() {
        firstOperand = '';
        secondOperand = '';
        currentOperation = null;
        display.textContent = '';
    }

    function appendDecimal() {
        if (currentOperation === null && !firstOperand.includes('.')) {
            firstOperand += '.';
            display.textContent = firstOperand;
        } else if (!secondOperand.includes('.')) {
            secondOperand += '.';
            display.textContent = secondOperand;
        }
    }

    function percent() {
        if (currentOperation === null && firstOperand !== '') {
            firstOperand = `${parseFloat(firstOperand) / 100}`;
            display.textContent = firstOperand;
        } else if (secondOperand !== '') {
            secondOperand = `${parseFloat(secondOperand) / 100}`;
            display.textContent = secondOperand;
        }
    }

    function plusMinus() {
        if (currentOperation === null && firstOperand !== '') {
            firstOperand = `${parseFloat(firstOperand) * -1}`;
            display.textContent = firstOperand;
        } else if (secondOperand !== '') {
            secondOperand = `${parseFloat(secondOperand) * -1}`;
            display.textContent = secondOperand;
        }
    }
});
