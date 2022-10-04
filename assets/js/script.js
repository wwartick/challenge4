var pageContentEl = document.querySelector("#page-content");
var footerEl = document.querySelector("#right-or-wrong");
var quizArray = [["Commonly used data types DO NOT include: ", "strings", "booleans", "zalerts", "numbers"], 
                 ["The condition in an if/else statement is enclosed with ____. ", "quotes","curly brackets","zparentheses","square brackets"],
                 ["Arrays in JavaScript can be used to store _______","numbers and strings","other arrays","booleans","zall of the above"],
                 ["String values must be enclosed within _____ when being assigned to variables","commas","curly brackets","zquotes","parentheses"],
                 ["A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash","for loops","zconsole log"]]

var test = function(event) {
    
    var eventTarget = event.target;
    var verdictEl = document.createElement("h3");

    var verdictRemover = document.getElementById("right-or-wrong");
    verdictRemover.innerHTML= "";

    var isAnswered = eventTarget.hasAttribute("correct");
    if (isAnswered) {
        var isCorrect = eventTarget.getAttribute("correct");
        if (isCorrect == 1 ){
        verdictEl.textContent = "Correct!";
        }
        else{
            verdictEl.textContent = "Wrong!";
        }
        
        footerEl.appendChild(verdictEl);
    }
    createQuizForm();
}

var finalPage = function() {

}

var createQuizForm = function() {
    //clears the page
    var pageRemover = document.getElementById("page-content");
    pageRemover.innerHTML= "";

    //creates random number to select random array
    var random = Math.floor(Math.random() * quizArray.length);
    var selectedArray = quizArray[random];

    //removes the randomly selected array from the main array
    quizArray.splice(selectedArray, 1);

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
        console.log(answerChoice)
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
            answerButtonEl.addEventListener("click", test);    
        }
        else {
            answerButtonEl.addEventListener("click", finalPage);
        }
    }   
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

    startButtonEl.addEventListener("click", createQuizForm);
} 
//end of landingPageLaunch function

//creates/loads landing page upon page load
window.addEventListener("load", landingPageLaunch);