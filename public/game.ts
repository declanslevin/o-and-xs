import {
  disableRadioButtons,
  enableRadioButtons,
  getElementById,
} from "./helpers";

export const getGameMode = (): string => {
  const modeArray = document.getElementsByClassName(
    "mode"
  ) as HTMLCollectionOf<HTMLInputElement>;
  let checkedMode: string = "";
  for (const el of modeArray) {
    if (el.checked) {
      const domId = el.getAttribute("id");
      if (!domId) {
        throw new Error("Unable to return checked 'mode' element");
      }
      checkedMode = domId.replace("mode-", "");
    }
  }
  return checkedMode;
};

export const sendGameMode = (ws: WebSocket): void => {
  const checkedMode = getGameMode();
  let modeObj = {
    type: "mode",
    mode: checkedMode,
  };
  ws.send(JSON.stringify(modeObj));
};

export const startGame = (ws: WebSocket): void => {
  sendGameMode(ws);

  getElementById("prompts").classList.add("hidden");
  disableRadioButtons();

  getElementById("game-grid").classList.remove("disabled");
};

export const gameOver = (): void => {
  getElementById("game-grid").classList.add("disabled");
  getElementById("game-over").classList.remove("hidden");
};

export const resetGame = (): void => {
  enableRadioButtons();

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
