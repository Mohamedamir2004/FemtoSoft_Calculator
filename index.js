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
equal.addEventListener("click",()=>{
    try{
        input_box.focus();
        var result = eval(input_box.value)
        input_box.value = result 
        resultDisplayed = true
    }
    catch (error){
        alert(`Invalid Input ${error}`)
        resultDisplayed = true
    }
})
