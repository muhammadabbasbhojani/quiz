const quizForm = document.getElementById('quiz-form');
const nextButton = document.getElementById('next-button');
const timer = document.querySelector('.timer');
const resultContainer = document.querySelector('.result-container');

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "a) Hyper Text Markup Language",
            "b) Hyperlinks and Text Markup Language",
            "c) Home Tool Markup Language",
            "d) None of the above"
        ],
        correctAnswer: "a"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "a) Cascading Style Sheet",
            "b) Computer Style Sheet",
            "c) Colorful Style Sheet",
            "d) Creative Style Sheet"
        ],
        correctAnswer: "a"
    },
    {
        question: "What is JavaScript primarily used for?",
        options: [
            "a) Adding interactivity to web pages",
            "b) Styling web pages",
            "c) Creating databases",
            "d) Displaying videos"
        ],
        correctAnswer: "a"
    },
    {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: [
            "a) 4",
            "b) '22'",
            "c) 22",
            "d) NaN"
        ],
        correctAnswer: "b"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "a) &lt;a&gt;",
            "b) &lt;h1&gt;",
            "c) &lt;p&gt;",
            "d) &lt;div&gt;"
        ],
        correctAnswer: "a"
    },
    {
        question: "What is the correct way to comment in JavaScript?",
        options: [
            "a) //This is a comment",
            "b) <!--This is a comment-->",
            "c) /*This is a comment*/",
            "d) --This is a comment--"
        ],
        correctAnswer: "a"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "a) color",
            "b) background-color",
            "c) font-size",
            "d) text-align"
        ],
        correctAnswer: "a"
    },
    {
        question: "What is the primary role of JavaScript in a web page?",
        options: [
            "a) To style the page",
            "b) To structure the content",
            "c) To add interactivity",
            "d) To define the layout"
        ],
        correctAnswer: "c"
    },
    {
        question: "Which of the following is not a JavaScript framework or library?",
        options: [
            "a) React",
            "b) Angular",
            "c) jQuery",
            "d) PHP"
        ],
        correctAnswer: "d"
    },
    {
        question: "What is the latest version of HTML as of 2022?",
        options: [
            "a) HTML5",
            "b) HTML4",
            "c) XHTML",
            "d) HTML2022"
        ],
        correctAnswer: "a"
    }
];

let currentQuestionIndex = 0;
let timeLeft = 120;
let correctAnswers = 0;
let incorrectAnswers = 0;

function startTimer() {
    const countdown = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft === 0) {
            clearInterval(countdown);
            checkAnswer(null); // Handle unanswered question
            displayResults();
        } else {
            timeLeft--;
        }
    }, 1000);
}

function changeQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // Change to the next question
        timeLeft = 120;
        displayQuestion();
    } else {
        // Quiz completed
        displayResults();
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.querySelector('.question').textContent = currentQuestion.question;

    for (let i = 0; i < 4; i++) {
        const choiceLabel = document.getElementById(`choice-${String.fromCharCode(97 + i)}`);
        choiceLabel.textContent = currentQuestion.options[i];
    }
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }
}

function displayResults() {
    quizForm.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <p>Quiz completed!</p>
        <p>Correct answers: ${correctAnswers}</p>
        <p>Incorrect answers: ${incorrectAnswers}</p>
        <p>Total Marks: ${correctAnswers * 10}</p>
    `;
}

nextButton.addEventListener('click', function(event) {
    event.preventDefault();
    const selectedAnswer = quizForm.querySelector('input[name="answer"]:checked');
    checkAnswer(selectedAnswer ? selectedAnswer.value : null);
    changeQuestion();
});

displayQuestion();
startTimer();
