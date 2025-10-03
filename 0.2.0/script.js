import confetti from "https://cdn.skypack.dev/canvas-confetti";

let questionCount = 0;
const maxQuestions = 3;

// JSON de preguntas y respuestas
const questionAnswerList = [
    { question: "¿Qué eres?", answer: "Soy un chatbot hecho con amor." },
    { question: "¿Estás conectado a ChatGPT?", answer: "No exactamente, pero soy bastante inteligente." },
    { question: "¿Te gusta la música?", answer: "¡Claro que sí! Me encanta." },
    { question: "¿Cuál es tu color favorito?", answer: "Me gustan todos los colores, pero el verde es especial." }
];

// Almacenar preguntas ya hechas
let usedQuestions = [];

// Mostrar la primera opción de preguntas cuando la página se carga
window.onload = function() {
    setTimeout(() => {
        showQuestionOptions();
    }, 1000);
};

function showQuestionOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Filtrar preguntas no usadas
    const availableQuestions = questionAnswerList.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) return;  // Si ya no quedan preguntas, detener

    // Seleccionar aleatoriamente 2 preguntas
    const randomQuestions = getRandomQuestions(availableQuestions);
    randomQuestions.forEach(q => {
        const optionButton = document.createElement('button');
        optionButton.textContent = q.question;
        optionButton.className = 'option-button';
        optionButton.addEventListener('click', () => handleUserChoice(q));
        optionsContainer.appendChild(optionButton);
    });
}

function handleUserChoice(selectedQA) {
    const { question, answer } = selectedQA;
    addMessage(question, 'user');  // Mostrar pregunta del usuario

    // Guardar la pregunta como usada
    usedQuestions.push(question);
    questionCount++;

    // Ocultar opciones inmediatamente
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Mostrar la respuesta del bot después de un pequeño retraso
    setTimeout(() => {
        addMessage(answer, 'bot');     // Mostrar respuesta del bot

        if (questionCount < maxQuestions) {
            setTimeout(() => {
                showQuestionOptions(); // Mostrar nuevas opciones
            }, 1000);
        } else {
            setTimeout(() => {
                showSurprise(); // Mostrar sorpresa después de la última pregunta
            }, 1500);
        }
    }, 1000); // Retraso para mostrar la respuesta del bot
}

function getRandomQuestions(availableQuestions) {
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo
}

function showSurprise() {
    const chatBox = document.getElementById('chat-box');
    addMessage("¡Mentira! 🎉 ¡Sorpresa! ¡Feliz Cumpleaños! 🎈", 'bot');

    // Esperar 1 segundo antes de lanzar el confeti
    setTimeout(() => {
        // confetti.start();
        const count = 300, // Aumenta la cantidad de confeti
        defaults = {
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
        fire(0.5, { // Aumenta el ratio de confeti desde la izquierda
            spread: 70,
            startVelocity: 55,
            origin: { x: 0, y: 0.7 }, // Salida desde el lado izquierdo
        });

        // Confeti desde la derecha
        fire(0.5, { // Aumenta el ratio de confeti desde la derecha
            spread: 70,
            startVelocity: 55,
            origin: { x: 1, y: 0.7 }, // Salida desde el lado derecho
        });
    }, 1000);

    // Sonido de cumpleaños
    const audio = new Audio('./audio/music.mp3');
    audio.play();
}

// Función para el confeti (puedes usar una librería real de confeti aquí)
// const confetti = {
//     start: function() {
//         alert('Confeti 🎉'); // Simplemente como ejemplo
//     }
// };
