var pageContentEl = document.querySelector("#page-content");
var footerEl = document.querySelector("#right-or-wrong");
var correctAnswers = 0;
var quizArray = [];
var scores = [];

//displays if an answer is right or wrong
var answerResult = function(event) {
    
    var eventTarget = event.target;
    var verdictEl = document.createElement("h3");

    var verdictRemover = document.getElementById("right-or-wrong");
    verdictRemover.innerHTML= "";

    //reads "correct" attribute set to 1 or 0
    var isAnswered = eventTarget.hasAttribute("correct");
    if (isAnswered) {
        var isCorrect = eventTarget.getAttribute("correct");
        if (isCorrect == 1 ){
        verdictEl.textContent = "Correct!";
        correctAnswers++;
        }
        else{
            verdictEl.textContent = "Wrong!";
        }
        footerEl.appendChild(verdictEl);
    }
    createQuizForm();
}

//displays scores
var scoresPage = function() {

    var verdictRemover = document.getElementById("right-or-wrong");
    verdictRemover.innerHTML= "";

    var userName = document.getElementById("userInput").value;

    var pageRemover = document.getElementById("page-content");
    pageRemover.innerHTML= "";

    var highScores = document.createElement("h2");
    highScores.textContent="High Scores";
    pageContentEl.appendChild(highScores);

    var playerShower = document.createElement("p");
    playerShower.textContent = userName + " - " + correctAnswers;
    pageContentEl.appendChild(playerShower);

    var backBtn = document.createElement("button");
    backBtn.textContent = "Go Back";
    pageContentEl.appendChild(backBtn);

    var clearBtn = document.createElement("button");
    clearBtn.textContent= "Clear High Scores";
    pageContentEl.appendChild(clearBtn);

    backBtn.addEventListener("click", landingPageLaunch);
}   

//displays score + form submission for leaderboard
var finalPage = function() {

//clears page
    var pageRemover = document.getElementById("page-content");
    pageRemover.innerHTML= "";
    
    var finishedScreen = document.createElement("h1");
    finishedScreen.textContent="All Done!";
    pageContentEl.appendChild(finishedScreen);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + correctAnswers;
    pageContentEl.appendChild(finalScore);

    var nameForm = document.createElement("input"); 
    nameForm.textContent= "Enter name or initials";
    nameForm.setAttribute("id", "userInput");

    pageContentEl.appendChild(nameForm);

    var hiButton = document.createElement("button");
    hiButton.textContent = "Submit";
    pageContentEl.appendChild(hiButton);

    hiButton.addEventListener("click", scoresPage);
    
}   

var createQuizForm = function() {

    //clears the page
    var pageRemover = document.getElementById("page-content");
    pageRemover.innerHTML= "";

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

    //loop to create buttons
    for (var i= 1; i<selectedArray.length; i++) {

        var answerChoice = selectedArray[i];
    //I added a z to each correct answer to identify it, this code removes the z so the tester does not see the correct answer
        var testReplace = answerChoice.split('z').join('');
        var answerButtonEl=document.createElement("button");
        answerButtonEl.textContent= i + ": " + testReplace;

        answerButtonEl.setAttribute("button-id", i);
        answerButtonEl.className= "btn";
        pageContentEl.appendChild(answerButtonEl);
        
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
            answerButtonEl.addEventListener("click", finalPage);

        }
    }   
}

//start of landingPageLaunch function
//dynamically creates landing page upon load
var landingPageLaunch = function(){

    //initializing array here so that I can restart the quiz with a full array
    quizArray = [["Commonly used data types DO NOT include: ", "strings", "booleans", "zalerts", "numbers"], 
                 ["The condition in an if/else statement is enclosed with ____. ", "quotes","curly brackets","zparentheses","square brackets"],
                 ["Arrays in JavaScript can be used to store _______","numbers and strings","other arrays","booleans","zall of the above"],
                 ["String values must be enclosed within _____ when being assigned to variables","commas","curly brackets","zquotes","parentheses"],
                 ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash","for loops","zconsole log"]];

     //clears the page
     var pageRemover = document.getElementById("page-content");
     pageRemover.innerHTML= "";

     var verdictRemover = document.getElementById("right-or-wrong");
    verdictRemover.innerHTML= "";
 
    
    var introEl = document.createElement("h1");
    introEl.textContent="Coding Quiz Challenge!"
    pageContentEl.appendChild(introEl);

    var quizRulesEl = document.createElement("p");
    quizRulesEl.textContent="Try to answer the following code-relate questions with the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pageContentEl.appendChild(quizRulesEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    pageContentEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", createQuizForm);
} 
//end of landingPageLaunch function

//creates/loads landing page upon page load
window.addEventListener("load", landingPageLaunch);