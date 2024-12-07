//Defino variables para cambiar la visualización de las distintas secciones
const selectorNivel = document.querySelector('.selector-nivel');
selectorNivel.style.display = 'block';
const areaJuego = document.querySelector('.area-juego');
areaJuego.style.display = 'none';



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

    mazoJuego = []; //Vacío el array de juegos pasador
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
        crearMazoJuego(12);
    } else if (nivelElegido === 'avanzado') {
        crearMazoJuego(18);
    }

    selectorNivel.style.display = 'none';
    areaJuego.style.display = 'block';
})