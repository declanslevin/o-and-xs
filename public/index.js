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
  const radioArray = document.getElementsByClassName("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }
  const gameGrid = document.getElementById("game-grid");
  const removeDisabledClass = gameGrid
    .getAttribute("class")
    .split(" ")
    .filter((c) => c !== "disabled")
    .join(" ");
  gameGrid.setAttribute("class", removeDisabledClass);
};

const gameOver = () => {
  let gameGrid = document.getElementById("game-grid");
  let gameGridClasses = gameGrid.getAttribute("class");
  gameGrid.setAttribute("class", gameGridClasses + " disabled");
  let gameOver = document.getElementById("game-over");
  let removeHiddenClass = gameOver
    .getAttribute("class")
    .split(" ")
    .filter((c) => c !== "hidden")
    .join(" ");
  gameOver.setAttribute("class", removeHiddenClass);
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
  const gameOverClasses = gameOver.getAttribute("class");
  gameOver.setAttribute("class", gameOverClasses + " hidden");
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
