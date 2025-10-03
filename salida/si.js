// Recuperar el video y el nombre del LocalStorage
const selectedVideoSrc = localStorage.getItem('selectedVideo');
const selectedName = localStorage.getItem('selectedName');
const opciones = document.querySelector('.opciones');
const confirmar = document.querySelector('.btn');

opciones.style.display = 'none';
confirmar.style.display = 'none';


// Mostrar el video seleccionado
if (selectedVideoSrc) {
    const videoElement = document.getElementById('selected-video');
    videoElement.src = selectedVideoSrc;
    videoElement.autoplay = true;
    videoElement.muted = false; // Si deseas que tenga sonido al reproducir
    
    // Mostrar el mensaje personalizado
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = `Es la mejor desición que pudiste tomar!🥰 <br><br> Vamos a ${selectedName}`;
}

// Mostrar el div "opciones" después de 3 segundos (3000 ms)
setTimeout(function () {
    opciones.style.display = 'flex';
    confirmar.style.display = 'block';

    opciones.style.animation = 'aparecer 1s ease-in-out'
    confirmar.style.animation = 'aparecer 1s ease-in-out'
}, 1000);

document.addEventListener('click', () => {
    const videoElement = document.getElementById('selected-video');
    videoElement.muted = false; // Habilitar sonido
    videoElement.play(); // Reproduce el video cuando el usuario haga clic en la página
});
