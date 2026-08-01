/*
Project History:
Formerly Hangman Pro.
Now: Tracy's Garden.

Designed by Sol & Ron
Dedicated to Tracy Love ❤️

Build it with care.
Polish it with patience.
Make it fun to share.

The Garden always builds.
It never destroys.
*/


/*
=====================================
Garden Keeper
The Garden remembers its caretakers.
=====================================
*/

const gardenKeeper = {
  gardenName: "Tracy's Garden",
  season: "The Planting",

  planter: "",
  gardener: "",

  bloomStage: 0,
  hasVisited: false,
  lastVisit: null
};


/*
=====================================
Garden Memory
The Garden remembers between visits.
=====================================
*/

const gardenMemoryKey = "tracysGardenKeeper";

function rememberGarden() {
  try {
    localStorage.setItem(
      gardenMemoryKey,
      JSON.stringify(gardenKeeper)
    );
  } catch (error) {
    console.warn("The Garden could not save its memories.", error);
  }
}

function recallGarden() {
  try {
    const rememberedGarden =
      localStorage.getItem(gardenMemoryKey);

    if (!rememberedGarden) return;

    const savedGarden = JSON.parse(rememberedGarden);

    Object.assign(gardenKeeper, savedGarden);
  } catch (error) {
    console.warn("The Garden could not recall its memories.", error);
  }
}


/*
=====================================
Garden Places
=====================================
*/

const places = {
  welcome: document.getElementById("splashScreen"),
  identity: document.getElementById("identityScreen"),
  planting: document.getElementById("setupScreen"),
  passing: document.getElementById("passScreen"),
  garden: document.getElementById("gameScreen"),
  reflection: document.getElementById("resultScreen")
};


/*
=====================================
Garden Elements
=====================================
*/

const welcomeWhisper =
  document.getElementById("welcomeWhisper");

const passingMessage =
  document.getElementById("passingMessage");

const beginButton =
  document.getElementById("beginButton");

const startGameButton =
  document.getElementById("startGameButton");

const continueButton =
  document.getElementById("continueButton");

const playAgainButton =
  document.getElementById("playAgainButton");

const newGardenersButton =
  document.getElementById("newGardenersButton");

const stepOutButton =
  document.getElementById("stepOutButton");

const gardenTransition =
  document.getElementById("gardenTransition");

const transitionArt =
  document.getElementById("transitionArt");

const transitionWhisper =
  document.getElementById("transitionWhisper");

const gardenCelebration =
  document.getElementById("gardenCelebration");

const gardenCelebrationWhisper =
  document.getElementById("gardenCelebrationWhisper");
/*
=====================================
Identity Place Elements
=====================================
*/

const identityQuestion =
  document.getElementById("identityQuestion");

const identityWhisper =
  document.getElementById("identityWhisper");

const identityNameInput =
  document.getElementById("identityNameInput");

const identityContinueButton =
  document.getElementById("identityContinueButton");


/*
=====================================
Garden Play Elements
=====================================
*/

const secretWordInput =
  document.getElementById("secretWordInput");

const wordDisplay =
  document.getElementById("wordDisplay");

const wrongLettersEl =
  document.getElementById("wrongLetters");

const guessesLeftEl =
  document.getElementById("guessesLeft");

const keyboard =
  document.getElementById("keyboard");

const resultTitle =
  document.getElementById("resultTitle");

const resultMessage =
  document.getElementById("resultMessage");

const gardenMessage =
  document.getElementById("gardenMessage");

const bloomArt =
  document.getElementById("bloomArt");


/*
=====================================
Current Garden State
=====================================
*/

let secretWord = "";
let displayWord = [];
let restingLetters = [];
let guessesLeft = 6;
let gameActive = false;

let identityStep = "planter";
let identityPauseActive = false;


/*
=====================================
Garden Messages
=====================================
*/

