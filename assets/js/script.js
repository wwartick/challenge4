var pageContentEl = document.querySelector("#page-content");
var footerEl = document.querySelector("#right-or-wrong");
var timerEl = document.querySelector("#timer");
var scoresButtonEl = document.querySelector("#view-scores");
var intervalId;
var time = 20;
var quizArray = [];
var scores = [];

//displays if an answer is right or wrong
var answerResult = function(event) {
    
    clearPage();

    var eventTarget = event.target;
    var verdictEl = document.createElement("h3");

    //reads "correct" attribute set to 1 or 0
    var isAnswered = eventTarget.hasAttribute("correct");
    if (isAnswered) {
        var isCorrect = eventTarget.getAttribute("correct");
        if (isCorrect == 1 ){
        verdictEl.textContent = "Correct!";
        }
        else{
        verdictEl.textContent = "Wrong!";
           time = time - 10;
        }
        footerEl.appendChild(verdictEl);
    }
    
    if (time <=0) {
        time = 0;
        endQuiz();
    } else {
    createQuizForm();
    }
}

//displays scores
var scoresPage = function() {
    //stops the timer
    clearInterval(intervalId);
    //removes the counter from the top of the screen
    timerEl.innerHTML= "";
    //removes the text content on the page
    clearPage();
    
    //loads the local storage as new array
    var oldScores = JSON.parse(localStorage.getItem("scores"));
    //creates empty array if there is nothing in the local storage
    if (!oldScores ){
        oldScores = [];
    } 

    var highScores = document.createElement("h2");
    highScores.textContent="High Scores";
    pageContentEl.appendChild(highScores);

    //prints the scores array, or shows nothing if there is no array
    if (oldScores.length <= 0 ) {
        var playerShower = document.createElement("p");
        playerShower.textContent = "No high scores saved"
        pageContentEl.appendChild(playerShower);
    } else {
        for (i=0; i < oldScores.length; i++) {
            var playerShower = document.createElement("p");
            playerShower.className = "player-list"
            playerShower.textContent = (i +1) + ". " + oldScores[i].name + " - " + oldScores[i].score; 
            pageContentEl.appendChild(playerShower);
            };
    }

    //button that restarts the quiz
    var backBtn = document.createElement("button");
    backBtn.textContent = "Restart";
    backBtn.className = "final-btn"
    pageContentEl.appendChild(backBtn);

    //button that clears the board
    var clearBtn = document.createElement("button");
    clearBtn.textContent= "Clear High Scores";
    clearBtn.className = "final-btn"
    pageContentEl.appendChild(clearBtn);

    //event listeners
    clearBtn.addEventListener("click", clearLocal);
    backBtn.addEventListener("click", landingPageLaunch);
}   

//displays score + form submission for leaderboard
var finalPage = function() {
    //clears page
    pageContentEl.innerHTML= "";
    
    var finishedScreen = document.createElement("h1");
    finishedScreen.textContent="All Done!";
    pageContentEl.appendChild(finishedScreen);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + time;
    pageContentEl.appendChild(finalScore);

    var nameForm = document.createElement("input"); 
    nameForm.setAttribute("placeholder", "Insert Name Here");
    nameForm.setAttribute("id", "userInput");
    pageContentEl.appendChild(nameForm);

    var hiButton = document.createElement("button");
    hiButton.textContent = "Submit";
    hiButton.className = "score-btn"
    pageContentEl.appendChild(hiButton);


    hiButton.addEventListener("click", createPlayerObj);
    
}   

var createQuizForm = function() {

    //removes question/answers before repopulating
    pageContentEl.innerHTML= "";
    
    //creates random number to select random array
    var random = Math.floor(Math.random() * quizArray.length);
    var selectedArray = quizArray[random];
    //removes the randomly selected array from the main array
    quizArray.splice(random, 1);

    //creates h1 element to display the question
    var quizQuestionEl = document.createElement("h1");

    //every index[0] is the question for the answers
    quizQuestionEl.textContent = selectedArray[0];
    pageContentEl.appendChild(quizQuestionEl);

    var buttonHolder = document.createElement("div");
    buttonHolder.className = "btn-group";

    //loop to create buttons
    for (var i= 1; i<selectedArray.length; i++) {

        var answerChoice = selectedArray[i];
    //I added a z to each correct answer to identify it, this code removes the z so the tester does not see the correct answer
        var quizAnswer = answerChoice.split('z').join('');
        var answerButtonEl=document.createElement("button");
        answerButtonEl.textContent= i + ": " + quizAnswer;

        answerButtonEl.setAttribute("button-id", i);
        answerButtonEl.className= "answer-btn";
        buttonHolder.appendChild(answerButtonEl);
        pageContentEl.appendChild(buttonHolder);
        var answerChoice = selectedArray[i];

        if (!answerChoice.indexOf("z")) {
            answerButtonEl.setAttribute("correct", 1);
        }
        else{
            answerButtonEl.setAttribute("correct", 0);
        }

        if (quizArray.length > 0){
            answerButtonEl.addEventListener("click", answerResult);    
        }
        else {
            answerButtonEl.addEventListener("click", endQuiz);
        }
    }   
}

//start of landingPageLaunch function
//dynamically creates landing page upon load
var landingPageLaunch = function(){
    //clears the page
    clearPage();

    var introEl = document.createElement("h1");
    introEl.textContent="Coding Quiz Challenge!"
    pageContentEl.appendChild(introEl);

    var quizRulesEl = document.createElement("p");
    quizRulesEl.textContent="Try to answer the following code-relate questions with the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pageContentEl.appendChild(quizRulesEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "start-btn"
    pageContentEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", beginQuiz);
} 
//end of landingPageLaunch function


var beginQuiz = function() {
    //initializes and resets timer/array upon start of the quiz
    time = 75;
    quizArray = [
        ["Commonly used data types DO NOT include: ", "strings", "booleans", "zalerts", "numbers"], 
        ["The condition in an if/else statement is enclosed with ____. ", "quotes","curly brackets","zparentheses","square brackets"],
        ["Arrays in JavaScript can be used to store _______","numbers and strings","other arrays","booleans","zall of the above"],
        ["String values must be enclosed within _____ when being assigned to variables","commas","curly brackets","zquotes","parentheses"],
        ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash","for loops","zconsole log"]
    ];

    createQuizForm();
    intervalId = setInterval(myTimer, 1000);
}

//end quiz from timer
var endQuiz = function() {
    timerEl.textContent = "Timer: " + (time);
    if (time <=0) {
        time = 0;
        clearInterval(intervalId);
        finalPage();
    } else 
    
    clearInterval(intervalId);
    finalPage();
    
}

//timer function
var myTimer = function() {
    if (time <=0) {
        time = 0;
        clearInterval(intervalId);
        finalPage();
       };

    timerEl.textContent = "Timer: " + (time);
    time--;

}
//clear page function
var clearPage = function() {
    pageContentEl.innerHTML= "";
    footerEl.innerHTML= "";
}

var clearLocal =function() {
    localStorage.clear();
    window.alert("Local Storage Cleared!");
    landingPageLaunch();
}

var createPlayerObj = function(){
    var userName = document.getElementById("userInput").value;
    var player = {
        name: userName,
        score: time
    };
    scores.push(player);
    saveScores();
    scoresPage();
}

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

//creates/loads landing page upon page load
window.addEventListener("load", landingPageLaunch);
scoresButtonEl.addEventListener("click", scoresPage);
