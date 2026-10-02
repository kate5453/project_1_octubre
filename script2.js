// import confetti from "https://cdn.skypack.dev/canvas-confetti";

let questionCount = 0;
const maxQuestions = 1;

// JSON de preguntas y respuestas
const questionAnswerList = [
    { question: "Rápido", answer: "Que triste tu caso, estás full 24/7, ....con fe para Navidad descansas 🎄😂. Así que vamos de frente:" },
    { question: "Con calma", answer: "¿Eh? 😳 No esperaba esta decisión ...." }
];


// Respuestas extra (después de elegir cualquier opción)
const extraAnswers = [
    "Rayos.... no tengo nada programado… ¿y ahora que hago?... ¿Te bailo? 💃🕺😂😂 jajajaja ok no",
    "Buenos vamos con detalle, tengo algo preparado para ti... 🎁",
    "Pero ya será para Navidad cuando te lo dé XD o cuando vaya LIMA",
    "Mientras espero que te guste lo que viene a continuación 💖"
];

// Almacenar preguntas ya hechas
let usedQuestions = [];

// Mostrar la primera opción de preguntas cuando la página se carga
window.onload = async function() {
     // Primer mensaje con efecto de escritura
    // await addMessage("Hola!! 🙋‍♂️ saludo a la distancia, virtual XD. Llego tarde, pero presente al fin 😅✨..... Ahora como lo quieres, ¿rápido o voy con calma?", 'bot');
    await addMessage("¡Holaaa Mili! 🙋‍♂️\nSaludo a la distancia (virtual, obvio 😅). Llego tarde, pero presente al fin ✨\n\n                   Ahora dime... ¿cómo lo quieres?\n¿Rápido o con calma? 😏", 'bot');
    // typingSpan.innerHTML = typingSpan.innerHTML + text[index] === "\n" ? "<br>" : text[index];

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
    // await new Promise(resolve => setTimeout(resolve, 700));
    // await addMessage(extraAnswers[0], 'bot');

    // // Otra pausa
    // await new Promise(resolve => setTimeout(resolve, 700));
    // await addMessage(extraAnswers[1], 'bot');

    // 👇 Solo si elige “Con calma”
    if (question === "Con calma") {
        for (const msg of extraAnswers) {
            await new Promise(r => setTimeout(r, 700));
            await addMessage(msg, 'bot');
        }
    }

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
                    // typingSpan.textContent += text[index];
                    // typingSpan.innerHTML = typingSpan.innerHTML + text[index] === "\n" ? "<br>" : text[index];

                    const char = text[index];
                    // si el caracter es salto de línea, insertar <br>
                    if (char === "\n") {
                        typingSpan.innerHTML += "<br>";
                    } else {
                        typingSpan.innerHTML += char;
                    }   
                    index++;
                    chatBox.scrollTop = chatBox.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                    resolve(); // Resolver la promesa al terminar la animación
                }
            }, 65); // Ajusta la velocidad según prefieras
        } else {
            typingSpan.textContent = text;
            resolve(); // Resolver inmediatamente si es el usuario
        }
    });
}


function showSurprise() {
    const chatBox = document.getElementById('chat-box');
    addMessage("¡Feliz cumple MILIIIII 🎉🎂✨🎈...a la distancia, y tarde... lo siento :(", 'bot');

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
    
    let secondWindow = window.innerHeight * 2;
    // Hacer visibles los elementos de saludo y descripción cuando se desplace
    window.addEventListener('scroll', function() {
        const flores = document.querySelector('.flores');
        const titulo = document.querySelector('#titulo');
        const flowers = this.document.querySelector('#flowers');
        const floresAudio = document.getElementById('flores-audio'); //Obtener elemento audio de las flores


        console.log(window.scrollY);
        console.log(window.innerHeight);
        console.log(secondWindow);
        if (window.scrollY >= window.innerHeight && window.scrollY < secondWindow) {  // Mostrar cuando se deslice hacia abajo
            audio.pause();

            if(window.scrollY >= window.innerHeight){
            cambiarMusica('flores-audio'); }

            floresAudio.volume = 1.0;
            //Reproducir el audio de las flores
            // floresAudio.play(); //Iniciar el audio de las flores
            if(floresAudio){
                floresAudio.addEventListener('ended', ()=>{
                    const desliza = document.querySelector('#desliza--flores');

                    if(desliza){
                        desliza.style.display = 'block';
                        desliza.classList.add('show');
                    }
                });
            }
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
        }else if(window.scrollY >= secondWindow){ //Cuando hizo scroll a la segunda ventana
            console.log("segunda ventana");
            // if(document.querySelector('.luffy-container')){
            //     console.log('existe luffy');
            // // }
            // if(window.scrollY >= secondWindow){
            // cambiarMusica('luffy-audio'); }
            cambiarMusica('luffy-audio');
        }
    });

    setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';

        const img = document.createElement('img');
        img.src = './img/torta.gif';
        img.alt = 'Tortita de cumpleaños';
        img.style.width = '100px'; // Ajusta el tamaño a lo chiquito y tierno
        img.style.margin =  '0 auto';
        img.style.marginTop = '10px';

        messageDiv.appendChild(img);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500);


    // Detener el confeti después de 10 segundos
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 3500); // Detener después de 2.5 segundos
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

