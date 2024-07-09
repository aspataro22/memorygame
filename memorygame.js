const gameContainer = document.getElementById("game");
const resetButton = document.getElementById("reset-button");

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

// Shuffle function
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  gameContainer.innerHTML = ""; // Clear existing game board
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.classList.add('hidden'); // Initially hide the color
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Variables to keep track of game state
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let noClicking = false;

function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  currentCard.classList.add('flipped');

  if (!firstCard) {
    firstCard = currentCard;
  } else if (!secondCard) {
    secondCard = currentCard;

    if (firstCard.className === secondCard.className) {
      flippedCards += 2;
      firstCard = null;
      secondCard = null;
      if (flippedCards === COLORS.length) alert("Game Over! You've matched all the cards!");
    } else {
      noClicking = true;
      setTimeout(function () {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
        noClicking = false;
      }, 1000);
    }
  }
}

function resetGame() {
  shuffledColors = shuffle(COLORS);
  firstCard = null;
  secondCard = null;
  flippedCards = 0;
  noClicking = false;
  createDivsForColors(shuffledColors);
}

resetButton.addEventListener("click", resetGame);

createDivsForColors(shuffledColors);

