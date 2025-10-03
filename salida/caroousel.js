let currentSlide = 0;
const videos = document.querySelectorAll('.carousel video');
const totalSlides = videos.length;

function showSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides; // Evita salir de los límites
  const offset = -currentSlide * 100; // Desplaza el carrusel
  document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;

  // Pausa todos los videos
  videos.forEach((video, i) => {
    if (i === currentSlide) {
      video.play(); // Reproduce el video que se muestra
    } else {
      video.pause(); // Pausa los demás videos
      video.currentTime = 0; // Reinicia el tiempo de los videos que no se ven
    }
  });
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}


// Esperar interacción del usuario para permitir reproducción
document.addEventListener('click', () => {
    // videos[currentSlide].play(); // Una vez que interactúe, permite la reproducción

    const currentVideo = videos[currentSlide];
    currentVideo.muted = false; // Desactivar mute para habilitar el sonido
    currentVideo.play(); // Reproducir el video actual
});


// Cuando el video actual termine, pasar al siguiente
videos.forEach((video) => {
    video.addEventListener('ended', () => {
      moveSlide(1); // Cambiar al siguiente video cuando el actual termine
    });
  });

// Llama a la función para mostrar el primer video correctamente al cargar la página
showSlide(0);


// Selection button functionality
// Ocultar los botones de "SI" y "NO" al cargar la página
const buttons = document.querySelector('.btn');
buttons.classList.add('hidden');


const selectButton = document.getElementById('select-point');
const customText = document.getElementById('custom-text');

// Texto por defecto cuando se carga la página
customText.innerText = "Elige un point";


selectButton.addEventListener('click', () => {
    const activeTikTok = videos[currentSlide];
    const tiktokName = activeTikTok.getAttribute('data-name');
    const tiktokSrc = activeTikTok.getAttribute('src'); // Obtener la URL del video
    
    // Guardamos la información del video seleccionado en LocalStorage
    localStorage.setItem('selectedVideo', tiktokSrc);
    localStorage.setItem('selectedName', tiktokName);


    // customText.innerText = `Vamos al ${tiktokName}, dime que SI.`;
    customText.innerHTML = `Vamos a <strong>${tiktokName}</strong>, dime que SI.`;

    // Mostrar los botones de "SI" y "NO" después de seleccionar un point
    buttons.classList.remove('hidden');
});