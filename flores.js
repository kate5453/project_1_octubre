const floresBody = document.getElementById('flores-id'); // Contenedor donde se insertará el contenido dinámico

// Cargar el archivo PHP mediante AJAX
$.ajax({
    url: 'flores.php',
    method: 'GET',
    success: function (data) {
        // // Check the loaded PHP file and initialize the appropriate script
        // if (regalo.content === 'ruleta.php') {
        //     iniciarRuleta();  // Call ruleta initialization function
        // } else if (regalo.content === 'letter.php') {
        //     inicializarEventos();  // Call the letter initialization function
        // }

        // Agregar el contenido de flores.php después del div.description
        $('.description').after(data);
    },
    error: function () {
        console.error('Error al cargar el contenido de flores.php');
    }
});
