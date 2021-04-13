export const updateScroll = () => {
  const element = document.getElementById("log-container");
  element.scrollTop = element.scrollHeight;
};

// TODO: Refactor when React is added (use state instead of reaching in to document) - accept document elements as args from init
export const registerGridBehaviour = (ws) => {
  const gridArray = document.getElementsByClassName("game-grid-item");
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].addEventListener("click", () => {
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
