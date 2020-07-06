/* Variables */
let scores, roundScore, activePlayer, gamePlaying, turnCount;

function initialization() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  /* Reset Scores and Player Names*/
  turnCount = 0;
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

initialization();

document.querySelector(".btn-new").addEventListener("click", initialization);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function rollDice() {
  document
    .querySelector("#score-" + activePlayer)
    .classList.remove("startRipple");

  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die) => {
    if (die.id == "die-" + activePlayer) {
      toggleClasses(die);

      die.dataset.roll = getRandomNumber(1, 6);
      if (gamePlaying) {
        var dice1 = die.dataset.roll;
        roundScore += parseInt(dice1);
      }
    }
  });
  turnCount++;
  scores[activePlayer] += parseInt(roundScore);
  //    Update the UI'
  updateUI(activePlayer);

  // Check if the player has already won the game or not.
  if (turnCount >= 10) {
    if (scores[0] >= scores[1]) {
      activePlayer = 0;
    } else {
      activePlayer = 1;
    }
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    gamePlaying = false;
  }
  nextPlayer();
}

function updateUI(player) {
  setTimeout(() => {
    document.querySelector("#score-" + player).innerHTML = scores[player];
    document.querySelector("#score-" + player).classList.add("startRipple");
  }, 1300);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
