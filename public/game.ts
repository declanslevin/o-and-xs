// import { addClass, removeClass } from "./ui";

export const gameMode = (ws) => {
  const modeArray = document.getElementsByClassName("mode");
  let checkedMode;
  for (let i = 0; i < modeArray.length; i++) {
    if (modeArray[i].checked) {
      checkedMode = modeArray[i].getAttribute("id").split("-")[1];
    }
  }
  let modeObj = {
    type: "mode",
    mode: checkedMode,
  };
  ws.send(JSON.stringify(modeObj));
};

export const startGame = (ws) => {
  gameMode(ws);

  document.getElementById("prompts").classList.add("hidden");

  const radioArray = document.getElementsByClassName("prompts-radio");
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }

  document.getElementById("game-grid").classList.remove("disabled");
};

export const gameOver = () => {
  document.getElementById("game-grid").classList.add("disabled");
  document.getElementById("game-over").classList.remove("hidden");
};

export const resetGame = () => {
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

  document.getElementById("game-over").classList.add("hidden");
  document.getElementById("prompts").classList.remove("hidden");

  document.getElementById("current-player").innerHTML = "Current Player";
  document.getElementById("current-team").innerHTML = "Team";
};

export const playAgain = (ws) => {
  let playAgainObj = {
    type: "playAgain",
    val: "y",
  };
  ws.send(JSON.stringify(playAgainObj));
  resetGame();
};
