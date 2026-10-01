<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Una sorpresa para ti</title>
</head>
<body>
    <div class="luffy-scene" id="luffy-scene">

        <div class="luffy-intro" id="luffy-intro">
            <div class="luffy-intro-glow"></div>
            <img src="./img/torta.gif" alt="Luffy preparando una sorpresa" class="luffy-intro-img">
            <p class="luffy-intro-text">Preparando una sorpresa... 🌻</p>
        </div>

        <div class="luffy-content" id="luffy-content">

            <div class="luffy-media">
                <div class="luffy-video-frame">
                    <div class="luffy-video-shine"></div>
                    <video id="luffy-video"
                           src="./video/luffy1.mp4"
                           playsinline
                           muted
                           autoplay
                           preload="auto"
                           class="luffy-video"></video>
                </div>
                <span class="luffy-caption">Una pequeña sorpresa para ti ✨</span>
            </div>

            <div class="luffy-letter-wrap">
                <div class="luffy-letter-decoration">☀️</div>
                <div class="letter-luffy" id="letter-luffy" aria-live="polite"></div>
                <div class="luffy-letter-footer">— con cariño, desde mi isla 🌻</div>
            </div>

        </div>

        <audio id="luffy-audio" src="./audio/luffy.mp3" preload="auto"></audio>
    </div>
</body>
</html>
