// Capturo el formulario como constante
const formulario = document.querySelector("form");

// Activo la validación cuando el usuario clickea en "enviar"
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evito que se envíe del formulario sin validar

    // Si se ingresaron espacios en blanco al principio o finalse eliminan, así si solo se pusieron espacios, salta la alerta de que está vacio
    const nombre = formulario.elements["nombre"].value.trim(); 
    const email = formulario.elements["email"].value.trim();
    const mensaje = formulario.elements["mensaje"].value.trim();

    // Expresión regular para validar el formato del correo electrónico
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verifica que no haya campos vacíos
    if (nombre === "") {
        alert("Por favor, ingrese su nombre");
        return;
    }
    if (email === "") {
        alert("Por favor, ingrese su dirección de correo electrónico");
        return;
    }
    if (!emailReg.test(email)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida");
        return;
    }
    if (mensaje === "") {
        alert("Por favor, escriba el mensaje que desea enviar");
        return;
    }

    // Si todo es válido, envía el formulario
    formulario.submit();
});