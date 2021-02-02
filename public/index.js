const addClass = (element, classToAdd) => {
  const elementClass = element.getAttribute("class");
  const addedClass = elementClass + " " + classToAdd;
  element.setAttribute("class", addedClass);
};

const removeClass = (element, classToRemove) => {
  const removedClass = element
    .getAttribute("class")
    .split(" ")
    .filter((c) => c !== classToRemove)
    .join(" ");
  element.setAttribute("class", removedClass);
};

const startGame = () => {
  const checkNumPlayers = document.getElementById("1-player").checked;
  // const numPlayers = checkNumPlayers ? 1 : 2;
  const numPlayers = checkNumPlayers ? true : false;
  const checkTeamChoice = document.getElementById("team-o").checked;
  const teamChoice = checkTeamChoice ? "O" : "X";
  let promptObj = {
    type: "prompt",
    players: numPlayers,
    team: teamChoice,
  };
  ws.send(JSON.stringify(promptObj));

  const promptElement = document.getElementById("prompts");
  addClass(promptElement, "hidden");

  const radioArray = document.getElementsByClassName("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }

  const gameGrid = document.getElementById("game-grid");
  removeClass(gameGrid, "disabled");
};

const gameOver = () => {
  let gameGrid = document.getElementById("game-grid");
  addClass(gameGrid, "disabled");

  let gameOver = document.getElementById("game-over");
  removeClass(gameOver, "hidden");
};

const resetGame = () => {
  const radioArray = document.getElementsByClassName("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = false;
  }

  const gridArray = document.getElementsByClassName("game-grid-item");
  for (let i = 0; i < gridArray.length; i++) {
    const gridIdNum = gridArray[i].getAttribute("id").split("-")[1];
    gridArray[i].removeAttribute("style");
    gridArray[i].innerHTML = gridIdNum;
  }

  document.getElementById("log-container").innerHTML =
    '<p class="log-text" id="logs">Logs appear here</p>';

  const gameOver = document.getElementById("game-over");
  addClass(gameOver, "hidden");

  const promptElement = document.getElementById("prompts");
  removeClass(promptElement, "hidden");

  document.getElementById("current-player").innerHTML = "Current Player";
  document.getElementById("current-team").innerHTML = "Team";
};

const playAgain = () => {
  let playAgainObj = {
    type: "playAgain",
    val: "y",
  };
  ws.send(JSON.stringify(playAgainObj));
  resetGame();
};

const updateScroll = () => {
  const element = document.getElementById("log-container");
  element.scrollTop = element.scrollHeight;
};
