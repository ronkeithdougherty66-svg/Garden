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
  soloPlanter: "",
  soloGardener: "",
  mode: "together",

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

const soloGardenButton =
  document.getElementById("soloGardenButton");

const startGameButton =
  document.getElementById("startGameButton");

const concealWordButton =
  document.getElementById("concealWordButton");

const wordPrivacyHint =
  document.getElementById("wordPrivacyHint");

const plantingPrompt =
  document.getElementById("plantingPrompt");

const nextRoundMessage =
  document.getElementById("nextRoundMessage");

const installGardenButton =
  document.getElementById("installGardenButton");

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
let wordIsConcealed = false;
let roundReadyToRotate = false;
let deferredInstallPrompt = null;
let soloWordIndex = -1;


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
  "The garden grows stronger with your help.",
  "A new petal has found the light.",
  "The Garden is opening one quiet color at a time.",
  "Your patience is becoming part of the bloom.",
  "A little more life has entered the Garden.",
  "The next blossom is closer than it was before.",
  "The roots are listening, and the flowers are answering.",
  "Every discovered letter brings the Garden nearer to spring.",
  "A gentle success has warmed the soil.",
  "Another corner of the Garden has awakened.",
  "The Garden is grateful for every careful guess.",
  "A hidden color is beginning to show.",
  "The path ahead is brightening.",
  "Another leaf has turned toward the sun.",
  "The Garden is becoming more itself.",
  "Quiet growth is still beautiful growth.",
  "A small discovery can open an entire flower.",
  "The bloom is gathering courage.",
  "The Garden is smiling in its own quiet way.",
  "One more piece of beauty has come home.",
  "The flowers are making room for what comes next."
];

const soloGardenWords = [
  "SERENITY",
  "RESTORATION",
  "HEALING",
  "WELCOME HOME",
  "PEACEFUL WATERS",
  "MORNING MERCIES",
  "GENTLE ANSWER",
  "GARDEN PATH",
  "LIVING WATER",
  "OLIVE BRANCH",
  "QUIET JOY",
  "FAITHFUL LOVE",
  "NEW BEGINNING",
  "BEAUTY AWAITS",
  "STAY A WHILE",
  "BLOSSOM",
  "BUTTERFLY",
  "SUNFLOWER",
  "PEACE BE STILL",
  "JOY COMES IN THE MORNING"
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
  const gardenKnowsTogetherVisitors =
    gardenKeeper.planter && gardenKeeper.gardener;
  const gardenKnowsSoloVisitor =
    gardenKeeper.soloGardener && gardenKeeper.soloPlanter;

  if (gardenKnowsTogetherVisitors) {
    welcomeWhisper.textContent =
      `Welcome back, ${gardenKeeper.planter} and ${gardenKeeper.gardener}. ` +
      "We're so glad you're here.";
  } else if (gardenKnowsSoloVisitor) {
    welcomeWhisper.textContent =
      `Welcome back, ${gardenKeeper.soloGardener}. ` +
      `${gardenKeeper.soloPlanter} has kept a mystery seed for you.`;
  } else {
    welcomeWhisper.textContent = "We're so glad you're here.";
  }

  if (gardenKnowsTogetherVisitors || gardenKnowsSoloVisitor) {
    newGardenersButton.classList.remove("hidden");
  } else {
    newGardenersButton.classList.add("hidden");
  }
}

function beginGarden() {
  gardenKeeper.mode = "together";
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


function beginSoloGarden() {
  gardenKeeper.mode = "solo";
  gardenKeeper.hasVisited = true;
  gardenKeeper.lastVisit = new Date().toISOString();
  rememberGarden();

  if (!gardenKeeper.soloGardener || !gardenKeeper.soloPlanter) {
    identityStep = gardenKeeper.soloGardener
      ? "soloPlanter"
      : "soloGardener";
    identityPauseActive = false;
    visit("identity");
    prepareIdentityQuestion();
    return;
  }

  prepareSoloRound();
}

function chooseSoloWord() {
  if (soloGardenWords.length === 1) return soloGardenWords[0];

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * soloGardenWords.length);
  } while (nextIndex === soloWordIndex);

  soloWordIndex = nextIndex;
  return soloGardenWords[nextIndex];
}

