<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot de Cumpleaños</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="felizcumple.css">
    <link rel="stylesheet" href="gift.css">
</head>
<body>
    <div class="chat screen">
    <div class="chat-container">
        <div class="chat-box" id="chat-box">
            <div class="chat-message bot">¡Hola! Soy tu chatbot de cumpleaños. ¿En qué puedo ayudarte?</div>
        </div>
        <div id="options-container"></div>
        <input type="text" id="user-input" placeholder="Escribe tu pregunta..." style="display:none;" />
        <button id="send-button" style="display:none;">Enviar</button>
    </div>

    <div class="desliza">
        <span class="desliza-message">Desliza hacia abajo</span>
    </div>

    </div>

    

    <!-- Flores -->
    <div class="flores screen">
    <div class="greetings">
        <span>F</span>
        <span>E</span>
        <span>L</span>
        <span>I</span>
        <span>Z</span>
        <span> </span>
        <span>C</span>
        <span>U</span>
        <span>M</span>
        <span>P</span>
        <span>L</span>
        <span>E</span>
        <span>!</span>
    </div>
    <div class="description">
        <span>Llego tarde pero aquí presente 💖😊</span>
    </div>

    <!-- Flores generadas -->
    <?php
        include('flores.php');
    ?>
     
    </div>


    <!-- GIFT BOX -->
    <div class="regalo screen">
        <h2 class="titulo">Solo puedes elegir uno. Elige bien XD</h2>
        <!-- Boxes -->
        <div class="gift--box">
            <div class="box__container">
              <div class="row">
                <div class="col-12 mt-5 d-flex justify-content-center">
                  <div class="box">
                    <div class="box-body">
                      <img class="img" src="./img/incognita.png">
                      <div class="box-lid">
            
                        <div class="box-bowtie"></div>
            
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box__container">
              <div class="row">
                <div class="col-12 mt-5 d-flex justify-content-center">
                  <div class="box">
                    <div class="box-body">
                      <img class="img" src="./img/incognita.png">
                      <div class="box-lid">
            
                        <div class="box-bowtie"></div>
            
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box__container">
              <div class="row">
                <div class="col-12 mt-5 d-flex justify-content-center">
                  <div class="box">
                    <div class="box-body">
                      <img class="img" src="./img/incognita.png">
                      <div class="box-lid">
            
                        <div class="box-bowtie"></div>
            
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>

    <script src="script2.js" type="module"></script>
</body>
</html>
