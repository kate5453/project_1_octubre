document.addEventListener("DOMContentLoaded", () => {
  const letterText = `Querida Mili 💛,\n
Sé que este regalo llega un poquito tarde, pero con todo mi cariño.\n
Cada línea, cada color y cada detalle lo hice pensando en ti.\n
Gracias por seguir siendo parte de mi vida, por tu esfuerzo, tu luz y tu forma única de ser.\n
Espero que esta pequeña sorpresa te saque una sonrisa hoy. 🎂✨\n
Feliz cumpleaños, a la distancia pero con todo el corazón 💖`;

  const letterContainer = document.getElementById("letter-luffy");
  const audio = document.getElementById("luffy-audio");

  let i = 0;

  function typeLetter() {
    if (i < letterText.length) {
      const char = letterText[i];
      letterContainer.innerHTML +=
        char === "\n" ? "<br>" : char;
      i++;
      setTimeout(typeLetter, 50); // velocidad de tipeo
    }
  }

  // Reproducir música y empezar el tipeo con una pequeña demora
  setTimeout(() => {
    audio.play();
    typeLetter();
  }, 1500);
});