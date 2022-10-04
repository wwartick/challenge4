var pageContentEl = document.querySelector("#page-content");
var quizArray = [["Commonly used data types DO NOT include: ", "strings", "booleans", "zalerts", "numbers"], 
                 ["The condition in an if/else statement is enclosed with ____. ", "quotes","curly brackets","zparentheses","square brackets"],
                 ["Arrays in JavaScript can be used to store _______","numbers and strings","other arrays","booleans","zall of the above"],
                 ["String values must be enclosed within _____ when being assigned to variables","commas","curly brackets","zquotes","parentheses"],
                 ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash","for loops","zconsole log"]]

var test = function() {
    console.log("wow this far huh");
}
var createQuizForm = function() {
    //creates random number to select random array
    var random = Math.floor(Math.random() * quizArray.length);
    var selectedArray = quizArray[random];
    quizArray.splice(selectedArray, 1);
    console.log(quizArray);
    var quizQuestionEl = document.createElement("h1");
    quizQuestionEl.textContent = selectedArray[0];
    pageContentEl.appendChild(quizQuestionEl);



    for (var i= 1; i<selectedArray.length; i++) {

        var answerChoice = selectedArray[i];
        var testReplace = answerChoice.split('z').join('');
        var answerButtonEl=document.createElement("button");

        answerButtonEl.textContent= i + ": " + testReplace;
        answerButtonEl.setAttribute("button-id", i);
        answerButtonEl.className= "btn answer-btn";
        pageContentEl.appendChild(answerButtonEl);
        

        var answerChoice = selectedArray[i];
        if (!answerChoice.indexOf("z")) {
            answerButtonEl.setAttribute("right-or-wrong", "right");
        }
        else{
            answerButtonEl.setAttribute("right-or-wrong", "wrong");
        }
        if (quizArray.length > 0){
        answerButtonEl.addEventListener("click", clearIntro);    
        }
        else {
            answerButtonEl.addEventListener("click", test);
        }
    }   
}

var clearIntro = function(){
    //removes the landing page elements
    var pageRemover = document.getElementById("page-content");
    pageRemover.innerHTML= "";

    createQuizForm();
}

//start of landingPageLaunch function
//dynamically creates landing page upon load
var landingPageLaunch = function(){

    var introEl = document.createElement("h1");
    introEl.textContent="Coding Quiz Challenge!"
    introEl.id="intro-h1";
    pageContentEl.appendChild(introEl);

    var quizRulesEl = document.createElement("p");
    quizRulesEl.id="intro-p"
    quizRulesEl.textContent="Try to answer the following code-relate questions with the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pageContentEl.appendChild(quizRulesEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.id="intro-button"
    startButtonEl.textContent = "Start Quiz";
    pageContentEl.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", clearIntro);
} 
//end of landingPageLaunch function

//creates/loads landing page upon page load
window.addEventListener("load", landingPageLaunch);