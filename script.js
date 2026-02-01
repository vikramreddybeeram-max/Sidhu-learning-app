// COMPLETE script.js - 4th grade questions
const questionsBySubject = {
  math: [
    {question: "What is 7 × 8?", choices: ["48", "54", "56", "64"], correctIndex: 2},
    {question: "What is 36 ÷ 4?", choices: ["6", "8", "9", "10"], correctIndex: 2},
    {question: "What is 400 + 230?", choices: ["530", "630", "640", "700"], correctIndex: 0},
    {question: "Which fraction is greater?", choices: ["1/2", "3/4", "2/5", "1/3"], correctIndex: 1},
    {question: "Round 768 to nearest hundred.", choices: ["700", "750", "760", "800"], correctIndex: 3}
  ],
  reading: [
    {question: "Tom walked his dog every afternoon after school. What time?", choices: ["Morning", "Afternoon", "Evening", "Night"], correctIndex: 1},
    {question: "A 'desert' is BEST described as:", choices: ["Lots of trees", "Little rain", "Tall buildings", "Frozen ocean"], correctIndex: 1},
    {question: "The 'main character' is:", choices: ["Where it happens", "Most important person", "The problem", "The ending"], correctIndex: 1},
    {question: "Synonym for 'huge'?", choices: ["Tiny", "Enormous", "Little", "Short"], correctIndex: 1},
    {question: "The 'setting' is:", choices: ["Order of events", "Feelings", "Where/when", "Lesson"], correctIndex: 2}
  ]
};

// Get all elements
const subjectSelect = document.getElementById("subjectSelect");
const startButton = document.getElementById("startButton");
const introDiv = document.getElementById("intro");
const quizDiv = document.getElementById("quiz");
const quizTitle = document.getElementById("quizTitle");
const questionContainer = document.getElementById("questionContainer");
const nextButton = document.getElementById("nextButton");
const resultDiv = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const restartButton = document.getElementById("restartButton");

// Game state
let currentSubject = "math";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Event listeners
startButton.addEventListener("click", startMission);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restart);

function startMission() {
  currentSubject = subjectSelect.value;
  currentQuestions = [...questionsBySubject[currentSubject]];
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  introDiv.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  resultDiv.classList.add("hidden");

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
  const qElem = document.createElement("p");
  qElem.textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
  qElem.style.fontWeight = "bold";
  questionContainer.appendChild(qElem);

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-button";
    btn.addEventListener("click", () => handleAnswer(index));
    questionContainer.appendChild(btn);
  });
}

function handleAnswer(chosenIndex) {
  if (answered) return;
  answered = true;

  const q = currentQuestions[currentQuestionIndex];
  const buttons = questionContainer.querySelectorAll(".choice-button");

  buttons.forEach((btn, index) => {
    if (index === q.correctIndex) {
      btn.classList.add("correct");
    } else if (index === chosenIndex) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;
  });

  if (chosenIndex === q.correctIndex) score++;
  nextButton.classList.remove("hidden");
}

function showNextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function endMission() {
  quizDiv.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  scoreText.textContent = `You got ${score}/${currentQuestions.length} correct! 🎉`;
}

function restart() {
  introDiv.classList.remove("hidden");
  quizDiv.classList.add("hidden");
  resultDiv.classList.add("hidden");
}
