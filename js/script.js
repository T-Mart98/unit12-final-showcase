/*
  Final Project: Quick Quiz 2.0
  Created by: Tyler Martinez
  Description: A multi-view quiz app designed to test the general knowledge of the user and shows a final score.

  Key Features:
    - Three views: Welcome screen, Quiz, and Results screen
    - Multiple choice questions that cover a wide area of general knowledge from science to pop culture to the arts.
    - A results page at the end that displays your score out of ten after completion.
    - Upgrade: Added dark mode toggle with localStorage to remember
      the user's theme preference between sessions, animations for correct and incorrect answers, five more questions for a total of ten and a randomizer so each attempt loads the questions in a different order.
*/


// ===========================================
// STATE - the data your app remembers
// ===========================================

// Put your state variables here. Examples:
// let score = 0;
// let currentQuestionIndex = 0;
// let isGameOver = false;

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

// ===========================================
// DATA - any constant data your app uses
// ===========================================

// Examples:
// const questions = [...];
// const pets = [...];

// Array for the general knowledge questions
const questions = [
  {
    question: "What color is an airplane black box?",
    choices: [
      "Orange",
      "Red",
      "Black",
      "Blue"
    ],
    correctIndex: 0
  },

  {
    question: "When did the first “Avatar” movie come out?",
    choices: [
      "2008",
      "2009",
      "2010",
      "2007"
    ],
    correctIndex: 1
  },

  {
    question: "What is considered the oldest human civilization?",
    choices: [
      "Egypt",
      "Mesoamerica",
      "Tenochtitlan",
      "Mesopotamia"
    ],
    correctIndex: 3
  },

  {
    question: "What was the original purpose of bubble wrap?",
    choices: [
      "Flooring",
      "Cooling material",
      "Textured wallpaper",
      "Insulation"
    ],
    correctIndex: 2
  },

  {
    question: "Which Italian city was the birthplace of pizza?",
    choices: [
      "Naples",
      "Venice",
      "Florence",
      "Rome"
    ],
    correctIndex: 0
  },

    {
    question: "What is the fourth state of matter, after solid, liquid, and gas?",
    choices: [
      "Ether",
      "Plasma",
      "Energy",
      "Particle"
    ],
    correctIndex: 1
  },

    {
    question: "What is the longest river on Earth?",
    choices: [
      "The Amazon River",
      "The Nile",
      "The Yangtze",
      "The Mississippi"
    ],
    correctIndex: 0
  },

    {
    question: " Which artist painted the famous masterpiece The Starry Night?",
    choices: [
      "Claude Monet",
      "Pablo Picasso",
      "Leonardo Da Vinci",
      "Vincent van Gogh"
    ],
    correctIndex: 3
  },

    {
    question: "Which of the following is scientifically classified as a fruit rather than a vegetable?",
    choices: [
      "Pumpkin",
      "Rhubarb",
      "Peppers",
      "Squash"
    ],
    correctIndex: 1
  },

    {
    question: "Which of these countries is both an island and a continent?",
    choices: [
      "New Zealand",
      "Japan",
      "Australia",
      "Madagascar"
    ],
    correctIndex: 2
  },
];


// ===========================================
// DOM REFERENCES - grab elements once at top
// ===========================================

// Examples:
// const startBtn = document.getElementById("startBtn");
// const scoreDisplay = document.getElementById("score");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choicesList");
const feedbackText = document.getElementById("feedbackText");
const scoreNumber = document.getElementById("scoreNumber");
const scoreMessage = document.getElementById("scoreMessage");

// ===========================================
// FUNCTIONS - each one does ONE clear job
// ===========================================

// Reset all state and start the app fresh
function startQuiz() {
  shuffleQuestions();
  currentQuestion = 0;
  score = 0;
  displayQuestion();
  goToView("quizView");
}  

// Toggles dark mode on/off
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  let isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// Switches between views in a multi-view app
function goToView(viewId) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active");
  });
  document.getElementById(viewId).classList.add("active");
}

// Switches to the next question in the quiz
function nextQuestion() {
  currentQuestion = currentQuestion + 1;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

// Shows the final result at the end of the quiz
function showResults() {
  scoreNumber.textContent = score;
  if (score === questions.length) {
    scoreMessage.textContent = "Perfect score! Amazing!";
  } else if (score >= 7) {
    scoreMessage.textContent = "Nice work!";
  } else {
    scoreMessage.textContent = "Give it another try!";
  }
  goToView("resultsView");
}

// Resets the quiz for another go
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  goToView("homeView");
}

// Displays the questions on the quiz view
function displayQuestion() {
  let q = questions[currentQuestion];

  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionText.textContent = q.question;

  choicesList.innerHTML = "";
  q.choices.forEach((choice, index) => {
    let btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", function() {
      handleAnswer(index, btn);
    });
    choicesList.appendChild(btn);
  });

  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  nextBtn.disabled = true;
  hasAnswered = false;
}

// Handles the answer logic for each question and the results tally at the end
function handleAnswer(pickedIndex, clickedBtn) {
  if (hasAnswered) return;   
  hasAnswered = true;

  const correctIndex = questions[currentQuestion].correctIndex;

  if (pickedIndex === correctIndex) {
    clickedBtn.classList.add("correct");
    feedbackText.textContent = "\u2705 Correct!";
    feedbackText.classList.add("correct");
    score = score + 1;
  } else {
    clickedBtn.classList.add("wrong");
    feedbackText.textContent = "\u274c Wrong!";
    feedbackText.classList.add("wrong");
    
    const allBtns = document.querySelectorAll(".choice-btn");
    allBtns[correctIndex].classList.add("correct");
  }

  nextBtn.disabled = false;
  updateScoreDisplay();
  disableChoices();
}

// Apply the bounce when answer is right
function showCorrect(buttonElement) {
  buttonElement.classList.add("correct");
  setTimeout(() => {
    buttonElement.classList.remove("correct");
  }, 500);
}

// Randomizes the order of the questions only
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [questions[i], questions[randomIndex]] =
      [questions[randomIndex], questions[i]];
  }
}

// Gives live score towards the bottom of the quiz and updates after each question
function updateScoreDisplay() {
  document.getElementById("liveScore").textContent = `${score}/10`;
}

// Disables all of the choice options once an answer has been clicked
function disableChoices() {
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
  });
}
// ===========================================
// EVENT LISTENERS - wire up the buttons
// ===========================================

// Dark mode toggle (works if you have a button with id="darkBtn")
const darkBtn = document.getElementById("darkBtn");
if (darkBtn) {
  darkBtn.addEventListener("click", toggleDarkMode);
}

// Add your own event listeners here. Examples:
// document.getElementById("startBtn").addEventListener("click", startApp);
// document.getElementById("submitBtn").addEventListener("click", checkAnswer);

// Starts on quiz once this button is clicked
startBtn.addEventListener("click", startQuiz);

// Loads the next question once this button is clicked
nextBtn.addEventListener("click", nextQuestion);

// Restarts the quiz once this button is clicked
restartBtn.addEventListener("click", resetQuiz);

// ===========================================
// INITIALIZATION - runs once on page load
// ===========================================

// Restore dark mode preference if user previously chose it
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Run your initial setup here. Examples:
// startApp();
// loadHighScore();

console.log("Final Project loaded.");