function prepareSoloRound() {
  secretWord = chooseSoloWord();
  wordIsConcealed = true;

  passingMessage.replaceChildren(
    document.createTextNode(
      `${gardenKeeper.soloPlanter} has planted a word for you.`
    ),
    document.createElement("br"),
    document.createElement("br"),
    document.createTextNode(
      `${gardenKeeper.soloGardener}, the Garden is ready to bloom with you. 🌸`
    )
  );

  visit("passing");
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
      "May I know the name of the Planter?";
    identityWhisper.textContent =
      "Every garden begins with someone who lovingly plants it.";
    identityNameInput.placeholder = "Planter's Name";
  } else if (identityStep === "gardener") {
    identityQuestion.textContent =
      "May I know the name of the Gardener?";
    identityWhisper.textContent =
      "The Garden would be glad to know who will help it bloom.";
    identityNameInput.placeholder = "Gardener's Name";
  } else if (identityStep === "soloGardener") {
    identityQuestion.textContent =
      "May I know your name?";
    identityWhisper.textContent =
      "The Garden is glad you chose to spend some time here.";
    identityNameInput.placeholder = "Your Name";
  } else {
    identityQuestion.textContent =
      "Who would you like to plant the words?";
    identityWhisper.textContent =
      "You may name a friend, the Garden, or anyone meaningful to you.";
    identityNameInput.placeholder = "Planter's Name";
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
  } else if (identityStep === "gardener") {
    receiveGardener(enteredName);
  } else if (identityStep === "soloGardener") {
    receiveSoloGardener(enteredName);
  } else {
    receiveSoloPlanter(enteredName);
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
  }, 6500);
}

function receiveSoloGardener(name) {
  gardenKeeper.soloGardener = name;
  rememberGarden();
  identityPauseActive = true;

  const identitySymbol = document.querySelector(".identity-symbol");
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
    identityQuestion.textContent = `We're so glad you're here, ${name}.`;
    identityWhisper.textContent = "There is no hurry here.";
    identityQuestion.classList.remove("identity-message-resting");
    identityWhisper.classList.remove("identity-message-resting");
  }, 1000);

  setTimeout(() => {
    identityStep = "soloPlanter";
    identityPauseActive = false;
    identitySymbol.textContent = "🌿";
    identitySymbol.classList.remove("blooming");
    identityNameInput.classList.remove("identity-controls-resting");
    identityContinueButton.classList.remove("identity-controls-resting");
    prepareIdentityQuestion();
  }, 4200);
}

function receiveSoloPlanter(name) {
  gardenKeeper.soloPlanter = name;
  rememberGarden();
  identityPauseActive = true;

  const identitySymbol = document.querySelector(".identity-symbol");
  identityNameInput.classList.add("identity-controls-resting");
  identityContinueButton.classList.add("identity-controls-resting");
  identitySymbol.classList.add("receiving");

  setTimeout(() => {
    identityQuestion.classList.add("identity-message-resting");
    identityWhisper.classList.add("identity-message-resting");
  }, 400);

  setTimeout(() => {
    identitySymbol.textContent = "🌱";
    identitySymbol.classList.remove("receiving");
    identitySymbol.classList.add("blooming");
    identityQuestion.textContent = `${name} will plant the words.`;
    identityWhisper.textContent = "A mystery seed is already waiting.";
    identityQuestion.classList.remove("identity-message-resting");
    identityWhisper.classList.remove("identity-message-resting");
  }, 1000);

  setTimeout(() => {
    identityPauseActive = false;
    identitySymbol.textContent = "🌿";
    identitySymbol.classList.remove("blooming");
    identityNameInput.classList.remove("identity-controls-resting");
    identityContinueButton.classList.remove("identity-controls-resting");
    prepareSoloRound();
  }, 4600);
}


/*
=====================================
Planting Place
=====================================
*/

function updatePlantingPrompt() {
  if (gardenKeeper.planter && gardenKeeper.gardener) {
    plantingPrompt.textContent =
      `${gardenKeeper.planter}, plant a word or phrase for ` +
      `${gardenKeeper.gardener} to help bloom.`;
  } else {
    plantingPrompt.textContent =
      "Plant a word or phrase for someone you love to discover.";
  }
}

function resetSecretWordEntry() {
  secretWordInput.value = "";
  secretWordInput.type = "text";
  secretWordInput.placeholder = "Word or phrase";
  wordIsConcealed = false;

  concealWordButton.textContent = "Conceal the Word";
  wordPrivacyHint.textContent =
    "Check the spelling, then conceal the word before passing the phone.";

  startGameButton.disabled = true;
}

function enterPlantingPlace() {
  updatePlantingPrompt();
  resetSecretWordEntry();
  visit("planting");

  setTimeout(() => {
    secretWordInput.focus();
  }, 400);
}

function toggleWordPrivacy() {
  const hasWord = cleanWord(secretWordInput.value).length > 0;

  if (!hasWord) {
    wordPrivacyHint.textContent =
      "Plant the word first, then the Garden can conceal it.";
    secretWordInput.focus();
    return;
  }

  wordIsConcealed = !wordIsConcealed;
  secretWordInput.type = wordIsConcealed ? "password" : "text";

  if (wordIsConcealed) {
    concealWordButton.textContent = "Show the Word Again";
    wordPrivacyHint.textContent =
      "The word is safely concealed and ready to be planted.";
    startGameButton.disabled = false;
  } else {
    concealWordButton.textContent = "Conceal the Word";
    wordPrivacyHint.textContent =
      "Check the spelling, then conceal the word before passing the phone.";
    startGameButton.disabled = true;
    secretWordInput.focus();
  }
}

