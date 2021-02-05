document.addEventListener("keydown", function (evt) {
    console.log(evt.key);
})


// Game Code from below
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

// random number generator
function nextSequence() {
    //Changing the value of h1
    document.querySelector("h1").textContent = "Level " + level;
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    console.log("random number : " + randomNumber);


    //Random Color choosing and applying styling and sounds effects to the respective divs
    var randomChosenColor = buttonColours[randomNumber];
    console.log("random chosen color : " + randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("Game pattern array  : " + randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}



//Press any key to start game event

$("html").on("keydown", function (event) {
    if (level === 0) {
        document.querySelector("h1").textContent = "Level " + level;
        nextSequence();
    }
})


// Adding event listner to detect what user is clicking

$(".btn").on("click", function (event) {

    //Saving the id name of the clicked element
    var userChosenColour = this.id;
    console.log(this.id);
    //Saving all the clicked elements into the userClickedpattern array
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);


    //Animation on click
    animatePress(userChosenColour);
    
    //Playing sound
    playSound(userChosenColour);
    

    checkAnswer(userClickedPattern.length - 1);

})



// This function will check the userClicked pattern and random game pattern and proceed or fail the game accordingly

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success  | Right pattern");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
    }
    else {
        console.log("Wrong pattern");

        // Playing game over sound
        playSound("wrong");

        // Applying game over class for red bg effect

        $("body").addClass("game-over");

        //JS code
        document.querySelector("h1").textContent="Game Over, Press Any Key to Restart";

        // resetting everything
        startOver();

        //Removing class after 200ms to add flashing effect.

        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 200);


    }

}



// Resetting all the values of game
function startOver() {
    level=0;
    var gamePattern = [];
    var userClickedPattern = [];
}











//Play sound function

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(colorButton) {

    $("#" + colorButton).addClass("pressed");

    // Or We can do this by using vanilla js
    //  document.querySelector("#"+colorButton).classList.add("pressed");

    // removing class after 100 ms
    setTimeout(() => {
        $("#" + colorButton).removeClass("pressed");
    }, 100);
}