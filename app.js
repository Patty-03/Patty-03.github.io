const resultElement = document.getElementById('result');
let currentOperation = '';

// Actualizar la pantalla de la calculadora
function updateDisplay() {
    resultElement.value = currentOperation;
}

// Añadir eventos de clic a los botones de números y operaciones
document.querySelectorAll('.number, .operation').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.innerText;

        // Si es una operación, agregar espacio alrededor del operador
        if (this.classList.contains('operation')) {
            if (value === 'C') {
                // Si el usuario presiona 'C', limpiar la operación
                currentOperation = '';
                updateDisplay();
                return;
            } else if (value === '=') {
                // Si el usuario presiona '=', calcular el resultado
                try {
                    // Evaluar la operación y actualizar la pantalla
                    currentOperation = eval(currentOperation).toString();
                } catch (error) {
                    currentOperation = 'Error';
                }
                updateDisplay();
                return;
            } else {
                // Para otros operadores, asegurar el espacio alrededor de ellos
                currentOperation += ` ${value} `;
            }
        } else {
            currentOperation += value;
        }

        updateDisplay();
    });
});

// Añadir evento de clic al botón de igual
document.getElementById('equal').addEventListener('click', function() {
    try {
        currentOperation = eval(currentOperation).toString();
    } catch (error) {
        currentOperation = 'Error';
    }
    updateDisplay();
});

// Añadir evento de clic al botón de limpiar
document.getElementById('clear').addEventListener('click', function() {
    currentOperation = '';
    updateDisplay();
});

// Función para reemplazar el último operador si uno nuevo es presionado
function replaceLastOperator(operation) {
    return operation.replace(/[\+\-\*\/] $/, '');
}

// Corregir los operadores antes de evaluar la operación
function sanitizeOperation(operation) {
    return operation.replace(/X/g, '*');
}

// Sobreescribir la evaluación para corregir la operación y reemplazar los operadores
function evaluateOperation(operation) {
    try {
        // Corregir la operación y evaluar
        return eval(sanitizeOperation(replaceLastOperator(operation))).toString();
    } catch (error) {
        return 'Error';
    }
}

// Modificar el evento de igual para usar la función de evaluación
document.getElementById('equal').addEventListener('click', function() {
    currentOperation = evaluateOperation(currentOperation);
    updateDisplay();
});
