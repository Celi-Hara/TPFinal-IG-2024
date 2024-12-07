// Selector de las películas según director
const peliculasTodos = document.querySelectorAll('.todos');
const peliculasMiyazaki = document.querySelectorAll('.miyazaki');
const peliculasTakahata = document.querySelectorAll('.takahata');
const peliculasOtros = document.querySelectorAll('.otros');


// Función para hacer loop dentro de cada nodo para motrar las películas
function mostrarPelicula(nodo) {
    nodo.forEach(pelicula => {
        pelicula.style.display = 'block';
    });
}

// Función para hacer loop dentro de cada nodo para ocultar las películas
function ocultarPelicula() {
    peliculasTodos.forEach(pelicula => {
        pelicula.style.display = 'none';
    });
}

// Evento que se ejecuta al cargar la página, para que muestre todas las películas por default
document.addEventListener("DOMContentLoaded", function () {
    mostrarPelicula(peliculasTodos);
});

// Variable para seleccionar los eventos a mostrar
let director = "todos"; // Por default al cargar la página, muestra todas las películas
let dropdown = document.getElementById("dropdownMenuLink"); // Toma el elemento por su id
dropdown.addEventListener("change", function () { // Cada vez que cambia, vuelve a tomar el valor
    director = dropdown.value;
    ocultarPelicula(peliculasTodos); // Oculta primero todas las películas

    console.log(director);
    // Y luego muestra solamente la seleccionada
    if (director == "miyazaki") {
        mostrarPelicula(peliculasMiyazaki);
    } else if (director == "takahata") {
        mostrarPelicula(peliculasTakahata);
    } else if (director == "otros") {
        mostrarPelicula(peliculasOtros);
    } else {
        mostrarPelicula(peliculasTodos);
    }
});