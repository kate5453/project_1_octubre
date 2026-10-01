// import confetti from "https://cdn.skypack.dev/canvas-confetti";

document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box__container');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body'); // Contenedor donde se insertará el contenido dinámico
    const closeModal = document.querySelector('.close');
    const titulo = document.querySelector('.titulo');
    let tries = 2; // Total de intentos

    let indexRegalo = 0;

    // Lista de posibles regalos
    const regalos = [
        { type: 'php', content: 'letter.php' }, // php
        { type: 'php', content: 'luffy.php' },  // carta sorpresa de luffy
    ];

    // Función para obtener un regalo aleatorio y eliminarlo de la lista
    // function obtenerRegaloAleatorio() {
    //     const randomIndex = Math.floor(Math.random() * regalos.length);
    //     const regalo = regalos[randomIndex];
    //     regalos.splice(randomIndex, 1); // Eliminar el regalo de la lista para que no se repita
    //     return regalo;
    // }

    // Función para actualizar el contenido del modal
    function actualizarModal(regalo) {
        modalBody.innerHTML = ''; // Limpiar el contenido previo

        if (regalo.type === 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = regalo.content;
            imgElement.style.width = '100%';
            modalBody.appendChild(imgElement);
        } else if (regalo.type === 'text') {
            const textElement = document.createElement('p');
            textElement.innerText = regalo.content;
            modalBody.appendChild(textElement);
        } else if (regalo.type === 'animation') {
            modalBody.innerHTML = regalo.content; // Insertar directamente la animación
        } else if (regalo.type === 'php') {
            // Cargar el archivo PHP mediante AJAX
            $.ajax({
                url: regalo.content,
                method: 'GET',
                success: function (data) {
                    modalBody.innerHTML = data; // Insertar el contenido del archivo PHP en el modal
                    // inicializarEventos();

                    // Check the loaded PHP file and initialize the appropriate script
                    if (regalo.content === 'ruleta.php') {
                        iniciarRuleta();  // Call ruleta initialization function
                    } else if (regalo.content === 'letter.php') {
                        inicializarEventos();  // Call the letter initialization function
                    }
                },
                error: function () {
                    modalBody.innerHTML = 'Error al cargar el contenido.';
                }
            });
        }
    }

    // Añadir la interacción a cada caja
    boxes.forEach(box => {
        box.addEventListener('click', function() {            
            if (tries > 1) {
                console.log("tries: " + tries);
                
                // Obtener un regalo aleatorio
                // const regalo = obtenerRegaloAleatorio();
                const regalo = regalos[indexRegalo];
                
                // Mostrar el regalo en el modal
                console.log(regalo);
                actualizarModal(regalo);
                modal.style.display = 'block';
                
                // Reducir intentos
                tries--;
                
                // Cambiar el título después de cada intento
                titulo.innerText = `JAJAJA xd ahora si enserio, elegir otra. Te quedan ${tries} intentos`;

                // Eliminar la caja seleccionada
                this.remove();
                indexRegalo++;
            } else {
                console.log("tries: " + tries);

                // Último intento, sin más oportunidades
                // modalBody.innerHTML = '¡Última oportunidad, ya no quedan más regalos!';
                // modal.style.display = 'flex';
                // modal.style.justifyContent = 'center';
                // modal.style.alignItems = 'center';
                // console.log(modal);
                
                titulo.innerText = '¡Has agotado tus oportunidades!';

                // let modalContent = modal.querySelector('.modal-content');
                // console.log(modalContent);
                // modalContent.style.height = '85%';
                // modalContent.style.margin = '0 auto';
                // modalBody.style.padding = 0;
                // console.log(modalBody);

                // Obtener un regalo aleatorio
                // const regalo = obtenerRegaloAleatorio();
                const regalo = regalos[indexRegalo];
                
                // mostrar torta de cumpleaños si es tiempo
                console.log(regalo);
                // actualizarModal(regalo);
                mostrarLuffy(regalo);


                // Reducir intentos
                tries--;
                
                // Eliminar la caja seleccionada
                this.remove();
            }
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});


// Función para mostrar la sorpresa de Luffy
function mostrarLuffy(regalo) {
    // Ocultar las cajas y el título anterior
    const tituloRegalo = document.querySelector('.regalo > .titulo');
    const giftBox = document.querySelector('.gift--box');

    if (tituloRegalo) tituloRegalo.style.display = 'none';
    if (giftBox) giftBox.style.display = 'none';

    // Detener TODAS las músicas que estén sonando antes de entrar a Luffy
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    // También detener cualquier video que pudiera tener audio
    document.querySelectorAll('video').forEach(video => {
        video.pause();
    });

    const regaloSection = document.querySelector('.regalo');
    regaloSection.style.padding = '0';


    // Evitar crear dos contenedores si se llama más de una vez
    const anterior = document.querySelector('.luffy-container');
    if (anterior) anterior.remove();

    const luffyContainer = document.createElement('div');
    luffyContainer.className = 'luffy-container';
    regaloSection.appendChild(luffyContainer);

    $.ajax({
        url: regalo.content,
        method: 'GET',
        cache: false,
        success: function (data) {
            luffyContainer.innerHTML = data;

            // Inicializar la secuencia después de insertar el HTML
            iniciarCartaLuffy();
        },
        error: function (xhr) {
            console.error('Error al cargar Luffy:', xhr.status, xhr.statusText);
            luffyContainer.innerHTML = `
                <div class="luffy-error">
                    <p>Ups... la sorpresa de Luffy no pudo cargarse 😭</p>
                    <small>Revisa que Apache esté activo y que luffy.php exista.</small>
                </div>
            `;
        }
    });
}


// Secuencia de Luffy: intro animada → video → carta + música
function iniciarCartaLuffy() {
    const scene = document.getElementById('luffy-scene');
    const intro = document.getElementById('luffy-intro');
    const content = document.getElementById('luffy-content');
    const letterContainer = document.getElementById('letter-luffy');
    const audio = document.getElementById('luffy-audio');
    const video = document.getElementById('luffy-video');

    if (!scene || !intro || !content || !letterContainer) {
        console.error('No se encontraron los elementos de Luffy.');
        return;
    }

    const letterText = `Querida Mili 💛,

Así como los girasoles siempre buscan la luz para seguir creciendo, espero que nunca olvides todo lo que has crecido tú. 🌻

Sé que estás dándolo todo entre tu trabajo, tu último ciclo y ese último taller de arquitectura que ya debe tenerte al límite 😂. Pero quiero que sepas que estoy muy orgullosa de ti y de todo lo que estás logrando.

Aunque estemos lejos y nuestros caminos estén un poquito en modo 3D2Y, siempre voy a estar aquí apoyándote desde mi isla. 🥹

Ya casi llegas al final de esta aventura, futura arquitecta. ❤️

Y por favor... toma agüita, duerme cuando puedas y no te olvides de disfrutar el camino. 🌻`;

    let typingTimer = null;

    // Reforzar que ninguna otra música continúe sonando
    document.querySelectorAll('audio').forEach(otherAudio => {
        if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
        }
    });

    // El intro dura un momento antes de revelar el contenido
    setTimeout(() => {
        intro.classList.add('luffy-intro-hide');
        content.classList.add('luffy-content-show');

        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {
                // El navegador puede exigir interacción para reproducir.
            });
        }

        if (audio) {
            // audio.currentTime = 0;
            // audio.volume = 0.8;
            // audio.play().catch(() => {
            //     console.log('El navegador bloqueó el autoplay del audio de Luffy.');
            // });
            // cambiarMusica('luffy-audio');
        }

        escribirCartaLuffy(letterContainer, letterText);
    }, 2800);

    function escribirCartaLuffy(container, text) {
        container.innerHTML = '';
        let i = 0;

        function escribir() {
            if (i >= text.length) {
                container.classList.add('letter-finished');
                return;
            }

            const char = text[i];

            if (char === '\n') {
                container.appendChild(document.createElement('br'));
                if (text[i + 1] === '\n') {
                    container.appendChild(document.createElement('br'));
                    i++;
                }
            } else {
                container.appendChild(document.createTextNode(char));
            }

            i++;
            typingTimer = setTimeout(escribir, char === '.' || char === '!' ? 75 : 28);
        }

        escribir();
    }
}

