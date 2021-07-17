const gameContainer = document.getElementById('game');

const colors = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'pink',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'pink'
];

let cards = [];

let guesses = 0;

// helper function to shuffle an array
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {

    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    
    // create a blank card
    const newDiv = document.createElement('div');
    
    // add color to card
    newDiv.classList.add(color);

    // add color to back of card
    newDiv.style.backgroundColor = 'white';

    // add event listener to card
    newDiv.addEventListener('click', handleCardClick);

    // place card on the table
    gameContainer.append(newDiv);
  }
}

// when a card is clicked, it will add the card to an array,
// and flip the card on the UI. If the card matches the 
// second card clicked, both cards will stay face up
// othewise, they will flip back after 2 seconds
function handleCardClick(event) {

  let card = event.target;

   // make sure only two cards can be flipped at a time
   if (cards.length < 2) {
      cards.push(card);
      card.style.backgroundColor = card.classList[0];
    }

  setTimeout(function() {

    // compare cards. If they are not the same color, flip them back over
    if (cards.length == 2) {
      
      //shows number of guesses player has made so far
      guesses++;
      document.querySelector('h2').innerHTML = 'Total Guesses: ' + guesses;

      if (cards[0].classList[0] != cards[1].classList[0]) {
        for (card of cards) {
          card.style.backgroundColor = 'white';
        }
      }
    }

    // clear array so new cards can be compared
    cards.pop(cards[0]);
    cards.pop(cards[1]);

  }, 2000);
};

createDivsForColors(shuffledColors);
