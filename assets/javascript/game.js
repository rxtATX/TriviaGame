$(document).ready(function () {
    gameInit();
});
    //Global variables
var isRunning;
var currentQuestion;
var correctAnswers;
var isQuizOver;
var timeLeft;
var questions = [{
    question: "What is someone who shoes horses called?",
    choices: ["A tanner", "A cobler", "A farrier", "A chandler"],
    correctAnswer: 2
}, {
    question: "What does the word \"opus\" mean in Latin?",
    choices: ["Masterpiece", "Opera", "Work", "Overture"],
    correctAnswer: 0
}, {
    question: "People get together for a \"tete-a-tete\". What is the literal meaning in its original french?",
    choices: ["Head to head", "Man to man", "One on one", "All together"],
    correctAnswer: 0
}, {
    question: "The word \"salary\" originated with _______.",
    choices: ["An Arabic word meaning \"daily bread\"", "A French word meaning \"compensation\"", "A German word meaning \"what is due\"", "A Latin word meaning \"salt money\""],
    correctAnswer: 3
}, {
    question: "What is the literal meaning for the German word \"schadenfreude\"?",
    choices: ["Harm joy", "Shadow friends", "Shady joys", "Shameful joy"],
    correctAnswer: 0
}, {
    question: "When you order a \"cappuccino\" in Italy, what are you literally asking for?",
    choices: ["Coffee drink", "White coffee", "Small cap", "Extra foam"],
    correctAnswer: 2
}, {
    question: "What language did the word \"bicker\" come from?",
    choices: ["Latin", "Dutch", "French", "Arabic"],
    correctAnswer: 1
}, {
    question: "\"Booze\" comes from the liquor store. What language did the word originally come from?",
    choices: ["French", "Greek", "Dutch", "Latin"],
    correctAnswer: 2
}, {
    question: "A \"cipher\" is a puzzle or encoded message in English, but what does the word mean in its original Arabic?",
    choices: ["Zero", "Code", "Illustration", "Puzzle"],
    correctAnswer: 0
}, {
    question: "There are some who call me... _______",
    choices: ["James", "Anthony", "Tim", "Emmanuel"],
    correctAnswer: 2
}
];
    //Start game parameters
function gameInit() {
    //Initialize Game
    resetQuiz();
    hideScore();
    // Display First Question
    displayCurrentQuestion();
    //Initialize Click Events
    $(".nextButton").off("click").on("click", clickNextHandler);
}
    //Timer function ticks down each second with display.
function timeDown() {
    $("#timerDisplay").html("You have " + timeLeft + " seconds left to answer this question.");
    timeLeft--;
    setTimeout(timeDown, 1000);
        if (timeLeft === 0) {
            currentQuestion++;
            displayCurrentQuestion();
        //     isQuizOver = true;
        //     $(".question").html("You ran out of time!");
        //     $("#timerDisplay").hide();
        //     $(document).find(".nextButton").text("Play Again?");
        //     // gameInit();
        }
    isRunning = true;
} 
    //Next button will trigger next question to display
function clickNextHandler() {
    if (!isQuizOver) {
        value = $("input[type='radio']:checked").val();
        if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
        }
        currentQuestion++;
        //Ends the game with a win when out of questions
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
            $("#timerDisplay").hide();
            // Change the text in the next button to ask if user wants to play again
            $(document).find(".nextButton").text("Play Again?");
            isQuizOver = true;
        }
    
    } else { // quiz is over and clicked the next button (which now displays 'Play Again?')
        $(document).find(".nextButton").text("Next Question");
        gameInit();
        displayCurrentQuestion();
        hideScore();
    }
};

// This displays the current question and the choices
function displayCurrentQuestion() {
    timeLeft = 20;
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".questionBox > .question");
    var choiceList = $(document).find(".questionBox > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    var choice;
    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Clears any previous choices
    $(choiceList).find("li").remove();
    //Loops through answer choices to dynamically create radio buttons with values
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="radiosOptions" />' + choice + '</li>').appendTo(choiceList);
    }
    //sets time and starts countdown
    if (!isRunning) {
        timeDown();
    }
}
    //reinitialize game
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    timeLeft = 20;
    $("#timerDisplay").show();
    isQuizOver = false;
    hideScore();
}
    //Show total correct at the end of questions list
function displayScore() {
    $(document).find(".questionBox > .result").text("You got " + correctAnswers + " answers right out of " + questions.length + " questions!");
    $(document).find(".questionBox > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}