function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, num1, num2) {
	switch(operator) {
		case '+': return add(num1, num2);
		case '-': return subtract(num1, num2);
		case '×': return multiply(num1, num2);
		case '/': return divide(num1, num2);
	}
}

function buttonControl() {
	let string = this.innerText;

	// number input
	if (string.match(/[0-9\.]/)) {
		if (operatorClicked) {
			operatorClicked = false;
			display.innerText = '';
			return populateDisplay(string);
		} else {
			return populateDisplay(string);
		}
	}

	// input manipulation
	switch(string) {
		case '+/-': return changeSign();
		case 'C': return backspace();
		case 'AC': return clearAll();
	}

	// operator buttons
	if (string.match(/[+-×/=]/)) return handleOperation(string);
}

function populateDisplay(key) {
	display.innerText += key;
}

function changeSign() {
	if (Number(display.innerText) < 0) {
		display.innerText = display.innerText.slice(1);
	} else {
		display.innerHTML = '-' + display.innerText;
	}
	console.log('changeSign')
}

function backspace() {
	display.innerText = display.innerText.slice(0, display.innerText.length - 1);
	console.log('backspace')
}

function clearAll() {
	display.innerText = '';
	firstNum = "";
	secondNum = "";
	symbol = "";
	console.log('clearAll')
}

function handleOperation(sym) {
	operatorClicked = true;
	if (!symbol) {
		firstNum = display.innerText;
		symbol = sym;
	} else {
		secondNum = display.innerText;
		result = operate(symbol, firstNum, secondNum);
		console.log(result);
	}
}


const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display__output');
let firstNum, secondNum, symbol, operatorClicked, result;


buttons.forEach(button => {
	button.addEventListener('click', buttonControl)
})