function plantWord() {
  const cleaned = cleanWord(secretWordInput.value);

  if (!cleaned) {
    wordPrivacyHint.textContent =
      "A word or phrase is waiting to be planted.";
    secretWordInput.focus();
    return;
  }

  if (!wordIsConcealed) {
    wordPrivacyHint.textContent =
      "Please conceal the word before passing the phone.";
    return;
  }

  secretWord = cleaned;
  visit("passing");

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

  const availableWidth = Math.min(window.innerWidth - 72, 480);
  const words = secretWord.split(" ");
  let characterIndex = 0;

  words.forEach((word, wordIndex) => {
    const group = document.createElement("div");
    group.className = "word-group";

    const gap = word.length > 18 ? 2 : word.length > 12 ? 4 : 6;
    group.style.gap = `${gap}px`;

    const tileSize = Math.max(8, Math.min(42,
      Math.floor((availableWidth - gap * (word.length - 1)) / word.length)
    ));

    for (let i = 0; i < word.length; i++) {
      const tile = document.createElement("div");
      const char = displayWord[characterIndex];

      tile.className = "letter-tile";
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${Math.max(18, Math.round(tileSize * 1.22))}px`;
      tile.style.fontSize = `${Math.max(8, Math.round(tileSize * 0.7))}px`;
      tile.textContent = char === "_" ? "" : char;

      group.appendChild(tile);
      characterIndex++;
    }

    wordDisplay.appendChild(group);

    if (wordIndex < words.length - 1) {
      characterIndex++;
    }
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
  roundReadyToRotate = true;
  showNextRoundRoles();

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
      const celebratedGardener = gardenKeeper.mode === "solo"
        ? gardenKeeper.soloGardener
        : gardenKeeper.gardener;

      showGardenCelebration(
        `${celebratedGardener}, look what you helped bloom.`
      );
    }, 2500);

    // The artwork grows for about 2.8 seconds, then rests full-screen for 3 seconds.
    setTimeout(() => {
      hideGardenCelebration();
    }, 8300);

    setTimeout(() => {
      resultTitle.textContent = "The Garden bloomed.";
      resultTitle.className = "win";
      resultMessage.textContent = randomMessage(bloomCelebrations);
      bloomArt.classList.remove("blooming");
      visit("reflection");
    }, 9200);

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


function prepareNextRound() {
  if (!roundReadyToRotate) return;

  if (gardenKeeper.mode === "together") {
    const previousPlanter = gardenKeeper.planter;
    gardenKeeper.planter = gardenKeeper.gardener;
    gardenKeeper.gardener = previousPlanter;
  }

  roundReadyToRotate = false;
  rememberGarden();
}

function showNextRoundRoles() {
  if (gardenKeeper.mode === "solo") {
    nextRoundMessage.textContent =
      `${gardenKeeper.soloPlanter} has another mystery seed ready for ` +
      `${gardenKeeper.soloGardener}.`;
    return;
  }

  nextRoundMessage.textContent =
    `Next round, ${gardenKeeper.gardener} will plant and ` +
    `${gardenKeeper.planter} will help the Garden bloom.`;
}

function welcomeNewGardeners() {
  gardenKeeper.planter = "";
  gardenKeeper.gardener = "";
  gardenKeeper.soloPlanter = "";
  gardenKeeper.soloGardener = "";
  gardenKeeper.mode = "together";
  gardenKeeper.bloomStage = 0;
  roundReadyToRotate = false;
  rememberGarden();

  prepareWelcome();
  beginIdentity();
}

function stepOutOfGarden() {
  prepareNextRound();
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
  prepareNextRound();

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

  nextRoundMessage.textContent = "";

  if (gardenKeeper.mode === "solo") {
    prepareSoloRound();
  } else {
    enterPlantingPlace();
  }
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

soloGardenButton.addEventListener(
  "click",
  beginSoloGarden
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

concealWordButton.addEventListener(
  "click",
  toggleWordPrivacy
);

secretWordInput.addEventListener(
  "input",
  () => {
    if (wordIsConcealed) {
      wordIsConcealed = false;
      secretWordInput.type = "text";
      concealWordButton.textContent = "Conceal the Word";
      startGameButton.disabled = true;
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


window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installGardenButton.classList.remove("hidden");
});

installGardenButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installGardenButton.classList.add("hidden");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installGardenButton.classList.add("hidden");
});

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