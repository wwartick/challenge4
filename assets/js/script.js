var pageContentEl = document.querySelector("#page-content");

var introPageLoader = function (event) {

    console.log("working kinda");

    event.preventDefault();
    var boldSentencesEl=document.querySelector("#bold-sentences");
    var boldTitleEl=document.createElement("h1")

    var landingWordsEl=document.querySelector("#landing-words")
    var rulesEl=document.createElement("p")

    boldSentencesEl.textContent="Coding Quiz Challenge";
    landingWordsEl.textContent="Try to answer the following code-relate questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    boldSentencesEl.appendChild(boldTitleEl);
    landingWordsEl.appendChild(rulesEl);


}

console.log("hello");
window.addEventListener("load", introPageLoader);