const bloomStages = [
  "🌱",
  "🌿",
  "🍃",
  "🌷",
  "🌸",
  "🦋",
  "✨"
];

const gardenWhispers = [
  "Every correct letter helps the garden bloom.",
  "Something beautiful is beginning to grow.",
  "The garden is responding with life.",
  "A little more beauty has appeared.",
  "Keep going... the garden is blooming.",
  "There is still beauty yet to come.",
  "Sweet patience brings the softest petals to life.",
  "Every gentle choice sweetens the garden’s growth.",
  "A tender touch makes the blossoms grow brighter.",
  "There is pure joy in watching life unfold.",
  "The garden rewards your care with sweet success.",
  "Nurturing this space brings out its true beauty.",
  "The sweetest blooms grow from steady encouragement.",
  "Your kind efforts are sweetening the soil.",
  "Watch how beautifully it responds to your care.",
  "A sweet, vibrant landscape is quietly waking up.",
  "Something beautiful is blossoming.",
  "Each step nurtures a new seedling.",
  "The garden is waking up with color.",
  "A vibrant landscape is taking root here.",
  "Your efforts are feeding the fresh blooms.",
  "The soil is rich with future flowers.",
  "One more guess... the petals are starting to unfold.",
  "A hidden bud is waiting to open.",
  "Every success brings a splash of life.",
  "The garden grows stronger with your help."
];

const bloomCelebrations = [
  "Look what you grew together.",
  "The garden bloomed beautifully.",
  "Way to go, Tracy!",
  "That was fun!",
  "You brought beauty to the garden.",
  "Another flower has bloomed.",
  "What a peaceful little victory."
];

const gardenEncouragements = [
  "Try another letter... there is beauty yet to come.",
  "Not this one... the garden is still waiting.",
  "Keep going... something beautiful is growing.",
  "The garden rests for this letter.",
  "Another letter may help it bloom."
];


/*
=====================================
Garden Navigation
=====================================
*/

function visit(placeName) {
  Object.values(places).forEach(place => {
    place.classList.remove("active");
  });

  places[placeName].classList.add("active");
}


/*
=====================================
Garden Helpers
=====================================
*/

function cleanWord(word) {
  return word
    .trim()
    .toUpperCase()
    .replace(/[^A-Z ]/g, "");
}

function cleanName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ");
}

function randomMessage(messages) {
  return messages[
    Math.floor(Math.random() * messages.length)
  ];
}

function showIdentityControls() {
  identityNameInput.style.display = "";
  identityContinueButton.style.display = "";

  identityNameInput.disabled = false;
  identityContinueButton.disabled = false;
}

function hideIdentityControls() {
  identityNameInput.disabled = true;
  identityContinueButton.disabled = true;

  identityNameInput.style.display = "none";
  identityContinueButton.style.display = "none";
}


/*
=====================================
The Garden Gate
=====================================
*/

function prepareWelcome() {
  const gardenKnowsItsCaretakers =
    gardenKeeper.planter && gardenKeeper.gardener;

  if (gardenKnowsItsCaretakers) {
    welcomeWhisper.textContent =
      `Welcome back, ${gardenKeeper.planter} and ${gardenKeeper.gardener}. ` +
      "We're so glad you're here.";

    newGardenersButton.classList.remove("hidden");
  } else {
    welcomeWhisper.textContent =
      "We're so glad you're here.";

    newGardenersButton.classList.add("hidden");
  }
}

function beginGarden() {
  gardenKeeper.hasVisited = true;
  gardenKeeper.lastVisit = new Date().toISOString();

  rememberGarden();

  /*
  If the Garden does not yet know both names,
  begin the Identity conversation.
  */

  if (
    !gardenKeeper.planter ||
    !gardenKeeper.gardener
  ) {
    beginIdentity();
    return;
  }

  enterPlantingPlace();
}


/*
=====================================
Identity Journey
The Garden receives and recognizes.
=====================================
*/

