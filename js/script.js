const questions = [{
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sherl Sandberg",
      c: "Brendan Eich",
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "npm",
      b: "TypeScript",
      c: "Node.js",
    },
    correctAnswer: "a"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "ESLint",
      c: "jQuery",
      d: "RequireJS",
    },
    correctAnswer: "b"
  }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
  const output = [];
  questions.forEach((currentQuestion, index) => {
    const answers = [];
    for (var letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question-${index}" value="${letter}" />${currentQuestion.answers[letter]}
        </label>`
      );
    }
    output.push(
      `<div class="slide">
        <h2 class="question">${currentQuestion.question}</h2>
        <div class="answers">${answers.join('')}</div>
      </div>`
    );
  });
  quizContainer.innerHTML = output.join('');
}

function showResults() {
  let answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;
  questions.forEach((currentQuestion, index) => {
    const answerContainer = answerContainers[index];
    const selector = 'input[name=question-' + index + ']:checked';
    userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[index].style.color = 'lightgreen';
    } else {
      answerContainers[index].style.color = 'red';
    }

  });
  resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

buildQuiz();

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

showSlide(currentSlide);
submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);