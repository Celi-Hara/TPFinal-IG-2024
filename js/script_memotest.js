//Defino variables para cambiar la visualización de las distintas secciones
const selectorNivel = document.querySelector('.selector-nivel');
selectorNivel.style.display = 'block';
const areaJuego = document.querySelector('.area-juego');
areaJuego.style.display = 'block';
const reinicioJuego = document.querySelector('.reinicio-juego');
reinicioJuego.style.display = 'none';
const resultadoJuego = document.querySelector('.resultado-juego');
resultadoJuego.style.display = 'none';

//Defino el array de las imágenes de las cartas
let mazoCartas = [];
let identificadorCarta = 0;
//Defino el objeto default de una imagen
let carta = {
    nombre: `memotest${identificadorCarta}`,
    valor: identificadorCarta
}
//Este es el conjunto de cartas que se jugarán
let mazoJuego = [];
let nivelElegido;

//Creo el mazo completo de todas las cartas
function crearMazo() {
    mazoCartas = []
    for (let i = 0; i < 18; i++) {
        identificadorCarta++;
        carta = {
            nombre: `memotest${identificadorCarta}`,
            valor: identificadorCarta
        }
        mazoCartas.push(carta);
    }
    identificadorCarta = 0;
    console.log("original", mazoCartas);
}

//Función para mezclar el mazo
function mezclarMazo(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    console.log(mazo);
}

//Función para crear el mazo final que se jugará
function crearMazoJuego(nivel) {
    // Limito la cantidad de cartas según nivel
    mazoCartas = mazoCartas.slice(0, nivel);
    console.log("cortado", mazoCartas);

    mazoJuego = []; //Vacío el array de juegos pasados
    mazoJuego = mazoCartas; //Agrego las cartas seleccionadas según nivel
    mazoJuego = mazoJuego.concat(mazoCartas); //Duplico el mazo
    console.log("duplicado", mazoJuego);

    //Vuelvo a mezclar el mazo para obtener el que se jugará finalmente
    mezclarMazo(mazoJuego);
    console.log("final", mazoJuego);
}

//Selecciono el nivel del juego
selectorNivel.addEventListener("click", function (e) {
    e.preventDefault();
    nivelElegido = e.target.id;
    console.log(nivelElegido);
    comenzarJuego(nivelElegido);
})

//Función para iniciar el juego
function comenzarJuego(nivel) {
    crearMazo();
    mezclarMazo(mazoCartas);

    //Asigna el valor del nivel elegido según el id del botón clickeado
    if (nivel === 'inicial') {
        crearMazoJuego(8);
        areaJuego.classList.add('inicial');
    } else if (nivel === 'intermedio') {
        crearMazoJuego(10);
        areaJuego.classList.add('intermedio');
    } else if (nivel === 'avanzado') {
        crearMazoJuego(14);
    }

    selectorNivel.style.display = 'none';
    areaJuego.style.display = 'block';
    mostrarCartas(mazoJuego);
}


//Función para cargar las cartas a mostrar
function mostrarCartas(mazoJuego) {
    for (i = 0; i < mazoJuego.length; i++) {
        let cartaClickeable = document.createElement('div');
        cartaClickeable.classList.add("card");
        cartaClickeable.classList.add("box-shadow");
        cartaClickeable.dataset.valor = mazoJuego[i].valor; //Se agrega valor de la carta
        cartaClickeable.innerHTML = `<div class="card-front">
                                            <img src="img/memotest/memotestback.jpg" alt="Frente de la carta">
                                        </div>
                                        <div class="card-back">
                                            <img src="img/memotest/memotest${mazoJuego[i].valor}.jpg" alt="Reverso de la carta">
                                        </div>`;
        areaJuego.append(cartaClickeable);
    }
}

//Defino variables necesarias para verificar si dos cartas son iguales
let primeraCarta;
let segundaCarta;
let valorPrimeraCarta = null;
let valorSegunaCarta = null;
let contadorParejas = 0;
let contadorIntentos = 0;
let comienzoJuego = false;
let startTime;
let endTime;

