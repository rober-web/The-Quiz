import theQuestions from "../json/theQuestions.json" assert { type: "json" };

let start = document.getElementById("start");
let startScreen = document.getElementById("start-screen");
let questions = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials");
let submit = document.getElementById("submit");
let feedback = document.getElementById("feedback");
let timeContent = document.getElementById("time");
let time;
let score = 0;
let wins = 0;
let loses = 0;
let currentIndex = 0;
let timerInterval;

// * A start button that when clicked a timer starts and the first question appears.

//Start the Quiz

const startQuiz = () => {
  //remove start button to avoid timer runing more than once
  //disable start button
  start.setAttribute("disabled", "disabled");
  start.classList.add("hide");

  // Hide the start screen
  startScreen.children[1].classList.add("hide");

  // Show the questions section
  questions.classList.remove("hide");

  // Start the timer

  theTimer(); // Start the timer

  // Load the first question
  loadQuestion();
};

//The Timer
const theTimer = () => {
  time = 60; // Set initial time (in seconds)

  //displayTime(); // Display the initial time
  timeContent.textContent = time;

  // Start the countdown timer
  timerInterval = setInterval(() => {
    time--;

    // Display the updated time
    // displayTime();
    timeContent.textContent = time;

    if (time <= 0) {
      // end the quiz
      clearInterval(timerInterval); // Stop the timer
      endQuiz();
      //
      //enable the start button back after timer stops
      //start.classList.remove("hide");
      //start.removeAttribute("disabled");
    }
  }, 1000);
};

//Timer penalizer | It will rest time for those wrong answers

const timerPenalty = () => {
  time = time - 10;
  //if time is less than zero set its content to zero to avoid it going on minus
  if (time <= 0) {
    return (timeContent.textContent = 0);
  }

  // Check if the timer has reached 0
  if (time <= 0) {
    // End the quiz if the timer reaches 0
    endQuiz();
  }
};

//   * Questions contain buttons for each answer.

//   * When answer is clicked, the next question appears

//loadQuestion function will load the questions and automatically go forward
//once the player clicks on any question whether right or wrong

const loadQuestion = () => {
  // Check if there are still questions to display
  if (currentIndex < theQuestions.questions.length) {
    // Get the current question
    const currentQuestion = theQuestions.questions[currentIndex];

    // Display the question title according to the current one
    questionTitle.textContent = currentQuestion.question;

    // Clear previous choices
    choices.innerHTML = "";

    // Display the answer options as buttons
    currentQuestion.options.forEach((option) => {
      //Dreate a button for each option
      const optionButton = document.createElement("button");

      //Write the optional answer to the button
      optionButton.textContent = option;

      // Add click event listener to handle answer selection
      optionButton.addEventListener("click", () =>
        handleAnswer(option, currentQuestion.correctAnswer)
      );

      // Append the options to the #choices in html
      choices.appendChild(optionButton);
    });
  } else {
    // No more questions, end the quiz
    endQuiz();
  }
};

//handleAnswer function will manage the questions and answers
//It will run certain conditions based on the right or wrong answers
//and will forward to the next question
//two parameters were needed to handle the correct answers and the captured buttons

const handleAnswer = (selectedAnswer, correctAnswer) => {
  // Check if the selected answer is correct
  if (selectedAnswer === correctAnswer) {
    // Correct answer
    playCorrectAudio(); //play the audio for the correct answer
    score += 10; // Adjust the scoring according to needs
    wins++; //collect scores
  } else {
    // Incorrect answer
    playWrongAudio(); //play the audio for the wrong answer
    timerPenalty(); // Deduct time for incorrect answer
    loses++;
  }

  // Move to the next question
  currentIndex++;

  // Load the next question
  loadQuestion();
};

//Ending Quiz
const endQuiz = () => {
  // * The quiz should end when all questions are answered or the timer reaches 0.
  //   * When the game ends, it should display their score and give the user the ability to save their initials and their score

  // Stop the timer (clear the interval)
  clearInterval(timerInterval);

  // Show the final score
  finalScore.textContent = score;

  // Show the end screen
  endScreen.classList.remove("hide");

  // Allow the user to save initials and score
  submit.addEventListener("click", saveScore);

  //
  questions.classList.add("hide");

  /*  start.classList.remove("hide");
    start.removeAttribute("disabled"); */
};

//save the score

const saveScore = () => {
  //Avoid the user from setting spaces on their initials
  const userInitials = initials.value.trim();

  if (userInitials !== "") {
    // Retrieve existing scores from localStorage
    const existingScores = JSON.parse(localStorage.getItem("scores")) || [];

    // Add the current score to the array
    existingScores.push({ initials: userInitials, score });

    // Save the updated scores back to localStorage
    localStorage.setItem("scores", JSON.stringify(existingScores));

    // Redirect the page to the highscore.html page
    window.location.href = "highscores.html";
  } else {
    // Bring feedback or validation if the initials are not entered
    feedback.textContent = "Please enter your initials!";
  }
};

//Play audios
// Added functions to be called when the user clicks on the answers
const playCorrectAudio = () => {
  const correctAudio = document.createElement("audio");
  correctAudio.id = "correct-audio";
  correctAudio.src = "./assets/sfx/correct.wav";
  document.body.appendChild(correctAudio); // Append the audio element to the body or a suitable parent element

  // Play the audio
  correctAudio.play();
};

const playWrongAudio = () => {
  const correctAudio = document.createElement("audio");
  correctAudio.id = "correct-audio";
  correctAudio.src = "./assets/sfx/incorrect.wav";
  document.body.appendChild(correctAudio); // Append the audio element to the body or a suitable parent element

  // Play the audio
  correctAudio.play();
};

// Add an event listener to the start button
start.addEventListener("click", startQuiz);