function beginIdentity() {
  identityStep = gardenKeeper.planter
    ? "gardener"
    : "planter";

  identityPauseActive = false;

  visit("identity");
  prepareIdentityQuestion();
}

function prepareIdentityQuestion() {
  showIdentityControls();

  identityNameInput.value = "";

  if (identityStep === "planter") {
    identityQuestion.textContent =
      "May I know your name?";

    identityWhisper.textContent =
      "Every garden begins with someone who lovingly plants it.";

    identityNameInput.placeholder =
      "Your name";
  } else {
    identityQuestion.textContent =
      "And who will help the Garden bloom?";

    identityWhisper.textContent =
      "The Garden would be glad to know their name.";

    identityNameInput.placeholder =
      "Their name";
  }

  /*
  A quiet breath before the Garden is ready
  to receive an answer.
  */

  setTimeout(() => {
    identityNameInput.focus();
  }, 500);
}

function continueIdentity() {
  if (identityPauseActive) return;

  const enteredName =
    cleanName(identityNameInput.value);

  if (!enteredName) {
    identityWhisper.textContent =
      "A name may be offered whenever you are ready.";

    identityNameInput.focus();
    return;
  }

  if (identityStep === "planter") {
    receivePlanter(enteredName);
  } else {
    receiveGardener(enteredName);
  }
}

function receivePlanter(name) {
  gardenKeeper.planter = name;
  rememberGarden();

  identityPauseActive = true;

  const identitySymbol =
    document.querySelector(".identity-symbol");

  identityNameInput.classList.add("identity-controls-resting");
  identityContinueButton.classList.add("identity-controls-resting");
  identitySymbol.classList.add("receiving");

  setTimeout(() => {
    identityQuestion.classList.add("identity-message-resting");
    identityWhisper.classList.add("identity-message-resting");
  }, 400);

  setTimeout(() => {
    identitySymbol.textContent = "🌸";
    identitySymbol.classList.remove("receiving");
    identitySymbol.classList.add("blooming");

    identityQuestion.textContent =
      `It's a joy to meet you, ${name}.`;
    identityWhisper.textContent =
      "The Garden will remember.";

    identityQuestion.classList.remove("identity-message-resting");
    identityWhisper.classList.remove("identity-message-resting");
  }, 1000);

  setTimeout(() => {
    identityStep = "gardener";
    identityPauseActive = false;

    identitySymbol.textContent = "🌿";
    identitySymbol.classList.remove("blooming");
    identityNameInput.classList.remove("identity-controls-resting");
    identityContinueButton.classList.remove("identity-controls-resting");

    prepareIdentityQuestion();
  }, 3400);
}

function receiveGardener(name) {
  gardenKeeper.gardener = name;
  rememberGarden();

  identityPauseActive = true;

  const identitySymbol =
    document.querySelector(".identity-symbol");

  identityNameInput.classList.add("identity-controls-resting");
  identityContinueButton.classList.add("identity-controls-resting");
  identitySymbol.classList.add("receiving");

  setTimeout(() => {
    identityQuestion.classList.add("identity-message-resting");
    identityWhisper.classList.add("identity-message-resting");
  }, 400);

  setTimeout(() => {
    identitySymbol.textContent = "🌸";
    identitySymbol.classList.remove("receiving");
    identitySymbol.classList.add("blooming");

    identityQuestion.textContent =
      `We're so glad you're here, ${name}.`;
    identityWhisper.textContent =
      "The Garden has longed for your presence.";

    identityQuestion.classList.remove("identity-message-resting");
    identityWhisper.classList.remove("identity-message-resting");
  }, 1000);

  setTimeout(() => {
    identityPauseActive = false;
    identitySymbol.textContent = "🌿";
    identitySymbol.classList.remove("blooming");
    identityNameInput.classList.remove("identity-controls-resting");
    identityContinueButton.classList.remove("identity-controls-resting");

    enterPlantingPlace();
  }, 3600);
}


