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
	let string = this.textContent;

	// number input
	if (string.match(/[0-9\.]/)) return populateDisplay(string);

	// input manipulation
	if (string.match(/^(±|C|AC)$/)) return manipulateInput(string);

	// operator buttons
	if (string.match(/^[+-×/]$/)) return handleOperation(string);

	// show result
	if (string.match('=')) {
		evaluate();
		needReset = true;
		currNumber = 0;
		return;
	}
}

function populateDisplay(key) {
	
	resetDisplay();

	if (display.textContent === '0') display.textContent = '';
	if (display.textContent.match(/\./) && key === '.') return;

	display.textContent += key;
}

function manipulateInput(key) {
	switch(key) {
		case '±': return changeSign();
		case 'C': return backspace();
		case 'AC': return clearAll();
	}
}

function changeSign() {
	if (display.textContent[0] === '-') {
		display.textContent = display.textContent.slice(1);
	} else if (!display.textContent.length) {
		display.textContent = '-';
	} else if (display.textContent) {
		display.textContent = '-' + display.textContent;
	}
}

function backspace() {
	display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function clearAll() {
	display.textContent = '0';
	currNumber = 0;
	nextNumber = 0;
	symbol = '';
}

function resetDisplay() {
	if (needReset) {
		display.textContent = '0';
		needReset = false;
	}
}

function handleOperation(key) {
	if (symbol) evaluate();

	currNumber = Number(display.textContent);
	symbol = key;
	needReset = true;
}

function evaluate() {
	if (needReset || symbol === '=') return;

	nextNumber = Number(display.textContent);
	display.textContent = (Math.round(operate(symbol, currNumber, nextNumber) * 1000) / 1000).toString();
}

let needReset;
let currNumber;
let nextNumber;
let symbol;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
	button.addEventListener('click', buttonControl)
})

const display = document.querySelector('.display__output');