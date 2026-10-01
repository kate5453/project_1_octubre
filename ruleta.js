// var ruleta = document.getElementById("ruleta");
//         var puntero = document.getElementById("puntero");
//         var resultado = document.getElementById("resultado");
//         var reclamarBtn = document.getElementById("reclamar-btn");
//         let gira = 0;
//         let giraDos = 0; 

//         // Lista de premios
//         let premios = ['SALIMOS YO PAGO', 'TE COMPRO MATERIALES', 'VIAJE A SATURNO'];
//         let premioSeguro = 'SALIMOS YO PAGO'; // El premio que siempre debe salir


// // Seleccionamos todos los elementos <p> dentro de .roulette-section-container
// var textosSecciones = document.querySelectorAll('.roulette-section-container > p');


//         // Rueda la ruleta
//         puntero.addEventListener("mousedown", function() {
//             // Ocultar todos los textos de las secciones al cargar la página
//             textosSecciones.forEach(function(texto) {
//                 texto.textContent = '';
//             });

//             gira = 1200 + Math.random() * 1200;  // Rango de 1200 a 2400 grados
//             puntero.style.pointerEvents = 'none';
//             ruleta.style.transition = 'all 10s ease-out';
//             ruleta.style.transform = `rotate(${gira}deg)`; 
//         });

//         // Fin de la rodada
//         ruleta.addEventListener("transitionend", function() {
//             puntero.style.pointerEvents = 'auto';
//             ruleta.style.transition = 'none';
//             giraDos = gira % 360;  // Ajuste para la rotación final
//             ruleta.style.transform = `rotate(${giraDos}deg)`;


//             // Limpiar textos nuevamente después del giro
//     textosSecciones.forEach(function(texto) {
//         texto.textContent = '';
//     });

//     // ** Forzar siempre que salga el premio "SALIMOS YO PAGO" **
//     let indicePremio = premios.indexOf("SALIMOS YO PAGO"); // Índice del premio que siempre debe ganar

//     // Determinar la sección ganadora
//     let totalSecciones = premios.length; // Número de secciones
//     let gradosPorSeccion = 360 / totalSecciones; // Grados por sección (30 en este caso)

//     console.log(gradosPorSeccion);

//     console.log(indicePremio);
//     // Calcular el ángulo exacto donde debe caer para "SALIMOS YO PAGO"
//     let anguloGanador = indicePremio * gradosPorSeccion - 3;
//     console.log(anguloGanador);
    
//     // Ajustar el ángulo final para que siempre caiga en "SALIMOS YO PAGO"
//     ruleta.style.transform = `rotate(${anguloGanador}deg)`;

//     // Mostrar el texto correspondiente al premio "SALIMOS YO PAGO"
//     textosSecciones[indicePremio].textContent = premios[indicePremio];

//     // Calcular en qué sección cayó (ajuste porque el 0 grados está en la parte superior)
//     // console.log(gira);
//     // console.log(giraDos);
//     // let seccionGanadora = Math.floor((360 - giraDos) / gradosPorSeccion) % totalSecciones;

//     // console.log(seccionGanadora);

//     // Mostrar el texto correspondiente al premio ganador
//     // textosSecciones[seccionGanadora].textContent = premios[seccionGanadora];

//             // Mostrar el resultado (siempre el premio seguro)
//             resultado.textContent = `¡Ganaste: ${premioSeguro}!`;
//             resultado.style.display = 'block';
//             reclamarBtn.style.display = 'block';
//         });

//         // Redireccionar al hacer clic en "Reclamar"
//         reclamarBtn.addEventListener("click", function() {
//             alert("¡Premio reclamado!");
//             // Aquí puedes redirigir a otra página si deseas:
//             // window.location.href = 'https://www.tu-pagina.com/reclamar';
//         });
import confetti from "https://cdn.skypack.dev/canvas-confetti";

var ruleta = document.getElementById("ruleta");
var puntero = document.getElementById("puntero");
var resultado = document.getElementById("resultado");
var reclamarBtn = document.getElementById("reclamar-btn");
var btnReclamar = document.getElementById("btn-reclamar");


let gira = 0;
let giraTotal = 0;

// Lista de premios
let premios = ['SALIMOS YO PAGO', 'TE COMPRO MATERIALES', 'VIAJE A SATURNO', 'COMPRAR HELADO', 'TOMA UN DESCANSO', 'HUEVO EN LA CABEZA', 'SALIMOS YO PAGO', 'NUEVA LAPTOP', '$1000.00 USD', 'SNACK BOX', 'COMPRA M&C'];

// Seleccionamos todos los elementos <p> dentro de .roulette-section-container
var textosSecciones = document.querySelectorAll('.roulette-section-container p');


// Ángulo por sección (360 grados / número de secciones)
let gradosPorSeccion = 360 / premios.length;

// Índice del premio que siempre queremos que gane (SALIMOS YO PAGO)
let indicePremio = premios.indexOf("SALIMOS YO PAGO");

// Calculamos el ángulo donde está la sección ganadora
let anguloGanador = indicePremio * gradosPorSeccion;

// Rueda la ruleta
puntero.addEventListener("mousedown", function() {
    // Ocultar todos los textos de las secciones al cargar la página
    textosSecciones.forEach(function(texto) {
        texto.textContent = '';
    });

    // Generamos un giro aleatorio pero aseguramos que caiga en el premio deseado
    let vueltasCompletas = Math.floor(Math.random() * 3) + 5; // Da entre 5 y 7 vueltas completas
    giraTotal = (vueltasCompletas * 360) + anguloGanador; // Total de grados, terminando en el ángulo ganador

    puntero.style.pointerEvents = 'none';
    ruleta.style.transition = 'all 5s ease-out'; // 5 segundos de giro suave
    ruleta.style.transform = `rotate(${giraTotal}deg)`; 
});

// Fin de la rodada
ruleta.addEventListener("transitionend", function() {
    puntero.style.pointerEvents = 'auto';
    ruleta.style.transition = 'none';

    // Limpiar textos nuevamente después del giro
    textosSecciones.forEach(function(texto) {
        texto.textContent = '';
        texto.parentNode.classList.remove('seccion-ganadora'); // Remueve el color de secciones anteriores
    });

    // Mostrar el texto correspondiente al premio "SALIMOS YO PAGO"
    textosSecciones[indicePremio].textContent = premios[indicePremio];
    
    // Añadir clase especial para cambiar el color de fondo de la sección ganadora
    textosSecciones[indicePremio].parentNode.style.backgroundColor = "#0084ff";
    textosSecciones[indicePremio].parentNode.style.transition = 'background-color 0.5s ease';

    // Disparar confetti
    launchConfetti();


    setTimeout(() => {
        // Mostrar el resultado en el div resultado
        resultado.textContent = `¡Ganaste: ${premios[indicePremio]}!`;
        resultado.style.display = 'block';
        resultado.style.opacity = '1';
        reclamarBtn.style.display = 'block';
        btnReclamar.style.display = 'block';
    }, 1000); 
});

// Redireccionar al hacer clic en "Reclamar"
// reclamarBtn.addEventListener("click", function() {
//     alert("¡Premio reclamado!");
//     // Aquí puedes redirigir a otra página si deseas:
//     // window.location.href = 'https://www.tu-pagina.com/reclamar';
// });



// Confetti
function launchConfetti() {
    const count = 200; // Cantidad de confeti
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}