import { updateScroll } from "./ui";
import { gameOver } from "./game";

//  TODO: Does it need to be more specific than HTMLElement? i.e. HTMLParagraphElement
export const getLogsElement = (): HTMLElement => {
  const logs = document.getElementById("logs");
  if (!logs) {
    throw new Error("Unable to return 'logs' element");
  }
  return logs;
};

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
      const yourPlayer = document.getElementById("your-player");
      if (!yourPlayer) {
        throw new Error("Unable to return 'your-player' element");
      }
      yourPlayer.innerHTML = `Your Name: ${msg.name}`;

      const yourTeam = document.getElementById("your-team");
      if (!yourTeam) {
        throw new Error("Unable to return 'your-team' element");
      }
      yourTeam.innerHTML = `Your Team: ${msg.team}`;
      break;

    case "currentPlayer":
      const currentPlayer = document.getElementById("current-player");
      if (!currentPlayer) {
        throw new Error("Unable to return 'current-player' element");
      }
      currentPlayer.innerHTML = `Turn: ${msg.player}`;

      const currentTeam = document.getElementById("current-team");
      if (!currentTeam) {
        throw new Error("Unable to return 'current-team' element");
      }
      currentTeam.innerHTML = `Team: ${msg.team}`;
      break;

    case "playerChoice":
      let grid = document.getElementById(`grid-${msg.choice}`);
      if (!grid) {
        throw new Error(`Unable to return 'grid-${msg.choice}' element`);
      }
      grid.innerHTML = msg.team;
      // TODO: Do this by adding a class i.e. disabled
      grid.setAttribute("style", "pointer-events:none");
      break;

    case "cpuChoice":
      grid = document.getElementById(`grid-${msg.choice}`);
      if (!grid) {
        throw new Error(`Unable to return 'grid-${msg.choice}' element`);
      }
      grid.innerHTML = msg.team;
      grid.setAttribute("style", "pointer-events:none");
      break;

    case "draw":
      let gameWinner = document.getElementById("game-winner");
      if (!gameWinner) {
        throw new Error("Unable to return 'game-winner' element");
      }
      gameWinner.innerHTML = "You drew!";
      gameOver();
      break;

    case "win":
      gameWinner = document.getElementById("game-winner");
      if (!gameWinner) {
        throw new Error("Unable to return 'game-winner' element");
      }
      gameWinner.innerHTML = `${msg.winner} won!`;
      gameOver();
      break;
  }
};
