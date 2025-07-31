// select the elements 
var input_box = document.getElementById("input_box");
var numbers = document.querySelectorAll(".number")
var Operators = document.querySelectorAll(".operator")
var equal = document.querySelector(".equals")
var decimals = document.querySelector(".decimal")
var clear = document.querySelector(".clear")
var zero = document.querySelector(".zero")
var resultDisplayed = false
// input entry 
numbers.forEach(number =>{
    number.addEventListener("click",()=>{
        if(resultDisplayed){
            input_box.value = "";
            resultDisplayed = false;
        }
        input_box.value  += number.textContent
    })
})
// operators input entry 
Operators.forEach(Operator =>{
    Operator.addEventListener("click",()=>{
         if(resultDisplayed){
            input_box.value = "";
            resultDisplayed = false;
            
        }
        input_box.value  += Operator.textContent
        
    })
})
// decimal input entry 
decimals.addEventListener("click",()=>{
     if(resultDisplayed){
            input_box.value = "";
            resultDisplayed = false;
        }
    input_box.value  += decimals.textContent 
    
}) 
// zero input entry 
zero.addEventListener("click",()=>{
     if(resultDisplayed){
            input_box.value = "";
            resultDisplayed = false;
            
        }
    input_box.value  += zero.textContent
    
})
// claer buttons 
clear.addEventListener("click",()=>{
    if(input_box.value == ""){
        alert("The Input Box is already Empty")
    }
    input_box.value = ""
})
// calculations
equal.addEventListener("click", () => {
    try {
        let expr = input_box.value;

        // Remove spaces, validate input
        expr = expr.replace(/\s+/g, '');
        if (!/^[\d.+\-*/]+$/.test(expr)) {
            throw new Error("Invalid characters.");
        }

        // Parse expression (handle negative numbers, decimals)
        const tokens = [];
        let numBuffer = '';
        for (let i = 0; i < expr.length; i++) {
            const ch = expr[i];
            if ("0123456789.".includes(ch)) {
                numBuffer += ch;
            } else if ('+-*/'.includes(ch)) {
                if (numBuffer === '' && ch === '-' && (i === 0 || '+-*/'.includes(expr[i - 1]))) {
                    // Negative number, append to buffer
                    numBuffer = '-';
                } else {
                    if (numBuffer === '') throw new Error("Syntax error");
                    tokens.push(parseFloat(numBuffer));
                    tokens.push(ch);
                    numBuffer = '';
                }
            } else {
                throw new Error("Invalid input");
            }
        }
        if (numBuffer !== '') tokens.push(parseFloat(numBuffer));

        // Step 1: Process * and /
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const prev = tokens[i - 1];
                const next = tokens[i + 1];
                if (tokens[i] === '*') tokens.splice(i - 1, 3, prev * next);
                else {
                    if (next === 0) throw new Error("Divide by zero");
                    tokens.splice(i - 1, 3, prev / next);
                }
                i -= 1;
            }
        }

        // Step 2: Process + and -
        let result = tokens[0];
        for (let i = 1; i < tokens.length; i += 2) {
            const op = tokens[i];
            const num = tokens[i + 1];
            if (op === '+') result += num;
            else if (op === '-') result -= num;
        }

        // Output
        input_box.value = result;
        resultDisplayed = true;
    } catch (error) {
        alert("Invalid Input: " + error.message);
        resultDisplayed = true;
    }
});