// ---------------------------------------------------------------------
// Función para inicializar los eventos de hover después de cargar el contenido dinámico (Carta)
function inicializarEventos() {
    $(".container__letter")
        .mouseenter(function () {
            // Cambiar el texto y mostrar el gato
            $(".text").html("Has ganado <br> un gato");
            $(".gato").fadeIn();
            
            $(".card").stop().animate(
                {
                    top: "-90px",
                },
                "slow"
            );
            // Disparar confetti
            launchConfetti();
            playCatSound(); // Reproduce el sonido del gatito
        })
        .mouseleave(function () {
            // Restaurar el texto y ocultar el gato
            $(".text").html("Pasa el <br> mouse");
            $(".gato").fadeOut();

            $(".card").stop().animate(
                {
                    top: 0,
                },
                "slow"
            );
        });
}

// Funciones ruleta 
function iniciarRuleta(){
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
        console.log(btnReclamar);
        btnReclamar.style.display = 'block';
    }, 1000); 
});

// Redireccionar al hacer clic en "Reclamar"
// reclamarBtn.addEventListener("click", function() {
//     alert("¡Premio reclamado!");
//     // Aquí puedes redirigir a otra página si deseas:
//     // window.location.href = 'https://www.tu-pagina.com/reclamar';
// });

}

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

function playCatSound() {
    const audio = new Audio('gato.mp3');
    audio.play();
}

function cambiarMusica(audioId) {
    // Detener TODOS los audios de la página
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Reproducir solamente el audio solicitado
    const nuevoAudio = document.getElementById(audioId);

    if (nuevoAudio) {
        nuevoAudio.currentTime = 0;
        nuevoAudio.play().catch(error => {
            console.log("El navegador bloqueó el audio:", error);
        });
    }
}
