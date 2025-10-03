import confetti from "https://cdn.skypack.dev/canvas-confetti";

let questionCount = 0;
const maxQuestions = 1;

// JSON de preguntas y respuestas
const questionAnswerList = [
    { question: "¿Qué eres?", answer: "Soy un chatbot creado especialmente con cariño y aún en fase de pruebas 🤖✨." },
    { question: "¿Tienes algún talento especial?", answer: "Bueno, ¡intento ser lo más simpático y entretenido posible! 🥳." }
];


// Respuestas extra (después de elegir cualquier opción)
const extraAnswers = [
    "Además, tengo una sorpresa especial preparada para ti... 🎁",
    "Espero que te guste lo que viene a continuación 💖"
];

// Almacenar preguntas ya hechas
let usedQuestions = [];

// Mostrar la primera opción de preguntas cuando la página se carga
window.onload = async function() {
     // Primer mensaje con efecto de escritura
    await addMessage("¡Hola! Soy un prototipo de chatbot en pruebas 🎉. Estoy aquí para responder a preguntas básicas de testeo, así que mis habilidades aún son limitadas ¡Ayúdame a mejorar con este pequeño test! 😄.", 'bot');
    // Mostrar opciones
    showQuestionOptions();
};

function showQuestionOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Filtrar preguntas no usadas
    const availableQuestions = questionAnswerList.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) return;  // Si ya no quedan preguntas, detener

    // Seleccionar aleatoriamente 2 preguntas
    const randomQuestions = getRandomQuestions(availableQuestions, 2);
    randomQuestions.forEach(q => {
        const optionButton = document.createElement('button');
        optionButton.textContent = q.question;
        optionButton.className = 'option-button';
        optionButton.addEventListener('click', () => handleUserChoice(q));
        optionsContainer.appendChild(optionButton);
    });
}

async function handleUserChoice(selectedQA) {
    const { question, answer } = selectedQA;
    addMessage(question, 'user');  // Mostrar pregunta del usuario

    // Guardar la pregunta como usada
    usedQuestions.push(question);
    questionCount++;

    // Ocultar opciones inmediatamente
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Mostrar la respuesta del bot después de un pequeño retraso
    // setTimeout(async () => {
    //     await addMessage(answer, 'bot');     // Mostrar respuesta del bot esperar a la animacion termine

    //     if (questionCount < maxQuestions) {
    //         showQuestionOptions(); // Mostrar nuevas opciones
    //         // setTimeout(() => {
    //         // }, 1000);
    //     } else {
    //         setTimeout(() => {
    //             showSurprise(); // Mostrar sorpresa después de la última pregunta
    //         }, 2000);
    //     }
    // }, 1000); // Retraso para mostrar la respuesta del bot


    // Respuesta principal
    await addMessage(answer, 'bot');

    // Espera 0.7s antes de la siguiente
    await new Promise(resolve => setTimeout(resolve, 700));
    await addMessage(extraAnswers[0], 'bot');

    // Otra pausa
    await new Promise(resolve => setTimeout(resolve, 700));
    await addMessage(extraAnswers[1], 'bot');

    // Después de todas → sorpresa 🎉
    setTimeout(() => {
        showSurprise();
    }, 1000);
}

function getRandomQuestions(availableQuestions, count=2) {
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function addMessage(text, sender) {
    return new Promise((resolve) => { // Iniciar Promise para la animación de escritura
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        const typingSpan = document.createElement('span');
        typingSpan.textContent = '';
        messageDiv.appendChild(typingSpan);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        if (sender === 'bot') {
            let index = 0;
            const typingInterval = setInterval(() => {
                if (index < text.length) {
                    typingSpan.textContent += text[index];
                    index++;
                    chatBox.scrollTop = chatBox.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                    resolve(); // Resolver la promesa al terminar la animación
                }
            }, 40); // Ajusta la velocidad según prefieras
        } else {
            typingSpan.textContent = text;
            resolve(); // Resolver inmediatamente si es el usuario
        }
    });
}


function showSurprise() {
    const chatBox = document.getElementById('chat-box');
    addMessage("¡Mentira! 🎉 ¡Sorpresa! ¡Feliz Cumpleaños! 🎈", 'bot');

    // Pausar cualquier otro audio en la página antes de reproducir el nuevo
    const previousAudio = document.querySelector('audio');
    if (previousAudio) {
        previousAudio.pause();  // Pausar la música de flores.php
    }

    // Sonido de cumpleaños
    const audio = new Audio('./audio/music.mp3');
    audio.play();

    // Cambiar el contenedor de chat para permitir el scroll y dejar de ser fixed
    const chatContainer = document.querySelector('.chat');
    chatContainer.style.position = 'relative';  // Dejar de estar fijo
    document.body.style.overflow = 'auto';    // Permitir scroll en la página

    // Esperar 1 segundo antes de lanzar el confeti
    let confettiInterval = setInterval(() => {
        const count = 300; // Aumenta la cantidad de confeti
        const defaults = {
            origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        // Confeti desde la izquierda
        fire(0.5, {
            spread: 70,
            startVelocity: 55,
            origin: { x: 0, y: 0.7 }, // Salida desde el lado izquierdo
        });

        // Confeti desde la derecha
        fire(0.5, {
            spread: 70,
            startVelocity: 55,
            origin: { x: 1, y: 0.7 }, // Salida desde el lado derecho
        });

    }, 1000); // Intervalo de 1.5 segundos

    // Mostrar el mensaje de desliza
    setTimeout(() => {
        const desliza = document.querySelector('.desliza');
        desliza.style.display = 'block'; // Mostrar desliza
        desliza.classList.add('show'); // Añadir la clase 'show' para que se deslice
    }, 1500);
    
    // Hacer visibles los elementos de saludo y descripción cuando se desplace
    window.addEventListener('scroll', function() {
        const flores = document.querySelector('.flores');
        const titulo = document.querySelector('#titulo');
        const flowers = this.document.querySelector('#flowers');
        const floresAudio = document.getElementById('flores-audio'); //Obtener elemento audio de las flores

        console.log(window.scrollY);
        console.log(window.innerHeight);
        if (window.scrollY >= window.innerHeight) {  // Mostrar cuando se deslice hacia abajo
            audio.pause();

            //Reproducir el audio de las flores
            floresAudio.play(); //Iniciar el audio de las flores
            flores.style.opacity = '1';
            titulo.classList.add('titulo');

            setTimeout(() => {
                flowers.style.display = 'block'; //Mostrar las flores
            }, 2000);

            setTimeout(() => {
                const regalo = this.document.querySelector('.regalo');
                regalo.style.opacity = '1';
                regalo.style.display = 'flex';
            }, 3000);
        }
    });

    // Detener el confeti después de 10 segundos
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 3500); // Detener después de 2.5 segundos
}

