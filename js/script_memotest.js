//Defino variables para cambiar la visualización de las distintas secciones
const selectorNivel = document.querySelector('.selector-nivel');
selectorNivel.style.display = 'block';
const areaJuego = document.querySelector('.area-juego');
areaJuego.style.display = 'block';

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
    let nivelElegido = e.target.id;
    console.log(nivelElegido);
    crearMazo();
    mezclarMazo(mazoCartas);

    //Asigna el valor del nivel elegido según el id del botón clickeado
    if (nivelElegido === 'inicial') {
        crearMazoJuego(8);
    } else if (nivelElegido === 'intermedio') {
        crearMazoJuego(10);
    } else if (nivelElegido === 'avanzado') {
        crearMazoJuego(14);
    }

    selectorNivel.style.display = 'none';
    areaJuego.style.display = 'block';
    mostrarCartas(mazoJuego);
})


//Función para cargar las cartas a mostrar
function mostrarCartas(mazoJuego) {
    for (i = 0; i < mazoJuego.length; i++) {
        let cartaClickeable = document.createElement('div');
        cartaClickeable.classList.add("card");
        cartaClickeable.classList.add("box-shadow");
        cartaClickeable.dataset.valor = mazoJuego[i].valor; //Se agrega valor de la carta
        cartaClickeable.innerHTML = `<div class="card-front">
                                            <img src="img/memotest/memotest1.jpg" alt="Frente de la carta">
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

//Función que se dispara al clickear una carta
areaJuego.addEventListener("click", function (e) {
    e.preventDefault();
    let tarjeta = e.target.closest('.card');
    if (tarjeta) {
        tarjeta.classList.toggle('flipped');
        let valorCarta = tarjeta.dataset.valor;
        console.log(valorCarta);

        if (valorPrimeraCarta === null) {
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
    if (valorPrimeraCarta === valorSegunaCarta) {
        setTimeout(() => {
            alert("¡Bien hecho! Has encontrado una pareja");
            contadorParejas++;
            valorPrimeraCarta = null;
            valorSegunaCarta = null;
            verificarFinJuego();
        }, 1000);
    } else {
        setTimeout(() => {
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
        alert("¡Felicidades! Has encontrado todas las parejas");
    }
}