/*
=====================================
Planting Place
=====================================
*/

function enterPlantingPlace() {
  visit("planting");

  secretWordInput.value = "";

  setTimeout(() => {
    secretWordInput.focus();
  }, 400);
}

function plantWord() {
  const cleaned =
    cleanWord(secretWordInput.value);

  if (!cleaned) {
    alert("Please enter a word or phrase.");
    return;
  }

  secretWord = cleaned;

  visit("passing");

  /*
  Build this message safely so names are treated
  as text rather than HTML.
  */

  passingMessage.replaceChildren(
    document.createTextNode(
      `${gardenKeeper.planter} has planted today's word.`
    ),
    document.createElement("br"),
    document.createElement("br"),
    document.createTextNode(
      `${gardenKeeper.gardener}, it's your turn to help the Garden bloom. 🌸`
    )
  );
}


function showGardenCelebration(message) {
  gardenCelebrationWhisper.textContent = message;
  gardenCelebration.classList.add("active");
  gardenCelebration.setAttribute("aria-hidden", "false");
}

function hideGardenCelebration() {
  gardenCelebration.classList.remove("active");
  gardenCelebration.setAttribute("aria-hidden", "true");
}


/*
=====================================
The Garden Blooms
=====================================
*/

function enterGarden() {
  displayWord = secretWord
    .split("")
    .map(char => {
      return char === " " ? " " : "_";
    });

  restingLetters = [];
  guessesLeft = 6;
  gameActive = true;
  gardenKeeper.bloomStage = 0;

  buildKeyboard();
  updateGarden();
  renderWord();

  visit("garden");
}

function buildKeyboard() {
  keyboard.innerHTML = "";

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of letters) {
    const button =
      document.createElement("button");

    button.className = "key";
    button.textContent = letter;

    button.addEventListener("click", () => {
      chooseLetter(letter, button);
    });

    keyboard.appendChild(button);
  }
}

function chooseLetter(letter, button) {
  if (!gameActive) return;

  button.disabled = true;
  button.classList.add("used");

  let found = false;

  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      displayWord[i] = letter;
      found = true;
    }
  }

  if (found) {
    growGarden();
  } else {
    restingLetters.push(letter);
    guessesLeft--;

    gardenMessage.textContent =
      randomMessage(gardenEncouragements);
  }

  renderWord();
  updateStatus();
  checkGardenState();
}

function growGarden() {
  if (
    gardenKeeper.bloomStage <
    bloomStages.length - 1
  ) {
    gardenKeeper.bloomStage++;
  }

  /*
  Give the visitor a moment to notice
  the newly discovered letter.
  */

  setTimeout(() => {
    updateGarden();
  }, 500);
}

function updateGarden() {
  bloomArt.textContent =
    bloomStages[gardenKeeper.bloomStage];

  gardenMessage.textContent =
    randomMessage(gardenWhispers);
}

function renderWord() {
  wordDisplay.innerHTML = "";

  displayWord.forEach(char => {
    const tile =
      document.createElement("div");

    if (char === " ") {
      tile.className = "space-tile";
    } else {
      tile.className = "letter-tile";
      tile.textContent =
        char === "_" ? "" : char;
    }

    wordDisplay.appendChild(tile);
  });

  updateStatus();
}

function updateStatus() {
  wrongLettersEl.textContent =
    restingLetters.length
      ? restingLetters.join(" ")
      : "None";

  guessesLeftEl.textContent =
    guessesLeft;
}

function checkGardenState() {
  if (!displayWord.includes("_")) {
    completeGarden(true);
    return;
  }

  if (guessesLeft <= 0) {
    completeGarden(false);
  }
}

