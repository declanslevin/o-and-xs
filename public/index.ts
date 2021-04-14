import { startGame, playAgain } from "./game";
import { registerGridBehaviour } from "./ui";
import { handleMessage } from "./message";
import { getLogsElement, getElementById } from "./helpers";

const init = (): void => {
  // add ticket to add retry logic
  // ? kill server and reconnect to games already running (database?)
  const ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("error", (err): void => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 3	CLOSED	The connection is closed or couldn't be opened.
    if (!err || !err.currentTarget) {
      throw new Error("Unable to return error event");
    }
    const state: WebSocket["readyState"] = ws.readyState;
    if (state === 3) {
      // if (err.currentTarget.readyState === 3) {
      console.log("Run your server dummy");
      const logElement = getLogsElement();
      logElement.innerHTML = "Check your server is running (try 'yarn server')";
    }
    console.log(err);
  });

  // TODO: Add type for event?
  ws.addEventListener("open", (event): void => {
    if (event.target !== ws) {
      throw new Error("Why is this not the WebSocket?");
    }
    console.log("We are connected!");
    registerGridBehaviour(ws);

    // TODO: Add type for message?
    ws.addEventListener("message", (message): void => {
      handleMessage(message);
    });
  });

  getElementById("js-start").addEventListener("click", (): void => {
    startGame(ws);
  });

  getElementById("js-play-again").addEventListener("click", (): void => {
    playAgain(ws);
  });
};

init();
