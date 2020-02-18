var userClickPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var gameStarted = false;
var level = 0;

function nextSequence(){
  var newNumber = generateRandomNumber();
  var randomChosenColour = buttonColours[newNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  increaseLevel();
}

function generateRandomNumber(){
  return Math.floor(Math.random() * 4);
}

function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(pressedColour){
  $("#" + pressedColour).addClass("pressed");
  setTimeout(function () {
    $("#" + pressedColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function(event){
  userClickPattern.push(event.currentTarget.id);
  playSound(event.currentTarget.id);
  animatePress(event.currentTarget.id);
  checkAnswer(userClickPattern.length-1);
});

$(document).keydown(function(){
  if(gameStarted == false){
    gameStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
})

function increaseLevel(){
  level++;
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
  if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
    if(userClickPattern.length == gamePattern.length){
      setTimeout(nextSequence,1000);
      userClickPattern = [];
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press Any Key To Restart.");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  gameStarted = false;
}
