const questions = [
    {
        question: "Which is largest animal in the World?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is largest desert in the World?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true}
        ]
    },
    {
        question: "Which is largest country in the World?",
        answers: [
            {text: "Brazil", correct: false},
            {text: "China", correct: false},
            {text: "Russia", correct: true},
            {text: "The United States", correct: false}
        ]
    },
    {
        question: "Which is largest river in the World?",
        answers: [
            {text: "Amazon", correct: false},
            {text: "Mississippi", correct: false},
            {text: "Yangtze", correct: false},
            {text: "Nile", correct: true}
        ]
    },
    {
        question: "Which is largest continent in the World?",
        answers: [
            {text: "Africa", correct: false},
            {text: "Europe", correct: false},
            {text: "Asia", correct: true},
            {text: "North America", correct: false}
        ]
    },
    {
        question: "Which is largest economy in the World?",
        answers: [
            {text: "China", correct: false},
            {text: "India", correct: false},
            {text: "Russia", correct: false},
            {text: "The United States", correct: true}
        ]
    },
    {
        question: "Which is largest stadium in the World?",
        answers: [
            {text: "Beaver Stadium, United States", correct: false},
            {text: "Narendra Modi Stadium, India", correct: true},
            {text: "May Day Stadium, North Korea", correct: false},
            {text: "Michigan Stadium, United States", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const len = questions.length;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState () {
    nextButton.style.display = "none";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNext();
    }
    else {
        startQuiz();
    }
});
function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
function showScore () {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + len + "!";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
startQuiz();
