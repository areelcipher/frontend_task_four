const startButton = document.querySelector('#start-button');
const startDiv = document.querySelector('#start');
const questionsDiv = document.querySelector('#questions');

const question = document.querySelector('#question');
const optionOne = document.querySelector('#option-0');
const optionTwo = document.querySelector('#option-1');
const optionThree = document.querySelector('#option-2');
const optionFour = document.querySelector('#option-3');
const questionNumber = document.querySelector('#question-number-value');
const totalQuestions = document.querySelector('#total-number-of-question');
const options = document.querySelector('#options').children;
const nextButton = document.querySelector('#next');
const correctAnswers = document.querySelector('#correct-answers');
const totalScore = document.querySelector('#total-score');
const scorePercentage = document.querySelector('#score-percentage');
const tryAgain = document.querySelector('#try-again');
const mark = document.querySelector('#score');
const reset = document.querySelector('#reset');
let questionIndex;
let index = 0;
let questionArr = [];
let myArray = [];
let score = 0;

const questions = [
    {
        question: 'What is the approximate value of mathematical constant?',
        options: ["3.14", "1.62", "2.72", "1.41"],
        answer: 2
    },
    {
        question: 'The decimal number 31 in hexadecimal would be what?',
        options: ["3D", "2E", "1B", "1F"],
        answer: 3
    },
    {
        question: 'What is the 100th digit of Pi?',
        options: ["4", "9","7","2"],
        answer: 1
    },
    {
        question: 'The sum of angles in a triangle is',
        options: ['180', '90', '360', '270'],
        answer: 0
    },
    {
        question: 'What is the past tense of "is"?',
        options: ['had', 'were', 'is', 'was'],
        answer: 3
    }
];

startButton.addEventListener('click', () => {
    startDiv.classList.add('hide');
    questionsDiv.classList.remove('hide');
})

totalQuestions.innerHTML = questions.length;

const load = () => {
    questionNumber.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].question;
    optionOne.innerHTML = questions[questionIndex].options[0];
    optionTwo.innerHTML = questions[questionIndex].options[1];
    optionThree.innerHTML = questions[questionIndex].options[2];
    optionFour.innerHTML = questions[questionIndex].options[3];
    index++;
}

const check = (element) => {
    if (element.id == 'option-' + questions[questionIndex].answer) {
        element.classList.add('correct');
        score++;;
        mark.innerHTML = score
    } else {
        element.classList.add('wrong');
    }

    disableOptions()
}

const disableOptions = () => {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if (options[i].id == 'option-' + questions[questionIndex].answer) {
            options[i].classList.add('correct');
        }
    }
}

const enableOptions = () => {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('disabled', 'correct', 'wrong');
    }
}

const validate = () => {
    if (!options[0].classList.contains('disabled')) {
        alert('Please select one option')
    } else {
        enableOptions()
        randomQuestion()
    }
}

nextButton.addEventListener('click', () => {
    validate();
});

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = 0;
    if (index == questions.length) {
        quizOver();
    } else {
        if (questionArr.length > 0) {
            for (let i = 0; i < questionArr.length; i++) {
                if (questionArr[i] == randomNumber) {
                    hitDuplicate = 1;
                    break;
                }
            }
            if (hitDuplicate == 1) {
                randomQuestion();
            } else {
                questionIndex = randomNumber;
                load();
                myArray.push(questionIndex);
            }
        } if (questionArr.length == 0) {
            questionIndex = randomNumber;
            load();
            myArray.push(questionIndex);
        }
        questionArr.push(randomNumber);
    }
}

const quizOver = () => {
    document.querySelector('#result').classList.remove('hide');
    document.querySelector('#questions').classList.add('hide');
    correctAnswers.innerHTML = score;
    totalScore.innerHTML = questions.length;
    scorePercentage.innerHTML = Math.round((score/questions.length) * 100) + '%';
}

tryAgain.addEventListener('click', () => {
    window.location.reload();
});

reset.addEventListener('click', () => {
    window.location.reload();
});

window.onload = () => {
    randomQuestion();
}