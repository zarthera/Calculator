
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll('[data-operator]')
const clearButton = document.querySelector(".clear")
const equalsButton = document.querySelector(".equals")
const pointButton = document.querySelector(".point")
const lastOperationScreen = document.querySelector('.lastOperationScreen')
const currentOperationScreen = document.querySelector('.currentOperationScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent))
})

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)   


function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
}
  
function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}
  
function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}
  
function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
}
  
function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}
  
function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}
  
function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

  function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '/'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }
  function add(a, b) {
    return a + b
  }
  
  function substract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }



