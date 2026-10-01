import confetti from "https://cdn.skypack.dev/canvas-confetti";

$(document).ready(function () {
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
});

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
