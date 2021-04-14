export const gameMode = (ws: WebSocket): void => {
  const modeArray = document.getElementsByClassName(
    "mode"
  ) as HTMLCollectionOf<HTMLInputElement>;
  let checkedMode;
  for (let i = 0; i < modeArray.length; i++) {
    if (modeArray[i].checked) {
      const element = modeArray[i].getAttribute("id");
      if (!element) {
        throw new Error("Unable to return checked 'mode' element");
      }
      checkedMode = element.split("-")[1];
    }
  }
  let modeObj = {
    type: "mode",
    mode: checkedMode,
  };
  ws.send(JSON.stringify(modeObj));
};

export const startGame = (ws: WebSocket): void => {
  gameMode(ws);

  const prompts = document.getElementById("prompts");
  if (!prompts) {
    throw new Error("Unable to return 'prompts' element");
  }
  prompts.classList.add("hidden");

  const radioArray = document.getElementsByClassName(
    "prompts-radio"
  ) as HTMLCollectionOf<HTMLInputElement>;
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }

  const gameGrid = document.getElementById("game-grid");
  if (!gameGrid) {
    throw new Error("Unable to return 'game-grid' element");
  }
  gameGrid.classList.remove("disabled");
};

export const gameOver = (): void => {
  const gameGrid = document.getElementById("game-grid");
  if (!gameGrid) {
    throw new Error("Unable to return 'game-grid' element");
  }
  gameGrid.classList.add("disabled");

  const gameOver = document.getElementById("game-over");
  if (!gameOver) {
    throw new Error("Unable to return 'game-over' element");
  }
  gameOver.classList.remove("hidden");
};

export const resetGame = (): void => {
  const radioArray = document.getElementsByClassName(
    "prompts-radio"
  ) as HTMLCollectionOf<HTMLInputElement>;
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = false;
  }

  const gridArray = document.getElementsByClassName("game-grid-item");
  for (let i = 0; i < gridArray.length; i++) {
    const gridId = gridArray[i].getAttribute("id");
    if (!gridId) {
      throw new Error("Unable to return 'game-grid-item' id");
    }
    const gridIdNum = gridId.split("-")[1];
    gridArray[i].removeAttribute("style");
    gridArray[i].innerHTML = gridIdNum;
  }

  const logContainer = document.getElementById("log-container");
  if (!logContainer) {
    throw new Error("Unable to return 'log-container' element");
  }
  logContainer.innerHTML = '<p class="log-text" id="logs">Logs appear here</p>';

  const gameOver = document.getElementById("game-over");
  if (!gameOver) {
    throw new Error("Unable to return 'game-over' element");
  }
  gameOver.classList.add("hidden");

  const prompts = document.getElementById("prompts");
  if (!prompts) {
    throw new Error("Unable to return 'prompts' element");
  }
  prompts.classList.remove("hidden");

  const currentPlayer = document.getElementById("current-player");
  if (!currentPlayer) {
    throw new Error("Unable to return 'current-player' element");
  }
  currentPlayer.innerHTML = "Current Player";

  const currentTeam = document.getElementById("current-team");
  if (!currentTeam) {
    throw new Error("Unable to return 'current-team' element");
  }
  currentTeam.innerHTML = "Team";
};

export const playAgain = (ws: WebSocket): void => {
  let playAgainObj = {
    type: "playAgain",
    val: "y",
  };
  ws.send(JSON.stringify(playAgainObj));
  resetGame();
};
