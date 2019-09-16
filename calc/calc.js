(function(global) {

    let leftValue;
    let rightValue;
    let operation;
    const calc = {};

    /*
     * Method to initialize the calculator by registering for click events for all the calculator function methods.
     * @return None
     */
    calc.initializeCalc = function() {
        leftValue = "";
        rightValue = "";
        operation = null;
        let calcFunctionEle = document.getElementsByClassName("calcFunctions");
        for (let index = 0; index < calcFunctionEle.length; index++)
            calcFunctionEle[index].addEventListener("click", calc.clickHandler)
    }

    /*
     * Method to display corresponding text on the calculator text box.
     * 
     * @param calcValue display text in calculator
     * @private
     */
    calc._displayOnCalc = function(calcValue) {
        let displayEle = document.getElementById("displayText");
        displayEle.value = calcValue;
    }

    /*
     * Method to handle the function buttons of calculator. It also determines when to compute ALU operations over other calculator operations.
     *
     * @param op determines the operation to be performed in calculator.
     * @return 1 when operation has been handled, 2 when operation for decimal has been handled and 3 otherwise.
     * @private
     */
    calc._handlerOperation = function(op) {
        let bHandled = 1;

        if (op === 'C') {
            leftValue = "0";
            rightValue = "";
            operation = null;
        }
        else if (op === '.') {
            if (operation === null && leftValue.indexOf(".") === -1)
                leftValue = leftValue + ".";
            else if (operation !== null && rightValue.indexOf(".") === -1) {
                rightValue = rightValue + ".";
		bHandled = 2;
	    }
	    else
		bHandled = 3;
        }
        else if (leftValue != "" && rightValue != "" ) {
            calc._performALUOperation(op);
            bHandled = 1;
        }
        else {
            operation = op;
            bHandled = 2;
        }

        return bHandled;
    }

    /*
     * Performs ALU operations on the current state of the calculator. It uses two operands namely leftValue, rightValue and uses the current operation on them. The result is saved as a part of leftValue upon processing.
     *
     * @param op determines the operation to be performed on the operands
     * @return None
     * @private
     */
    calc._performALUOperation = function(op) {
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

        leftValue = "" + leftNumber;
        rightValue = "";
	operation = op;
    }

    /*
     * Method to handle the click events on calculator funcitons.
     *
     * @param event determines the event object sent when onClick is triggered on each of the controls.
     * @return None
     */
    calc.clickHandler = function(event) {
        let calcValue = "";
        let clickedValue = event.target.innerText;

        if (!isNaN(clickedValue)) {
            if (operation === null && rightValue === "") {
		// Handle the digit 0 of the left operand
		if (leftValue === "0")
		    leftValue = "";

                leftValue = leftValue + clickedValue;
                calcValue = leftValue;
            }
            else {
                rightValue = rightValue + clickedValue;
                calcValue = rightValue;
            }
        } else {
            // Handle the operations
            let opHandleCode = calc._handlerOperation(clickedValue);
	    if (opHandleCode === 1 || (opHandleCode === 3 && rightValue === ""))
		calcValue = leftValue;
	    else if (opHandleCode === 2 || (opHandleCode === 3))
		calcValue = rightValue;
        }
        calc._displayOnCalc(calcValue);
    }

   // Adding the current calc object as a valid namespace
   global.calc = calc;
})(window);

// Initialize calculator upon window completely loaded
window.addEventListener("load", window.calc.initializeCalc);
