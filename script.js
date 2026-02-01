// 4th grade questions - Math and Reading for now
const questionsBySubject = {
  math: [
    {
      question: "What is 7 × 8?",
      choices: ["48", "54", "56", "64"],
      correctIndex: 2
    },
    {
      question: "What is 36 ÷ 4?",
      choices: ["6", "8", "9", "10"],
      correctIndex: 2
    },
    {
      question: "What is 400 + 230?",
      choices: ["530", "630", "640", "700"],
      correctIndex: 0
    },
    {
      question: "Which fraction is greater?",
      choices: ["1/2", "3/4", "2/5", "1/3"],
      correctIndex: 1
    },
    {
      question: "Round 768 to the nearest hundred.",
      choices: ["700", "750", "760", "800"],
      correctIndex: 3
    }
  ],
  reading: [
    {
      question: "Tom walked his dog to the park every afternoon after school. What time of day?",
      choices: ["Morning", "Afternoon", "Evening", "Night"],
      correctIndex: 1
    },
    {
      question: "A 'desert' is BEST described as:",
      choices: [
        "Lots of trees and rain",
        "Little rain and few plants",
        "Tall buildings",
        "Frozen ocean"
      ],
      correctIndex: 1
    },
    {
      question: "In a story, the 'main character' is:",
      choices: [
        "Where it happens",
        "Most important person/animal",
        "The problem",
        "The ending"
      ],
      correctIndex: 1
    },
    {
      question: "Synonym for 'huge'?",
      choices: ["Tiny", "Enormous", "Little", "Short"],
      correctIndex: 1
    },
    {
      question: "The 'setting' of a story is:",
      choices: [
        "What happens first/next/last",
        "How the character feels",
        "Where and when it happens",
        "The lesson"
      ],
      correctIndex: 2
    }
  ]
};

// All the JavaScript to make it work
const subjectSelect = document.getElementById("subjectSelect");
const startButton = document.getElementById("startButton");
const quizDiv = document.getElementById("quiz");
const quizTitle = document.getElementById("quizTitle");
const questionContainer = document.getElementById("questionContainer");
const nextButton = document.getElementById("nextButton");
const resultDiv = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const restartButton = document.getElementById("restartButton");

let currentSubject = "math";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

startButton.addEventListener("click", startMission);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restart);

function startMission() {
  currentSubject = subjectSelect.value;
  currentQuestions = [...questionsBySubject[currentSubject]];
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  document.getElementById("intro").classList.add("hidden");
  resultDiv.classList.add("hidden");
  quizDiv.classList.remove("hidden");

  quizTitle.textContent = currentSubject === "math" ? "🧮 Math Mission" : "📚 Reading Mission";
  showQuestion();
}

function showQuestion() {
  questionContainer.innerHTML = "";
  nextButton.classList.add("hidden");
  answered = false;

  if (currentQuestionIndex >= currentQuestions.length) {
    endMission();
    return;
  }

  const q = currentQuestions[currentQuestionIndex];
  const questionElem = document.createElement("p");
  questionElem.textContent = `Question ${currentQuestionIndex + 1}: ${q.question}`;
  questionContainer.appendChild(questionElem);

  q.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.textContent = choiceText;
    btn.className = "choice-button";
    btn.addEventListener("click", () => handleAnswer(btn, index));
    questionContainer.appendChild(btn);
  });
}

function handleAnswer(button, chosenIndex) {
  if (answered) return;
  answered = true;

  const q = currentQuestions[currentQuestionIndex];
  const buttons = questionContainer.querySelectorAll(".choice-button");
  
  buttons.forEach((btn, index) => {
    if (index === q.correctIndex) {
      btn.classList.add("correct");
    }
    if (index === chosenIndex && chosenIndex !== q.correctIndex) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;
  });

  if (chosenIndex
