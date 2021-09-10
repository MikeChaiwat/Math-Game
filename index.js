var playing = false;
var score;
var action;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function () {
  //if we are playing
  if (playing == true) {
    location.reload(); //reload page
  } else {
    //if we are not playing
    playing = true;
    score = 0; //set score to 0
    document.getElementById("scorevalue").innerHTML = score;
    show("timeremaining"); //show countdown box
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    hide("gameover");

    document.getElementById("startreset").innerHTML = "Reset Game"; //change button to reset

    //start countdown

    startCountdown();

    //generate a new Q&A
    generateQA();
  }
};

//Clicking on an answer box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        //correct answer
        score++;
        document.getElementById("scorevalue").innerHTML = score;

        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        //Generate new Q&A
        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

//if we click on answer box
//if we are playing
//correct?
//yes
//increase score
//show correct box for 1 sec
//generate new Q&A
//no
//show try again box for 1 sec

function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      //game over
      stopCountdown();
      show("gameover");
      document.getElementById("gameover").innerHTML =
        "<p>Game Over!</p><p>Your score is " + score + "</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(action);
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill onw box with the correct answer

  //fill other boxes with wrong answers
  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    if (i !== correctPosition) {
      //create wrong answer
      var wrongAnswer;
      // Prevent wrongAnswer same as correctAnswer
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