function completeGarden(bloomed) {
  gameActive = false;

  if (bloomed) {
    bloomArt.classList.add("receiving");

    setTimeout(() => {
      gardenMessage.classList.add("resting");
    }, 600);

    setTimeout(() => {
      gardenKeeper.bloomStage = bloomStages.length - 1;
      bloomArt.textContent = bloomStages[gardenKeeper.bloomStage];
      bloomArt.classList.remove("receiving");
      bloomArt.classList.add("blooming");

      gardenMessage.textContent =
        randomMessage(bloomCelebrations);
      gardenMessage.classList.remove("resting");
    }, 1200);

    /*
    The completed Garden opens across the whole screen.
    Let the visitor enjoy the entrance before Reflection.
    */

    setTimeout(() => {
      showGardenCelebration(
        `${gardenKeeper.gardener}, look what you helped bloom.`
      );
    }, 2500);

    setTimeout(() => {
      resultTitle.textContent = "The Garden bloomed.";
      resultTitle.className = "win";
      resultMessage.textContent =
        randomMessage(bloomCelebrations);
      bloomArt.classList.remove("blooming");

      visit("reflection");
      hideGardenCelebration();
    }, 5600);

    return;
  }

  bloomArt.classList.add("receiving");

  setTimeout(() => {
    gardenMessage.classList.add("resting");
  }, 600);

  setTimeout(() => {
    bloomArt.textContent = "🌿";
    bloomArt.classList.remove("receiving");
    gardenMessage.textContent =
      "There is beauty in the waiting.";
    gardenMessage.classList.remove("resting");
  }, 1200);

  setTimeout(() => {
    displayWord = secretWord.split("");
    renderWord();
    gardenMessage.classList.add("resting");
  }, 2800);

  setTimeout(() => {
    bloomArt.textContent = "🌱";
    gardenMessage.textContent =
      "Some things bloom in their own time.";
    gardenMessage.classList.remove("resting");
  }, 3400);

  setTimeout(() => {
    resultTitle.textContent =
      "The Garden is still growing.";
    resultTitle.className = "lose";
    resultMessage.textContent =
      `The planted word was "${secretWord}". ` +
      "There is always another season to grow.";
    bloomArt.classList.remove("receiving");
    visit("reflection");
  }, 5600);
}


function welcomeNewGardeners() {
  gardenKeeper.planter = "";
  gardenKeeper.gardener = "";
  gardenKeeper.bloomStage = 0;
  rememberGarden();

  prepareWelcome();
  beginIdentity();
}

function stepOutOfGarden() {
  gardenKeeper.lastVisit = new Date().toISOString();
  rememberGarden();
  prepareWelcome();
  visit("welcome");
}

/*
=====================================
Return to the Garden
=====================================
*/

function returnToGarden() {
  secretWord = "";
  displayWord = [];
  restingLetters = [];
  guessesLeft = 6;
  gameActive = false;

  gardenKeeper.bloomStage = 0;
  gardenKeeper.lastVisit =
    new Date().toISOString();

  rememberGarden();

  secretWordInput.value = "";
  wordDisplay.innerHTML = "";
  keyboard.innerHTML = "";

  bloomArt.textContent =
    bloomStages[0];

  gardenMessage.textContent =
    "Every correct letter helps the garden bloom.";

  enterPlantingPlace();
}


/*
=====================================
Garden Events
=====================================
*/

beginButton.addEventListener(
  "click",
  beginGarden
);

identityContinueButton.addEventListener(
  "click",
  continueIdentity
);

identityNameInput.addEventListener(
  "keydown",
  event => {
    if (event.key === "Enter") {
      continueIdentity();
    }
  }
);

startGameButton.addEventListener(
  "click",
  plantWord
);

continueButton.addEventListener(
  "click",
  enterGarden
);

playAgainButton.addEventListener(
  "click",
  returnToGarden
);

newGardenersButton.addEventListener(
  "click",
  welcomeNewGardeners
);

stepOutButton.addEventListener(
  "click",
  stepOutOfGarden
);


/*
=====================================
The Garden Awakens
=====================================
*/

recallGarden();
prepareWelcome();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("The Garden could not prepare offline paths.", error);
    });
  });
}