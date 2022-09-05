function operate(sym, num1, num2) {
    switch (sym) {
        case "+":
            return num1+num2;
        case "-":
            return num1-num2;
        case "*":
            return num1*num2;
        case "/":
            return num1/num2; 
    }
}

let display = "";
let total = 0;
//input user sees
const input = document.querySelector("#input");
//number and operator buttons
const op = document.querySelectorAll(".dis");

op.forEach(button => {

    button.addEventListener("click", e => {
        if (display.length < 19) {
            display += e.target.textContent;
            input.textContent = display;
        }
        
    })

})

const clear = document.querySelector("#clear");
const del = document.querySelector("#del");

clear.addEventListener("click", () => {
    display = "";
    input.textContent = "0";
});

del.addEventListener("click", () => {
    if (display.length > 1) {
        display = display.substring(0, display.length-1);
    } else {
        display = "";
        input.textContent = "0";
        return;
    }
    
    input.textContent = display;
})
