import { updateScroll } from "./ui";
import { gameOver } from "./game";
import { getLogsElement, getElementById } from "./helpers";

// TODO: What type to use for message - string or MessageEvent?
export const handleMessage = (message: MessageEvent): void => {
  // string type introduces errors
  let msg = JSON.parse(message.data);
  console.log(msg);
  let currentText = getLogsElement().innerHTML;
  switch (msg.type) {
    case "prompt":
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      getLogsElement().innerHTML =
        currentText + `<p class="log-text">${msg.prompt}</p>`;
      updateScroll();
      break;

    case "log":
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      getLogsElement().innerHTML =
        currentText + `<p class="log-text">${msg.log}</p>`;
      updateScroll();
      break;

    case "thisPlayer":
      getElementById("your-player").innerHTML = `Your Name: ${msg.name}`;
      getElementById("your-team").innerHTML = `Your Team: ${msg.team}`;
      break;

    case "currentPlayer":
      getElementById("current-player").innerHTML = `Turn: ${msg.player}`;
      getElementById("current-team").innerHTML = `Team: ${msg.team}`;
      break;

    case "playerChoice":
      let grid = getElementById(`grid-${msg.choice}`);
      grid.innerHTML = msg.team;
      // TODO: Do this by adding a class i.e. disabled
      grid.setAttribute("style", "pointer-events:none");
      break;

    case "cpuChoice":
      grid = getElementById(`grid-${msg.choice}`);
      grid.innerHTML = msg.team;
      grid.setAttribute("style", "pointer-events:none");
      break;

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
