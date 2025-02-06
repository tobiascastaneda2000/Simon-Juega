var userClickedPattern = [];

var userChosenColour;

//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//variable que indica cuando empieza el juego (Lo hace cuando alguien aprieta una tecla)
var startGame = false;

//variable indica numero de nivel
var level = 0;

//Funcion que almacena el color en una lista en orden
function handler(colour) {
    userChosenColour = colour;

    userClickedPattern.push(userChosenColour)

    console.log(userClickedPattern)
}

//cuando alguien toca una tecla, se desencadena esto
$(document).ready(function () {
    $(document).on("keydown", function () {
        if (!startGame) {
            $("#level-title").text("Level " + level)
            startGame = true;
            nextSequence();

        }

    })
});



//1. Inside game.js create a new function called nextSequence()
function nextSequence() {

    //Renueva los botones presionados en este nivel
    userClickedPattern = [];

    //Aumenta un nivel
    level = level + 1;

    //Actualizo el titulo segun el nivel
    $("#level-title").text("Nivel " + level)

    //calcula un numero aleatorio entre 0 a 3
    var randomNumber = Math.floor(Math.random() * 4);

    //Buscamos el color que almacena el vector, con el numero aleatorio
    var randomChosenColour = buttonColours[randomNumber];

    //almacena los colores elegidos aleatoriamente
    gamePattern.push(randomChosenColour);

    //lanza una animacion en el boton
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Suena el sonido del color elegido aleatoriamente
    playSound(randomChosenColour);

    //Lanza la funcion handler con el color aleatorio
    //handler(randomChosenColour);


}

// Para que un click en el boton haga su sonido
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
        var buttonId = button.id
        handler(buttonId);
        playSound(buttonId);
        animatePress(buttonId)
        console.log(buttonId);
        checkAnswer(userClickedPattern.length-1);


    })

})

/*
$(".btn").on("click", function(){
    var buttonId = $(this).attr('id');
    playSound(buttonId)
    console.log(buttonId)
});*/


//Funcion que busca un sonido .mpp3 en la carpeta de sounds
function playSound(colour) {
    var sound = new Audio("sounds/" + colour + ".mp3");
    sound.play();
}

//Para que un boton al ser clickeado se ponga color gris por 100 milisegundos
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");

    }, 100);

}

var numberColourClickedUser = 0;

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {


        console.log("wrong");
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("#level-title").text("Game Over, Presiona una tecla para volver a Jugar")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        startOver();


    }
}

function startOver(){

    level = 0;
    gamePattern = [];
    startGame = false;
}









