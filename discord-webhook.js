const DISCORD_WEBHOOK_URL = 'REEMPLAZA_ESTA_URL_POR_TU_WEBHOOK_DE_DISCORD';

async function enviarDatosAlDiscord(mensaje) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes('REEMPLAZA_ESTA_URL_POR_TU_WEBHOOK_DE_DISCORD')) {
        console.error('No se configuró la URL del webhook de Discord.');
        return { success: false, message: 'No se configuró la URL del webhook de Discord.' };
    }

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: mensaje })
        });

        if (!response.ok) {
            throw new Error('No se pudo enviar el mensaje al webhook de Discord.');
        }

        return { success: true, message: 'Datos enviados al webhook de Discord.' };
    } catch (error) {
        console.error('Error al enviar datos a Discord:', error);
        return { success: false, message: error.message };
    }
}

window.enviarDatosAlDiscord = enviarDatosAlDiscord;
