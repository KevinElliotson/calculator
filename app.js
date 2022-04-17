let display = document.querySelector('.display')
let previousNum = document.querySelector('.previousNum')
let numberButtons = document.querySelectorAll('.num')
let decButton = document.querySelector('.btnDec')
let operatorButtons = document.querySelectorAll('.operator')
let clearButton = document.querySelector('.btnClear')
let equalButton = document.querySelector('.btnEquals')
let backSpace = document.querySelector('.backSpace')

let operator = ''
let arr = []

function equals() {
    console.log('equal function fired')
    // Checks to see if a number has been entered before evaluating (prevents the calculator from evaluating when something like '1 + =' is pushed)
    if (display.textContent === '') { return }

    // Checks to see if an initial value is stored (prevents the calc from evaluating if something like '1 =' is pushed)
    if (arr.length >= 1) {
        arr.push(display.textContent)
        previousNum.textContent = ''
        if (operator != '') {
            if (operator === '*') {
                display.textContent = +arr[0] * +arr[1]
                console.log('equal function fired, used * if statement')
                // disables our number (and decimal) buttons when a evaluation is successful. This stop the user from adding additional numbers/decimals to the returned
                // value. Buttons are re-enabled when the clear or another operator button is pushed
                numberButtons.forEach(element => element.disabled = true)
            } else if (operator === '/') {
                display.textContent = +arr[0] / +arr[1]
                console.log('equal function fired, used / if statement')
                numberButtons.forEach(element => element.disabled = true)
            } else if (operator === '+') {
                display.textContent = +arr[0] + +arr[1]
                console.log('equal function fired, used + if statement')
                numberButtons.forEach(element => element.disabled = true)
            } else if (operator === '-') {
                display.textContent = +arr[0] - +arr[1]
                console.log('equal function fired, used - if statement')
                numberButtons.forEach(element => element.disabled = true)
            }
            operator = ''
            arr[0] = display.textContent
            arr.pop()
        } else {
            console.log('function ran, but else statement hit')
            return
        }
    }

}
equalButton.addEventListener('click', function evaluate() {
    equals()
    arr.pop()
})

backSpace.addEventListener('click', function remove() {
    if (display.textContent === '') { 
        console.log('backspace button pushed, but nothing to delete')
        return 
    }
    display.textContent = display.textContent.slice(0, -1)
})


//adds event listeners to each of our number buttons. Adds the number pushed to the display
numberButtons.forEach(element => {
    element.addEventListener('click', function takeContent(button) {
        display.textContent += button.target.innerText
        if (display.textContent.indexOf('.') > -1) { decButton.disabled = true }
    })
})

operatorButtons.forEach(element => {
    element.addEventListener('click', function findSum(button) {
        // check to see if the user has input something into the calculator before hitting an operator
        if (display.textContent === '') {
            console.log('function fired, but no input to evaluate')
            return
        }



        if (arr.length === 1) {
            equals()
        } else if (arr.length === 0) {
            arr.push(display.textContent)
        }
        numberButtons.forEach(element => element.disabled = false)
        operator = button.target.innerText
        previousNum.textContent = display.textContent + operator
        display.textContent = ''



    })
})


clearButton.addEventListener('click', function clearDisplay() {
    // wipes everything when the clear button is pressed
    previousNum.textContent = ''
    display.textContent = ''
    arr = []
    numberButtons.forEach(element => element.disabled = false)
})



