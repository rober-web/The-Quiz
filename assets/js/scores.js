//Added DOMContentLoaded to run the code only after all related loads have finished first.
document.addEventListener("DOMContentLoaded", function () {
  // Get the scores from localStorage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Sort scores by descending order
  scores.sort((a, b) => b.score - a.score);

  // Get the id highscores from html to show scores later
  const scoresList = document.getElementById("highscores");

  //Iterate the score
  scores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials} - ${score.score} points`;
    scoresList.appendChild(listItem);
  });

  // Add event listener for the "Clear Scores" button
  const clearScoresButton = document.getElementById("clear");
  if (clearScoresButton) {
    clearScoresButton.addEventListener("click", clearScores);
  }
});

// Function to clear scores
const clearScores = () => {
  // Confirm with the user before clearing scores
  const confirmation = confirm("Are you sure you want to clear all scores?");
  if (confirmation) {
    // Clear scores from localStorage
    localStorage.removeItem("scores");

    // Reload the page to see the changes
    location.reload();
  }
};
