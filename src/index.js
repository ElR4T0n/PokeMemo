let turnos = 0;
let $primerCuadro = null;
const $tablero = document.querySelector("#tablero");
const $cuadros = document.querySelectorAll(".cuadro");
const $mensajeFinJuego = document.querySelector("#fin-juego");



function configurarJuego() {
    const imgBase = ["bidoof", "caterpie", "darumaka", "ditto", "magikarp", "ninetales", "silveon", "sneasel"];
    const imgRepetidos = imgBase.concat(imgBase)
    configurarCuadros($cuadros, imgRepetidos)
    manejarEventos($tablero);
}

function configurarCuadros($cuadros, imagenes) {
    const imgRandom = imagenes.sort(function () {
        return 0.5 - Math.random();
    });


    imgRandom.forEach(function (imagen, i) {
        $cuadros[i].classList.add(imagen);
        $cuadros[i].style.backgroundImage = "url(imagenes/pball.png)";
    });
}

function manejarEventos($tablero) {
    $tablero.onclick = function (e) {
        const $elemento = e.target;
        if ($elemento.classList.contains("cuadro")) {
            manejarClickCuadro($elemento)
        }
    }
};

function manejarClickCuadro($cuadroActual) {
    
    mostrarCuadro($cuadroActual);
    if ($cuadroActual.classList.contains("completo")) {
        return;
    }
    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;
    } else {
        if ($primerCuadro === $cuadroActual) {
            return
        }
        turnos++;
        if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
            eliminarCuadro($primerCuadro)
            eliminarCuadro($cuadroActual)
        } else {
            ocultarCuadro($primerCuadro)
            ocultarCuadro($cuadroActual)
        }
        $primerCuadro = null;
    }
}

function cuadrosSonIguales($cuadro1, $cuadro2) {
    return $cuadro1.classList[2] === $cuadro2.classList[2];
}

function mostrarCuadro($cuadro, clase) {
    clase = $cuadro.classList[2]
    $cuadro.style.backgroundImage = `url(imagenes/${clase}.png)`
}

function ocultarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.style.backgroundImage = "url(imagenes/pball.png)"
    }, 500);
}


function eliminarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.style.backgroundImage = "url(imagenes/poke2.png)"
        $cuadro.classList.add("completo");
        evaluarFinJuego();
    }, 500)
}


function evaluarFinJuego() {
    if (document.querySelectorAll(".completo").length === 16) {
        $tablero.style.display = "none";
        document.querySelector(".title").textContent = "Congratulations"
        $mensajeFinJuego.querySelector("strong").textContent = turnos.toString();
        $mensajeFinJuego.style.display = "block"
    }
}


configurarJuego();


