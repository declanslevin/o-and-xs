import { getElementById } from "./helpers";

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

  getElementById("prompts").classList.add("hidden");

  const radioArray = document.getElementsByClassName(
    "prompts-radio"
  ) as HTMLCollectionOf<HTMLInputElement>;
  for (let i = 0; i < radioArray.length; i++) {
    radioArray[i].disabled = true;
  }

  getElementById("game-grid").classList.remove("disabled");
};

export const gameOver = (): void => {
  getElementById("game-grid").classList.add("disabled");
  getElementById("game-over").classList.remove("hidden");
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

  getElementById("log-container").innerHTML =
    '<p class="log-text" id="logs">Logs appear here</p>';
  getElementById("game-over").classList.add("hidden");
  getElementById("prompts").classList.remove("hidden");
  getElementById("current-player").innerHTML = "Current Player";
  getElementById("current-team").innerHTML = "Team";
};

export const playAgain = (ws: WebSocket): void => {
  let playAgainObj = {
    type: "playAgain",
    val: "y",
  };
  ws.send(JSON.stringify(playAgainObj));
  resetGame();
};
