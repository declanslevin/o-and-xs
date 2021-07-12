import { updateScroll } from "./ui";
import { gameOver } from "./game";
import { getLogsElement, getElementById } from "./helpers";
import { MessageToFrontEnd } from "../lib/message";
import { store } from "./store";

export const handleMessage = (message: MessageEvent): void => {
  const msg: MessageToFrontEnd = JSON.parse(message.data);
  store.dispatch(msg);
  console.log("STATE = ", store.getState());
  console.log(msg);
  switch (msg.type) {
    case "prompt": {
      let currentText = getLogsElement().innerHTML;
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      getLogsElement().innerHTML =
        currentText + `<p class="log-text">${msg.prompt}</p>`;
      updateScroll();
      break;
    }

    case "log": {
      let currentText = getLogsElement().innerHTML;
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      getLogsElement().innerHTML =
        currentText + `<p class="log-text">${msg.log}</p>`;
      updateScroll();
      break;
    }

    case "draw":
      getElementById("game-winner").innerHTML = "You drew!";
      gameOver();
      break;

    case "win":
      getElementById("game-winner").innerHTML = `${msg.winner} won!`;
      gameOver();
      break;
  }
};
