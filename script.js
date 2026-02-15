tailwind.config = {
    theme: {
        extend: {
            colors: {
                oriaBlack: '#0a0a0a',      // Fondo casi negro
                oriaDark: '#121212',       // Fondo secundario
                oriaGray: '#1f1f1f',       // Tarjetas
                oriaNeon: '#DFFF00',       // Amarillo Neón (Ajustado a tu logo)
                oriaText: '#e5e5e5',       // Blanco suave para texto
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.innerHTML = "Enviando...";
            result.classList.remove('hidden', 'text-red-500', 'text-green-500');
            result.classList.add('text-gray-400', 'block');

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = "¡Mensaje recibido! Te contactaremos pronto.";
                        result.classList.remove('text-gray-400');
                        result.classList.add('text-green-500');
                        form.reset();
                        
                        // Ocultar mensaje después de 5 segundos
                        setTimeout(() => {
                            result.classList.add('hidden');
                        }, 5000);
                    } else {
                        console.log(response);
                        result.innerHTML = json.message || "Algo salió mal. Intenta de nuevo.";
                        result.classList.remove('text-gray-400');
                        result.classList.add('text-red-500');
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Error de conexión. Verifica tu internet.";
                    result.classList.remove('text-gray-400');
                    result.classList.add('text-red-500');
                });
        });
    }
});
