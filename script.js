function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOperations() {
    const operationType = document.getElementById('operationType').value;
    const numCount = document.getElementById('numCount').value;
    const num1Digits = document.getElementById('num1Digits').value;
    const num2Digits = document.getElementById('num2Digits').value;
    
    const operationsContainer = document.getElementById('operationsContainer');
    operationsContainer.innerHTML = '';  // Limpiar operaciones previas

    for (let i = 0; i < numCount; i++) {
        const num1 = generateRandomNumber(num1Digits);
        const num2 = generateRandomNumber(num2Digits);

        let symbol = '';
        switch (operationType) {
            case 'suma': symbol = '+'; break;
            case 'resta': symbol = '-'; break;
            case 'multiplicacion': symbol = '×'; break;
            case 'division': symbol = '÷'; break;
        }

        const div = document.createElement('div');
        div.className = 'operation';
        div.innerHTML = `
            ${num1} ${symbol} ${num2} = 
            <input type="number" data-num1="${num1}" data-num2="${num2}" data-op="${operationType}">
        `;
        operationsContainer.appendChild(div);
    }
}

function evaluateResults() {
    const inputs = document.querySelectorAll('#operationsContainer input');
    let correct = 0;
    let total = inputs.length;

    inputs.forEach(input => {
        const num1 = parseFloat(input.getAttribute('data-num1'));
        const num2 = parseFloat(input.getAttribute('data-num2'));
        const op = input.getAttribute('data-op');
        let correctAnswer;

        switch (op) {
            case 'suma':
                correctAnswer = num1 + num2;
                break;
            case 'resta':
                correctAnswer = num1 - num2;
                break;
            case 'multiplicacion':
                correctAnswer = num1 * num2;
                break;
            case 'division':
                correctAnswer = num1 / num2;
                break;
        }

        const userAnswer = parseFloat(input.value);
        if (userAnswer === correctAnswer) {
            correct++;
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Correctas: ${correct} / ${total}<br>Nota: ${(correct / total * 10).toFixed(1)}`;
    
    return false;  // Evitar que el formulario se envíe
}
