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
	if (string.match(/[0-9\.]/)) return populateDisplay(string);

	// input manipulation
	if (string.match(/^(±|C|AC)$/)) return manipulateInput(string);

	// operator buttons
	if (string.match(/^[+-×/=]$/)) return handleOperation(string);
}

function populateDisplay(key) {
	display.innerText += key;
}

function manipulateInput(key) {
	switch(key) {
		case '±': return changeSign();
		case 'C': return backspace();
		case 'AC': return clearAll();
	}
}

function changeSign() {
	if (display.innerText[0] === '-') {
		display.innerText = display.innerText.slice(1);
	} else if (!display.innerText.length) {
		display.innerText = '-';
	} else if (display.innerText) {
		display.innerText = '-' + display.innerText;
	}
}

function backspace() {
	display.innerText = display.innerText.slice(0, display.innerText.length - 1);
}

function clearAll() {
	display.innerText = '';
}

function handleOperation(key) {

}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
	button.addEventListener('click', buttonControl)
})

const display = document.querySelector('.display__output');