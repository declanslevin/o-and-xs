import { getElementById } from "./helpers";

export const updateScroll = (): void => {
  const element = getElementById("log-container");
  element.scrollTop = element.scrollHeight;
};

// TODO: Refactor when React is added (use state instead of reaching in to document) - accept document elements as args from init
export const registerGridBehaviour = (ws: WebSocket): void => {
  const gridArray: HTMLCollectionOf<Element> = document.getElementsByClassName(
    "game-grid-item"
  );
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].addEventListener("click", () => {
      // QUESTION: Should I be typing all of these variable declarations?
      const element = gridArray[i].getAttribute("id");
      if (!element) {
        throw new Error("Grid item doesn't have attribute 'id'");
      }
      const id = element.split("-")[1];

      let gridObj = {
        grid: Number(id),
        type: "grid",
      };
      ws.send(JSON.stringify(gridObj));

      const currentTeam = getElementById("current-team");
      gridArray[i].innerHTML = currentTeam.innerHTML.split(" ")[1];
      // gridArray[i].disabled = true;
      gridArray[i].setAttribute("style", "pointer-events:none");
    });
  }
};
