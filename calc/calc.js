(function(global) {

    let leftValue;
    let rightValue;
    let operation;
    const calc = {};

    calc.initializeCalc = function() {
        leftValue = "";
        rightValue = "";
        operation = null;
        let calcFunctionEle = document.getElementsByClassName("calcFunctions");
        for (let index = 0; index < calcFunctionEle.length; index++)
            calcFunctionEle[index].addEventListener("click", calc.clickHandler)
    }

    calc._displayOnCalc = function(calcValue) {
        let displayEle = document.getElementById("displayText");
        displayEle.value = calcValue;
    }

    calc._handlerOperation = function(op) {
        let bHandled = true;

        if (op === 'C') {
            leftValue = "";
            rightValue = "";
            operation = null;
        }
        else if (op === '.') {
            if (rightValue === "" && leftValue.indexOf(".") === -1)
                leftValue = leftValue + ".";
            else
                rightValue = rightValue + ".";
        }
        else if (leftValue != "" && rightValue != "" ) {
            calc._performALUOperation();
            bHandled = true;
        }
        else {
            operation = op;
            bHandled = false;
        }

        return bHandled;
    }

    calc._performALUOperation = function() {
        if (operation === null)
            return;

        let leftNumber = parseFloat(leftValue);
        let rightNumber = parseFloat(rightValue);
        
        switch(operation) {
            case "+ =": 
                leftNumber += rightNumber;
                rightNumber = 0;
                break;
            case "*":
                if (leftNumber === 0)
                    break;

                leftNumber *= rightNumber;
                rightNumber = 0;
                break;
            case "/":
                if (leftNumber === 0)
                    break;

                leftNumber /= rightNumber;
                break;
            case "-":
                leftNumber -= rightNumber;
                break;
        }

        operation = null;
        leftValue = "" + leftNumber;
        rightValue = "";
    }

    calc.clickHandler = function(event) {
        let calcValue = "";
        let clickedValue = event.target.innerText;

        if (!isNaN(clickedValue)) {
            if (operation === null && rightValue === "") {
                leftValue = leftValue + clickedValue;
                calcValue = leftValue;
            }
            else {
                rightValue = rightValue + clickedValue;
                calcValue = rightValue;
            }
        } else {
            // Handle the operations
            let bOperationHandled = calc._handlerOperation(clickedValue);
            calcValue = (bOperationHandled) ? leftValue : rightValue;
        }
        calc._displayOnCalc(calcValue);
    }

   global.calc = calc;
})(window);

window.addEventListener("load", window.calc.initializeCalc);
