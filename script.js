function operate(sym, num1, num2) {
    switch (sym) {
        case "+":
            return num1+num2;
        case "-":
            return num1-num2;
        case "*":
            return num1*num2;
        case "/":
            if (num2 === 0) {
                alert("Just because you can doesn't mean you should.");
                return 0;
            }
            return num1/num2; 
    }
}

function parseValue(str) {

    let num1 = "";
    let op = "";
    let num2 = "";
    let decCount = 0;
    let maxDec = false;
    let negative = false;

    for (let i = 0; i < str.length; i++) {
        console.log(i + ":" + str.charAt(i));

        if ("+*/-".includes(str.charAt(i)) && num1.length > 0 && "-" !== num1.charAt(num1.length-1)) {
            //prevents error when ending in decimal
            if (num1.charAt(num1.length-1) === ".") {
                num1+="0";
            }
            op = str.charAt(i);
            decCount = 0;
            maxDec = false;
            //begin logic for num2
            for (let j = i+1; j < str.length; j++) {
                //if there is more than one decimal stop adding values to the number
                if ("." === str.charAt(j) && decCount === 1) {
                   break;
                }
                if ("." === str.charAt(j)) {
                    decCount += 1;
                }
                

                num2 += str.charAt(j);
            }
            if (num2.charAt(num2.length-1) === ".") {
                num2 += "0";
            }
            break;
        }
        
        //if there is more than one decimal stop adding values to the number
        if (maxDec) continue;
        if ("." === str.charAt(i) && decCount === 1) {
            maxDec = true;
            continue;
        }
        if ("." === str.charAt(i)) {
            decCount += 1;
        }
        //passes over extra or invalid operators at the beginning of the calculation
        if ("+*/".includes(str.charAt(i)) && (num1.length === 0 || "-" === num1.charAt(num1.length-1))) {
            continue;
        }
        if (num1.charAt(num1.length-1) === "-" && "-" === str.charAt(i)) continue;
        

        num1 += str.charAt(i);

        
    }

    if (num1 === "") {
        return str;
    }

    if (num2 === "") {
        return num1;
    }

    result =  operate(op, parseFloat(num1), parseFloat(num2));
    result = String(result);
    if (result.length > 19) {
        result = result.substring(0, 20);
        if (result.charAt(result.length-1) === ".") {
            result = result.substring(0, result.length-1);
        }
    }

    return result;

}

let display = "";
let total = 0;
let operator = false;
//input user sees
const input = document.querySelector("#input");
//number and operator buttons
const op = document.querySelectorAll(".dis");

//adds functionality for operators and numbers. Adds each to the display and
//performs a calculation if an operator is pressed between two numbers
op.forEach(button => {

    button.addEventListener("click", e => {
        if (display.length < 19) {
            //if a symbol follows a number makes a note an operation is about to take place
            if ("+*/".includes(e.target.textContent) && !operator && ((display.length > 0 && "0123456789".includes
            (display.charAt(display.length-1))) || input.textContent === "0")) {
                operator = true;
                //if an operator button is pressed after number (operator) number then it calculates the current numbers before
                //adding the next operator to the input 
            } else if ("+-*/".includes(e.target.textContent) && operator && "0123456789".includes(display.charAt(display.length-1))) {
                display = parseValue(display);
                operator = false;
                //prevents duplicate operators, with the exception of minus for negative numbers
            } else if ("+-*/".includes(e.target.textContent) && display.length > 0 && !"0123456789".includes(display.charAt(display.length-1))) {
                if ("-" === e.target.textContent) {
                    if (display.length === 1) return;
                    if (!operator && display.charAt(display.length-1) === "-") {
                        operator = true;
                    } else if (operator && display.charAt(display.length-1) === "-") {
                        return;
                    }

                } else {
                    return;
                }
            } else if ("+*/".includes(e.target.textContent) && display.length === 0) {
                return;
            }

            if ("+*/".includes(e.target.textContent) && input.textContent === "0" && display === "") display = "0";

            display += e.target.textContent;
            input.textContent = display;
        }
        
    })

})

const clear = document.querySelector("#clear");
const del = document.querySelector("#del");
const equals = document.querySelector("#equals");

//clears current input
clear.addEventListener("click", () => {
    display = "";
    input.textContent = "0";
    operator = false;
});

//deletes last input
del.addEventListener("click", () => {
    if (display.length > 1) {
        //logic for when an operator is deleted
        if ("+-*/".includes(display.charAt(display.length-1))) {
            //accounts for negative numbers
            if (!("-" === display.charAt(display.length-1) && "+-*/".includes(display.charAt(display.length-2)))) {
                operator = false;
            }
            
        }
        display = display.substring(0, display.length-1);
    } else {
        display = "";
        input.textContent = "0";
        return;
    }
    
    input.textContent = display;
})

//calculates total based off of the specified numbers
equals.addEventListener("click", () => {
    display = parseValue(display);
    input.textContent = display;
    if (input.textContent === "0") display = "";
    operator = false;
})
