//CALCULO DE VALORES
/**
 * Verifica si el valor ingresado en el input es un número y además que la pendiente sea ≠0. Caso contrario, lo vacía.
 Además, reemplaza el uso de "," por "." para el separador de decimales y redondea el valor ingresado a dos cifras
 decimales.
 * @method verify
 * @param {string} id - id del input modificado
 * @return {boolean} - posibilidad de calcular propiedades
 */
function verify(id) {
    let valor = document.getElementById(id).value;

    //Reemplazar coma decimal por punto
    if (valor.includes(',')) {
        valor = valor.replace(',', '.');

        document.getElementById(id).value = valor;
    }

    //Valor vacío
    if (valor === "") {
        alert("Llene los campos requeridos")

        document.getElementById(id).style.borderWidth = "thin";
        document.getElementById(id).style.borderColor = "red";

        return false;

    } else if (isNaN(valor)) {
        //Valor ingresado no es un numero
        alert("Ingrese un Número");

        document.getElementById(id).style.borderWidth = "thin";
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).value = "";

        return false;

    } else if (valor > 15 || valor < -15) {
        //Valores fuera de rango
        alert("Ingrese valores entre -15 y 15 para visualizar el grafico correctamente");

        document.getElementById(id).style.borderWidth = "thin";
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).value = "";

        return false;
    } else {
        //Redondear a dos decimales
        document.getElementById(id).value = round(valor);
        document.getElementById(id).style.borderColor = "black";
        return true;
    }
}

/**
 * Redondea el numero a dos cifras decimales
 * @method round
 * @param {number} num - número a redondear
 * @return {number} número redondeado a dos cifras decimales
 */
function round(num) {
    return Math.round(num * 100) / 100;
}

/**
 * Calcula la pendiente de la función tomando el término lineal de la ecuación.
 * @method calcularPendiente
 */
function calcularPendiente() {
    document.getElementById("pendiente").innerHTML = document.getElementById("terminoLineal").value;
}

/**
 * Calcula el ángulo de la función respecto al semieje positivo de las X en radianes, luego lo transforma a grados.
 * @method calcularAngulo
 */
function calcularAngulo() {
    let pendiente = document.getElementById("terminoLineal").value;
    let angulo;

    if (pendiente == 0) {
        angulo = "-";
    } else {
        angulo = round(Math.atan(pendiente) * 180 / Math.PI);
    }


    document.getElementById("angulo").innerHTML = angulo + 'º';
}

/**
 * Toma el término independiente ingresado en la ecuación como ordenada al origen (intersección con eje Y)
 * @method calcularOrdenadaOrigen
 */
function calcularOrdenadaOrigen() {
    document.getElementById("OOy").innerHTML = document.getElementById("terminoIndependiente").value + ')';
}

/**
 * Calcula la Raíz de la función (intersección con eje X)
 * @method calcularRaiz
 */
function calcularRaiz() {
    let tLineal = document.getElementById("terminoLineal").value;
    let tIndependiente = document.getElementById("terminoIndependiente").value;

    if (tLineal == 0) {
        document.getElementById("Rx").innerHTML = "( -";

    } else {
        document.getElementById("Rx").innerHTML = '(' + round(-tIndependiente / tLineal);
    }

}

/**
 * Determina el tipo de función lineal (Creciente o Decreciente) a partir de su pendiente
 * @method determinarTipo
 */
function determinarTipo() {
    let pendiente = Number(document.getElementById("terminoLineal").value);

    if (pendiente > 0) {
        document.getElementById("tipo").innerHTML = "Creciente";
    } else if (pendiente < 0) {
        document.getElementById("tipo").innerHTML = "Decreciente";
    } else {
        document.getElementById("tipo").innerHTML = "Constante";
    }
}

/**
 * Verifica que se cumplan las condiciones verificadas, en caso afirmativo llama a las funciones a realizar el calculo
 * de datos y grafica la funcion en canvas
 * @method calculate
 */
function calculate() {
    if (verify("terminoLineal") && verify("terminoIndependiente")) {
        calcularPendiente();
        calcularAngulo();
        calcularOrdenadaOrigen();
        calcularRaiz();
        determinarTipo();
        graficar(document.getElementById("terminoLineal").value, document.getElementById("terminoIndependiente").value);
    } else {
        dibujarCuadriculado();
        document.getElementById("pendiente").innerHTML = "";
        document.getElementById("angulo").innerHTML = "";
        document.getElementById("OOx").innerHTML = "(0";
        document.getElementById("OOy").innerHTML = ")";
        document.getElementById("Rx").innerHTML = "(";
        document.getElementById("Ry").innerHTML = "0)";
        document.getElementById("tipo").innerHTML = "";
    }
}

//CANVAS

/**
 * Dibuja el cuadriculado del sistema de ejes cartesianos en canvas y su numeración
 * @method dibujarCuadriculado
 */
function dibujarCuadriculado() {
    let canvas = document.getElementById("graficoLineal");
    let context = canvas.getContext("2d");
    let d = 20
    let h = 15;

    canvas.width = canvas.width;

    //Lineas Horizontales
    for (let i = d; i < canvas.height; i += d) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
    }

    //Lineas Verticales
    for (let i = d; i < canvas.width; i += d) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
    }

    //Eje X
    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();

    //Eje Y
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();

    //Numeros Eje X
    for (let i = d; i < canvas.width; i += d) {
        let num = (-canvas.width / 2 + i) / d;
        context.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            context.fillText(num, i, canvas.height / 2 + h);
        }
    }

    //Numeros Eje Y
    for (let i = d; i < canvas.height; i += d) {
        let num = (canvas.height / 2 - i) / d;
        context.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            context.fillText(num, canvas.width / 2 - h, i);
        }
    }

    //Nombre Ejes
    context.font = "15px Arial Bolder";
    context.fillText("X", canvas.width - h, canvas.height / 2 - h);
    context.fillText("Y", canvas.width / 2 + h, h);

}

/**
 * A partir de pendiente y ordenada al origen, grafica la recta sobre el canvas progresivamente (con animación)
 * @method graficar
 * @param {number} m - Pendiente de la recta
 * @param {number} b - Ordenada al Origen de la recta
 */
function graficar(m, b) {
    let canvas = document.getElementById("graficoLineal");
    let context = canvas.getContext("2d");

    let d = 20;
    m = Number(m);
    b = Number(b);

    dibujarCuadriculado();

    context.beginPath();
    let X = -canvas.width / (2 * d)

    let interval = setInterval(function () {
        let posX = canvas.width / 2 + X * d;
        let y = (m * X + b);
        let posY = canvas.height / 2 - y * d;

        context.lineTo(posX, posY);
        context.strokeStyle = "#FF0000";
        context.lineWidth = 1.5;
        context.stroke();

        X++;

        if (X > 20) {
            clearInterval(interval);
        }
    }, 10)

    context.closePath();
}

// posX = 0    X = -20
// posX = width/2  X = 0
// posX = width    X = 20;

// posY = 0    Y = 15
// posY = height/2  Y = 0
// posY = height    Y = -15;