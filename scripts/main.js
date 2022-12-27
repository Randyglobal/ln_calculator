// Get access to Dom Elements

// Screens
const operationsScreen = document.querySelector('input.operations-screen');
const answerScreen = document.querySelector('input.answer-screen');
answerScreen.readOnly = true;

// Digit Buttons
const calcDigits = document.querySelectorAll('button.digit');

// Arithmetic Operator Buttons
const arithmeticOperators = document.querySelectorAll('button.arithmeticOp');

// Calculator function buttons
const allCalcFunctions = document.querySelectorAll('button.calc-function');

// Calculator scientific operators
const scientificOperators = document.querySelectorAll('button.scientificOp');

// Listen for click events on digits
calcDigits.forEach(digit => {
    digit.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log('Button event', event);
        operationsScreen.value += event.target.innerText;
    })
});

// listen for click events on arithmetic operators
arithmeticOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();

        const clickedOperator = event.target.innerText;
        let result;

        if (clickedOperator == '=') {
            const { operation, value } = operationParser(operationsScreen.value);
            if (operation && value) {
                // This is a scientific operation
                answerScreen.value = science(operation, value);
            } else {
                result = eval(operationsScreen.value);
                answerScreen.value = result;
                
            }
        } else {
            operationsScreen.value += clickedOperator;
        }
        

    })
});

// listen for click events on the calc functions
allCalcFunctions.forEach(func => {
    func.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedFunction = event.target.innerText;

        // Clear Screen
        if (clickedFunction == 'CLR') {
            operationsScreen.value = '';
            answerScreen.value = '';
        }

        // Clear last value
        if (clickedFunction == 'DEL') {
            let currVal = operationsScreen.value;
            operationsScreen.value = currVal.substr(0, currVal.length - 1);
        }
        //Add to storage
        if(clickedFunction == 'M+'){
            localStorage.setItem('label', getUserName.value);
        }

        if(clickedFunction == 'M-'){
            localStorage.removeItem('label')
        }
        if(clickedFunction == 'Ans'){
            result = localStorage.getItem('label')
            answerScreen.value = result;
            operationsScreen.value = result;
        }
    })
});

// Listen for scientific operations
scientificOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedScientificOperator = event.target.innerText;
        operationsScreen.value += clickedScientificOperator + '(';

        if (clickedScientificOperator == 'tan') {

        }
    });
})

function operationParser(operation = '') {
    const scientificOps = ['rand', 'sin', 'tan', 'cos', 'log', 'x^y', 'hyp', 'sqrt'];
    let opertionToPerf;
    let val;

    scientificOps.forEach(operator => {
        if (operation.startsWith(operator)) {
            const expression = operation.split('(');
            console.log('exp', expression);
            opertionToPerf = expression[0];
            val = expression[1];
        }
    });
    return { operation: opertionToPerf, value: val };
}

function science(operation = '', val = 0) {
    if (operation == 'tan') {
        return Math.tan(+val);
    }

    if (operation == 'sin') {
        return Math.sin(+val)*(Math.PI/180);
    }

    if (operation == 'cos') {
        return Math.cos(+val);
    }
}


