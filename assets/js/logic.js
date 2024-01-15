
import theQuestions from '../json/theQuestions.json' assert { type: 'json' };


let start = document.getElementById('start');
let startScreen = document.getElementById('start-screen');
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
let score = 0;
let wins = 0;
let loses = 0;


// ## Acceptance Criteria

// Create a code quiz that contains the following requirements:

// * A start button that when clicked a timer starts and the first question appears.


// A start button that when clicked a timer starts and the first question appears.


const startQuiz = () => {

    //turn the start screen off
    startScreen.children[1].style.display = 'none';

   
    //disable start button to avoid running the timer twice
    start.setAttribute('disabled', 'disabled'); 
    questions.classList.remove('hide');
    runningGame(); //start the game

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

            //enable the start button back after timer stops
            start.removeAttribute('disabled');
        }
    }, 1000);
    
    
}

const displayTime = () => {
    // Update the time display on the screen
    //console.log(time);
    timeContent.textContent = time;
}
 
start.addEventListener('click', startQuiz);
//   * Questions contain buttons for each answer.
//   * 
//   * When answer is clicked, the next question appears
//   * 
//   * If the answer clicked was incorrect then subtract time from the clock

// * The quiz should end when all questions are answered or the timer reaches 0.

//   * When the game ends, it should display their score and give the user the ability to save their initials and their score

/*  const questionsJson = ()=>{

    fetch('./assets/json/questions.json')
    .then((response) => response.json())
    .then((json) => console.log(json));

}  */

const runningGame = () => {

    // Check if theQuestions and questions array are defined
    if (theQuestions && theQuestions.questions && theQuestions.questions.length > 0) {
        // Display the title of the first question
        questionTitle.append(theQuestions.questions[0].question);
       // choices.append(theQuestions.questions[0].options[0]);

      for(let i=0; i<theQuestions.questions[0].options.length; i++){
            let theChoiceButton = document.createElement('button');
            let questionList = theQuestions.questions[0].options[i];

            theChoiceButton.innerHTML = questionList;
            choices.append(theChoiceButton);
        } 



        console.log(questionTitle.textContent = theQuestions.questions[0].question);
    } else {
        console.error('Questions array is undefined or empty.');
    }
}


//runningGame();