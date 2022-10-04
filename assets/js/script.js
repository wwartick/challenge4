var pageContentEl = document.querySelector("#page-content");

var beginQuiz = function(){
    console.log("event worked");
    var h1Remover = document.getElementById("intro-h1");
    var pRemover = document.getElementById("intro-p");
    var buttonRemover = document.getElementById("intro-button");
    h1Remover.remove();
    pRemover.remove();
    buttonRemover.remove();
}

var landingPageLaunch = function(){

    var introEl = document.createElement("h1");
    introEl.textContent="Coding Quiz Challenge!"
    introEl.id="intro-h1";
    document.body.appendChild(introEl);

    var quizRulesEl = document.createElement("p");
    quizRulesEl.id="intro-p"
    quizRulesEl.textContent="Try to answer the following code-relate questions with the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    document.body.appendChild(quizRulesEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.id="intro-button"
    startButtonEl.textContent = "Start Quiz";
    document.body.appendChild(startButtonEl);

    startButtonEl.addEventListener("click", beginQuiz);
}

window.addEventListener("load", landingPageLaunch);