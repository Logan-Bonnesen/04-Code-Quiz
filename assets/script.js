var quizQuestions = [
    {
     title: "Commonly used data types DO NOT include:",
     choices: ["strings", "booleans", "alerts", "numbers"],
     answer: "alerts"
    },
    {
     title: "The condition in an if / else statement is enclosed within ____.",
     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
     answer: "parentheses"
    },
    {
     title: "Arrays in JavaScript can be used to store ____.",
     choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],   
     answer: "all of the above"
    },
    {
     title: "String values must be enclosed within ____ when being assigned to variables.",
     choices: ["commas", "curly brackets", "quotes", "parentheses"],
     answer: "quotes"
    },
    {
     title: "A very useful tool used during development and debugging for printing content to the debugger is:",
     choices: ["Javascript", "terminal/bash", "for loops", "console log"],
     answer: "console log"
       },
       ];

     

// add global variables to reference important html IDs and variable to manage time state
var startButton = document.getElementById('start');
var submitButton = document.getElementById('submit');
var timerEl = document.getElementById('time');
var questionTitle = document.getElementById('question-title');
var choicesEl = document.querySelector('#choices')
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var questionScreen = document.getElementById('questions'); 
var initialsEl = document.getElementById('initials');

var questionsIndex = 0
var timerCount;
var timeLeft = 60; 


function startTimer() {

    
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timerCount >= -1) {
            console.log('quiz over')
        }

}
// creating startQuiz function
function startQuiz() {
    console.log(quizQuestions[0].title)
    document.getElementById('start-screen').style.display="none";
    questionScreen.removeAttribute('class');
    timerCount = setInterval(startTimer, 1000);
    

    cycleQuestion();
}
;

    


function cycleQuestion() {
    var currentQuestionIndex = quizQuestions[questionsIndex]
    document.getElementById('question-title').textContent = currentQuestionIndex.title;
    choicesEl.textContent = ""
    currentQuestionIndex.choices.forEach(choice => {
        var answerButton = document.createElement('button');
        answerButton.setAttribute('value', choice);
        answerButton.textContent = choice

        answerButton.onclick = checkAnswer

        choicesEl.appendChild(answerButton)
    });
}
function checkAnswer() {
    if (this.value === quizQuestions[questionsIndex].answer) {
        console.log('correct');
    
    } else {
        console.log('incorrect');
        timeLeft = timeLeft - 10;
        timerEl.textContent = timeLeft
    }
    questionsIndex++;
    if (questionsIndex === quizQuestions.length) {
        endQuiz();
    } else {
        cycleQuestion();
    }
    // if (timeLeft <= 0) {
    //     endScreen();
    // } else {
    //     cycleQuestion();
    // }



}
function endQuiz(){
    console.log('quiz is over');
    clearInterval(timerCount);
    document.getElementById('questions').style.display="none";
    endScreen.removeAttribute('class');

// hide question screen, unhide end screen
}

function saveHighscore() {
    
    var initials = initialsEl.value.trim();
    
    initialsEl.value.toUpperCase();
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
      var newScore = {
        score: time,
        initials: initials
      };
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      // redirect to next page
      window.location.href = "highscores.html";
      var highScores = document.createElement('p');
      highScores.textContent = "Your score is: " + newScore
  }

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', endQuiz);
submitButton.addEventListener('click', saveHighscore);

// *** save high score function that gets fired when click submit btn on end screen, grab value of initials input, use time left as score
// *** when function fired, check local storage, grab it -- combine high scores and forEach? 
