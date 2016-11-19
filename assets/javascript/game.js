
var questions = [{
    question: "What is someone who shoes horses called?",
    choices: ["A tanner", "A cobler", "A farrier", "A chandler"],
    correctAnswer: 2
}, {
    question: "Who was Henry VIII's first wife?",
    choices: ["Catherine of Aragon", "Anne Boleyn", "Anne of Cleves", "Jane Seymour"],
    correctAnswer: 0
}, {
    question: "Which metal is heaviest?",
    choices: ["Gold", "Cobalt", "Copper", "Iron"],
    correctAnswer: 0
}, {
    question: "The word 'salary' originated with _______.",
    choices: ["An Arabic word meaning 'daily bread'", "A French word meaning 'compensation'", "A German word meaning 'what is due'", "A Latin word meaning 'salt money'"],
    correctAnswer: 3
}, {
    question: "There are some who call me... _______",
    choices: ["James", "Anthony", "Tim", "Emmanuel"],
    correctAnswer: 2
}];
    var timeLeft = 45;
      
    function timeDown() {   //Timer function displays for 3 minutes
        $("#timerDisplay").html("You have " + timeLeft + "seconds.");
        timeLeft--;
        setTimeout(timeDown, 1000); //Counts down by the second
            if (timeLeft === 0) {
                alert("Time is up!");
                resetQuiz();
            }
    } //end timeDown();
        
    timeDown();//Displays initial time  

var currentQuestion = 0;
var correctAnswers = 0;
var isQuizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!isQuizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
            }

            currentQuestion++; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();
            } else {
                displayScore();
                // Change the text in the next button to ask if user wants to play again
                $(document).find(".nextButton").text("Play Again?");
                isQuizOver = true;
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?')
            isQuizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="radiosOptions" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    timeLeft = 45;
    timeDown();
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You got " + correctAnswers + " answers right out of " + questions.length + " questions!");
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}