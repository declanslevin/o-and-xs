import { updateScroll } from "./ui";
import { gameOver } from "./game";

export const handleMessage = (message) => {
  let msg = JSON.parse(message.data);
  console.log(msg);
  const logElement = document.getElementById("logs");
  let currentText = logElement.innerHTML;
  switch (msg.type) {
    case "prompt":
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      document.getElementById("logs").innerHTML =
        currentText + `<p class="log-text">${msg.prompt}</p>`;
      updateScroll();
      break;
    case "log":
      if (currentText === "Logs appear here") {
        currentText = "";
      }
      document.getElementById("logs").innerHTML =
        currentText + `<p class="log-text">${msg.log}</p>`;
      updateScroll();
      break;
    case "thisPlayer":
      document.getElementById("your-player").innerHTML =
        "Your Name: " + msg.name;
      document.getElementById("your-team").innerHTML = "Your Team: " + msg.team;
    case "currentPlayer":
      document.getElementById("current-player").innerHTML =
        "Turn: " + msg.player;
      document.getElementById("current-team").innerHTML = "Team: " + msg.team;
      break;
    case "playerChoice":
      let grid = document.getElementById(`grid-${msg.choice}`);
      grid.innerHTML = msg.team;
      // TODO: Do this by adding a class i.e. disabled
      grid.setAttribute("style", "pointer-events:none");
    case "cpuChoice":
      grid = document.getElementById(`grid-${msg.choice}`);
      grid.innerHTML = msg.team;
      grid.setAttribute("style", "pointer-events:none");
      break;
    case "draw":
      document.getElementById("game-winner").innerHTML = "You drew!";
      gameOver();
      break;
    case "win":
      document.getElementById("game-winner").innerHTML = `${msg.winner} won!`;
      gameOver();
      break;
  }
};
