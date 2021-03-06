//We start with the ten questions.
//Each question holds five image objects. 
//Four images hold the Boolean value false.
//For each questions, only one image matches with the question, and holds a true Boolean value.
//Each time the players find the true images, they are rewarded with a point (cookie)
//Five points to Win the game.





function Game() {
  this.player1Score = 0;
  this.player2Score = 0;
  this.currentQuestionIndex = 0;
  this.currentChoiceIndex = 0;
  this.currentQuestionIndex = 0;
  this.currentChoiceIndex = 0;
  this.isOver = false;

  this.questions = questions;
//  this.questions = _.shuffle(questions);
  this.questions = _.map(this.questions, function(question) {
    question.choices = _.shuffle(question.choices);
    return question;
  });
  

  //modification de this.currentQuestionIndex
  //................this.currentChoiceIndex



}

Game.prototype.displayQuestionAndChoiceInConsole = function () {
  console.log("Question: ", this.questions[this.currentQuestionIndex]);
  console.log("Choice: ", this.questions[this.currentQuestionIndex].choices[this.currentChoiceIndex]);
}

Game.prototype.getCurrentQuestionText = function () {
  return this.questions[this.currentQuestionIndex].question;
}

Game.prototype.getCurrentChoiceImg = function () {
  return this.questions[this.currentQuestionIndex].choices[this.currentChoiceIndex].img;
}

Game.prototype.selectNextChoice = function () {
  var nbOfChoices = this.questions[this.currentQuestionIndex].choices.length;
  var nbOfQuestions = this.questions.length;
  if (this.currentChoiceIndex + 1 < nbOfChoices) {
    this.currentChoiceIndex++;
  } else if (this.currentQuestionIndex + 1 < nbOfQuestions) {
    this.currentChoiceIndex = 0;
    this.currentQuestionIndex++;
  } else {
    this.isOver = true;
  }
}
Game.prototype.selectCurrentChoice = function (playerIndex) {
  if (this.questions[this.currentQuestionIndex].choices[this.currentChoiceIndex].alreadySelected) {
    return;
  }
  this.questions[this.currentQuestionIndex].choices[this.currentChoiceIndex].alreadySelected = true;
  var diffOfScore;
  if (this.questions[this.currentQuestionIndex].choices[this.currentChoiceIndex].isCorrect) {
    diffOfScore = 1;
  } else {
    diffOfScore = -1;
  }

  if (playerIndex === 1) {
    this.player1Score += diffOfScore;
  } else {
    this.player2Score += diffOfScore;
  }
}


// --------

var g = new Game();

$(document).ready(function () {
  displayCurrentQuestionAndChoiceInJQuery();
  displayCookies();

  setInterval(function () {
    g.selectNextChoice();
    if (!g.isOver) {
      displayCurrentQuestionAndChoiceInJQuery();
    } else {
      displayWinner();
    }
  }, 1700);

  $(document).keydown(function (event) {
    console.log(event);
    switch (event.keyCode) {
      case 65: // "a"
        g.selectCurrentChoice(1);
        break;
      case 80: // "p"
        g.selectCurrentChoice(2);
        break;
    }
    displayCurrentScoresInJQuery();
    displayCookies();
  });
});

function displayCurrentQuestionAndChoiceInJQuery() {
  $('#question').text(g.getCurrentQuestionText());
  $('#img-choice').attr('src', g.getCurrentChoiceImg());
  $('#scores .player1').text(g.player1Score);
  $('#scores .player2').text(g.player2Score);
}

function displayCurrentScoresInJQuery() {
  $('#scores .player1').text(g.player1Score);
  $('#scores .player2').text(g.player2Score);
}

function displayWinner() {
  var winnerNumber;
  if (g.player1Score > g.player2Score) {
    winnerNumber = 1;
  } else {
    winnerNumber = 2;
  }
  $('.container').html("");
  $('.container').css("background-image", "url(img/P" + winnerNumber + "win.jpg)");
}

function displayCookies() {
  $('.cookie').css('visibility', 'hidden');
  if (g.player1Score >= 1) {
      $('.cookies.player1 .cookie1').css('visibility', 'visible');
  }
  if (g.player1Score >= 2) {
      $('.cookies.player1 .cookie2').css('visibility', 'visible');
  }
  if (g.player1Score >= 3) {
      $('.cookies.player1 .cookie3').css('visibility', 'visible');
  }
  if (g.player1Score >= 4) {
      $('.cookies.player1 .cookie4').css('visibility', 'visible');
  } 
  if (g.player2Score >= 5) {
      $('.cookies.player1 .cookie5').css('visibility', 'visible');
  }
  if (g.player2Score >= 1) {
      $('.cookies.player2 .cookie1').css('visibility', 'visible');
  }
  if (g.player2Score >= 2) {
      $('.cookies.player2 .cookie2').css('visibility', 'visible');
  }
  if (g.player2Score >= 3) {
      $('.cookies.player2 .cookie3').css('visibility', 'visible');
  }
  if (g.player2Score >= 4) {
      $('.cookies.player2 .cookie4').css('visibility', 'visible');
  } 
  if (g.player2Score >= 5) {
      $('.cookies.player2 .cookie5').css('visibility', 'visible');
  } 
}