//Función que se dispara al clickear una carta
areaJuego.addEventListener("click", function (e) {
    e.preventDefault();
    let tarjeta = e.target.closest('.card');
    if (tarjeta) {
        tarjeta.classList.toggle('flipped');
        let valorCarta = tarjeta.dataset.valor;
        console.log(valorCarta);

        if (valorPrimeraCarta === null) {
            if (comienzoJuego === false) {
                comienzoJuego = true;
                startTime = new Date();
            }
            valorPrimeraCarta = valorCarta;
            tarjeta.classList.add('disabled');
            primeraCarta = tarjeta;
        } else if (valorSegunaCarta === null) {
            valorSegunaCarta = valorCarta;
            tarjeta.classList.add('disabled');
            segundaCarta = tarjeta;
            verificarCartas();
        }
    }
});

//Función para verificar si las cartas clickeadas son iguales
function verificarCartas() {
    contadorIntentos++;
    if (valorPrimeraCarta === valorSegunaCarta) {
        setTimeout(() => { //El alert salta con un delay para que se vea el efecto de la carta volteada
            alert("¡Bien hecho! Has encontrado una pareja");
            contadorParejas++;
            valorPrimeraCarta = null;
            valorSegunaCarta = null;
            verificarFinJuego();
        }, 1000);
    } else {
        setTimeout(() => { //El alert salta con un delay para que se vea el efecto de la carta volteada
            alert("¡Ups! No eran una pareja");
            valorPrimeraCarta = null;
            valorSegunaCarta = null;
            primeraCarta.classList.remove('disabled');
            primeraCarta.classList.toggle('flipped');
            segundaCarta.classList.remove('disabled');
            segundaCarta.classList.toggle('flipped');
        }, 1000);
    }
}

//Función para verificar si el juego ha terminado
function verificarFinJuego() {
    if (contadorParejas === mazoJuego.length / 2) {
        endTime = new Date();
        let tiempoTranscurrido = endTime - startTime;
        reinicioJuego.style.display = 'block';
        if (tiempoTranscurrido < 60000) {
            resultadoJuego.innerHTML = `¡Felicidades! Has conseguido encontrar todas las parejas en ${contadorIntentos} intentos y ${Math.floor(tiempoTranscurrido/1000)} segundos`;
        } else if (tiempoTranscurrido > 60000 && tiempoTranscurrido < 120000) {
            resultadoJuego.innerHTML = `¡Felicidades! Has conseguido encontrar todas las parejas en ${contadorIntentos} intentos y ${Math.floor(tiempoTranscurrido/60000)} minuto y ${Math.floor((tiempoTranscurrido % 60000) / 1000)} segundos`;
        } else {
            resultadoJuego.innerHTML = `¡Felicidades! Has conseguido encontrar todas las parejas en ${contadorIntentos} intentos y ${Math.floor(tiempoTranscurrido/60000)} minutos y ${Math.floor((tiempoTranscurrido % 60000) / 1000)} segundos`;
        }
        resultadoJuego.style.display = 'block';
    }
}

//Opciones de reinicio
reinicioJuego.addEventListener("click", function (e) {
    e.preventDefault();
    let opcionReinicio = e.target.id;

    if (opcionReinicio === 'reiniciar') {
        reiniciar();
        comenzarJuego(nivelElegido);
        reinicioJuego.style.display = 'none';
    } else if (opcionReinicio === 'nuevonivel') {
        reiniciar();
        selectorNivel.style.display = 'block';
        areaJuego.style.display = 'none';
        areaJuego.classList.remove('inicial');
        areaJuego.classList.remove('intermedio');
        reinicioJuego.style.display = 'none';
    }
});

//Función para reiniciar el juego
function reiniciar() {
    primeraCarta = null;
    segundaCarta = null;
    valorPrimeraCarta = null;
    valorSegunaCarta = null;
    contadorParejas = 0;
    contadorIntentos = 0;
    comienzoJuego = false;
    startTime = null;
    endTime = null;
    areaJuego.innerHTML = '';
}
