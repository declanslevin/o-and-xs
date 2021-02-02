const handleMessage = (message) => {
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
    case "currentPlayer":
      document.getElementById("current-player").innerHTML =
        "Turn: " + msg.currentPlayer;
      break;
    case "currentPlayerTeam":
      document.getElementById("current-team").innerHTML =
        "Team: " + msg.currentPlayerTeam;
      break;
    case "cpuChoice":
      let grid = document.getElementById(`grid-${msg.choice}`);
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

const gridBehaviour = () => {
  const gridArray = document.getElementsByClassName("game-grid-item");
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].addEventListener("click", (event) => {
      const id = gridArray[i].getAttribute("id").split("-")[1];
      let gridObj = {
        grid: Number(id),
        type: "grid",
      };
      ws.send(JSON.stringify(gridObj));
      gridArray[i].innerHTML = document
        .getElementById("current-team")
        .innerHTML.split(" ")[1];
      // gridArray[i].disabled = true;
      gridArray[i].setAttribute("style", "pointer-events:none");
    });
  }
};
