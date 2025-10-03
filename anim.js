// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");
var description = this.document.getElementById('description');

lyrics.style.opacity = 0;


var lyricsData = [
  { text: "Mira las estrellas", time: 3 }, // el primero se mantiene igual
  { text: "Mira como brillan por ti 💫", time: 5 },
  { text: "Y por todo lo que haces", time: 11 },
  { text: "Aquí, tus flores amarillas 💛", time: 16 },
  { text: "Yo dudaba", time: 18 },
  { text: "Si esto podría gustarte a ti", time: 20 },
  { text: "Estoy admirando todas las cosas que haces", time: 28 },
  { text: "Aquí, tus flores amarillas 💛", time: 34 },
  { text: "Entonces tomé mi laptop", time: 38 },
  { text: "Oh, me pregunto si estarás libre hoy", time: 44 },
  { text: "Si extraño caminar contigo", time: 50 },
  { text: "Tu sabes, porque tú, sabes que te extraño 💛", time: 58 },
  { text: "Y aunque no te lo digo con palabras", time: 65 },
  { text: "Quiero que sepas, que te quiero tanto", time: 69 },
  { text: "Mantengo tu recuerdo en una fotografía", time: 78 },
  { text: "Y hemos creado recuerdos cada una por nosotras mismas", time: 82 },
  { text: "Donde nuestros ojos nunca se cierran", time: 84 },
  { text: "Nuestros corazones nunca se rompen", time: 88 },
  { text: "Y el tiempo siempre no se detiene", time: 90 },
  { text: "Así que quiero decirte", time: 93 },
  { text: "No conozco persona más elegante al vestir", time: 95 },
  { text: "Te esfuerzas tanto en tu carrera que parece irreal", time: 102 },
  { text: "Me inspiras a seguir", time: 107 },
  { text: "Y cuando te gradúes", time: 112 },
  { text: "Oh, te juro estaré ahí CHILI", time: 114 },
  { text: "Sé que llegarás lejos, y si me permites quiero seguir a tu lado", time: 120 },
  { text: "Cumplir nuestros de sueños de viajar", time: 124 },
  { text: "Hasta que coincidamos un día", time: 128 },
  { text: "Hasta que coincidamos en vacaciones", time: 132 },
  { text: "Hasta que coincidamos te daré tu regalo, 🎁XD", time: 136 },
  { text: "Estamos lejos", time: 140 },
  { text: "Pero mantengo tu recuerdo a través del teléfono", time: 144 },
  { text: "Hasta que coincidamos un día", time: 148 }
];



// Animar las letras
function updateLyrics() {
  // Asegurarse de que se está sincronizando con el audio correcto
  var audio = document.querySelector('audio[src="./audio/yellowPhotograph_mashup.mp3"]'); 
  if (!audio) return;  // Si el audio no está presente, salir de la función
  
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;

    // Si el lyrics tiene texto, ocultar description
    if (lyrics.innerHTML !== "") {
      console.log(description);
      description.style.animation =
        "fadeOut 1s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
      setTimeout(function(){
        description.style.display = "none"; //Borramos la descripcion
      }, 800);
      ocultarTitulo(); //Ocultamos el titulo inicial
    }
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    // lyrics.style.opacity = 0;
    lyrics.innerHTML = " ";
  }
}

setInterval(updateLyrics, 2000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector("#titulo");
  titulo.style.animation =
    "fadeOut 1s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.opacity = 0;
  }, 2000); // Espera 3 segundos antes de ocultar completamente
}
