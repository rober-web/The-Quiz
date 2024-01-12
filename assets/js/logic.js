
let start = document.getElementById('start');
let questions = document.getElementById('questions');
let questionTitle = document.getElementById('question-title');
let choices = document.getElementById('choices');
let endScreen = document.getElementById('end-screen');
let finalScore = document.getElementById('final-score');
let initials = document.getElementById('initials');
let submit = document.getElementById('submit');
let feedback = document.getElementById('feedback');
let timeContent = document.getElementById('time');
let time;

// ## Acceptance Criteria

// Create a code quiz that contains the following requirements:

// * A start button that when clicked a timer starts and the first question appears.


// A start button that when clicked a timer starts and the first question appears.
start.addEventListener('click', startQuiz);

const startQuiz = () => {
    time = 30; // Set initial time (in seconds)
    displayTime(); // Display the initial time

    // Start the countdown timer
    let timerInterval = setInterval(() => {
        time--;

        // Display the updated time
        displayTime();

        if (time <= 0) {
            // end the quiz
            clearInterval(timerInterval); // Stop the timer
        }
    }, 1000);
}

const displayTime = () => {
    // Update the time display on the screen
    //console.log(time);
    timeContent.textContent = time;
}
 
//   * Questions contain buttons for each answer.
//   * 
//   * When answer is clicked, the next question appears
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

//   * When the game ends, it should display their score and give the user the ability to save their initials and their score