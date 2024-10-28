const questions = [
    {
        question: "Кое от изброените е твърдо тяло?",
        answers: [
            { text: "Вода", correct: false },
            { text: "Въздух", correct: false },
            { text: "Камък", correct: true }
        ]
    },
    {
        question: "Кое вещество е течност?",
        answers: [
            { text: "Мляко", correct: true },
            { text: "Захар", correct: false },
            { text: "Стъкло", correct: false }
        ]
    },
    {
        question: "Кое вещество е газ?",
        answers: [
            { text: "Мед", correct: false },
            { text: "Въздух", correct: true },
            { text: "Лед", correct: false }
        ]
    },
    // Добави всички останали въпроси тук
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answersElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('div');
        button.classList.add('answer');
        button.innerText = answer.text;
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answersElement.appendChild(button);
    });

    nextButton.classList.add('hidden');
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add('correct');
        score++;
        scoreElement.innerText = score;
    } else {
        button.classList.add('wrong');
    }
    
    Array.from(answersElement.children).forEach(child => {
        child.classList.add('disabled');
    });
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
});

function endQuiz() {
    questionElement.innerText = `Вие събрахте общо ${score} точки!`;
    nextButton.classList.add('hidden');
    answersElement.innerHTML = '';

    let message = '';
    if (score >= 9) {
        message = 'Справихте се отлично!';
    } else if (score >= 7) {
        message = 'Справихте се много добре!';
    } else if (score >= 5) {
        message = 'Справихте се добре!';
    } else {
        message = 'Прочети още по темата и играй отново!';
    }

    const endMessage = document.createElement('div');
    endMessage.id = 'end-message';
    endMessage.innerText = message;
    answersElement.appendChild(endMessage);
}

startQuiz();
