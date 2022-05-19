/**
 * Verifica si el valor ingresado en el input es un número y además que la pendiente sea ≠0. Caso contrario, lo vacía.
 Además, reemplaza el uso de "," por "." para el separador de decimales y redondea el valor ingresado a dos cifras
 decimales.
 * @method verify
 * @param {string} id - id del input modificado
 */
function verify(id) {
    let valor = document.getElementById(id).value;

    if (valor.includes(',')) {
        valor = valor.replace(',', '.');

        document.getElementById(id).value = valor;
    }

    if (isNaN(valor)) {
        alert("Ingrese un Número");
        document.getElementById(id).value = "";
    } else {
        document.getElementById(id).value = round(valor);
    }

    if (id === "terminoLineal" && valor == 0) {
        alert("La pendiente debe ser distinta de 0");
        document.getElementById(id).value = "";
    }
}

/**
 * Redondea el numero a dos cifras decimales
 * @method round
 * @param {number} num - número a redondear
 * @return número redondeado a dos cifras decimales
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

    let angulo = round(Math.atan(pendiente) * 180 / Math.PI);

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

    document.getElementById("Rx").innerHTML = '(' + round(-tIndependiente / tLineal);
}

/**
 * Determina el tipo de función lineal (Creciente o Decreciente) a partir de su pendiente
 * @method determinarTipo
 */
function determinarTipo() {
    let pendiente = Number(document.getElementById("terminoLineal").value);

    if (pendiente > 0) {
        document.getElementById("tipo").innerHTML = "Creciente";
    } else {
        document.getElementById("tipo").innerHTML = "Decreciente";
    }
}