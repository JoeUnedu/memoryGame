const gameContainer = document.querySelector("#game");
let memoryGameCount = document.querySelector(".memoryGameCount");
let memoryGame = 10;
memoryGameCount.textContent = memoryGame;

const COLORS = [
  { colorScr: "./imgs/red.png", name: "red" }, // names is used for the setAtribute
  { colorScr: "./imgs/blue.png", name: "blue" },
  { colorScr: "./imgs/green.png", name: "green" },
  { colorScr: "./imgs/orange.png", name: "orange" },
  { colorScr: "./imgs/purple.png", name: "purple" },
  { colorScr: "./imgs/red.png", name: "red" },
  { colorScr: "./imgs/blue.png", name: "blue" },
  { colorScr: "./imgs/green.png", name: "green" },
  { colorScr: "./imgs/orange.png", name: "orange" },
  { colorScr: "./imgs/purple.png", name: "purple" },
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    // give it a class attribute for the value we are looping over
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // give the card information from img src
    face.src = color.colorScr;
    // append the div to the element with an id of game
    card.setAttribute("name", color.name); // set the name on specific color for each loop
    gameContainer.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    // call a function handleCardClick when a div is clicked on
    card.addEventListener("click", function (event) {
      handleCardClick(event);
      card.classList.toggle("toggleCard");
    });
  }
}

// TODO: Implement this function!
const handleCardClick = function (event) {
  // you can use event.target to see which element was clicked
  const elementClicked = event.target; // everytime we clicked  without waiting on twowrong it flips
  elementClicked.classList.add("flipp");
  const flippCard = document.querySelectorAll(".flipp");
  let toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippCard);
  if (flippCard.length === 2) {
    if (
      flippCard[0].getAttribute("name") === flippCard[1].getAttribute("name")
    ) {
      console.log("it is a match");
      flippCard.forEach((card) => {
        card.classList.remove("flipp");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("Wrong");
      flippCard.forEach((card) => {
        card.classList.remove("flipp");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      memoryGame--;
      memoryGameCount.textContent = memoryGame;
      if (memoryGame === 0) {
        restart("Keep Trying");
      }
    }
  }

  if (9 === toggleCard.length) {
    restart(
      "Congratulation!!!, you are a winner.Please refresh the browser to start"
    );
  }
};
const restart = function (text) {
  let cardInfo = shuffle(shuffledColors);
  let face = document.querySelectorAll(".face");
  let card = document.querySelectorAll(".card");
  gameContainer.style.pointerEvents = "none"; //nothing is clickable until game is completley reset
  cardInfo.forEach((element, index) => {
    card[index].classList.remove("toggleCard"); // if we loose toggle back of card to original position
    // randomize the restart
    setTimeout(() => {
      card[index].style.pointerEvents = "all"; // when game reset we can still click back again all
      face[index].src = element.colorScr;
      card[index].setAttribute("name", element.name); // update the name as we restart
      gameContainer.style.pointerEvents = "all";
    }, 1000);
  });
  memoryGame = 10;
  memoryGameCount.textContent = memoryGame;
  setTimeout(() => window.alert(text), 100);
};

/* */
// when the DOM loads
createDivsForColors(shuffledColors);
