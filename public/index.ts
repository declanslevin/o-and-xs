import { startGame, playAgain } from "./game";
import { registerGridBehaviour } from "./ui";
import { handleMessage } from "./message";

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
      const logElement = document.getElementById("logs");
      if (!logElement) {
        throw new Error("Unable to return 'logs' element");
      }
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

  const startElement = document.getElementById("js-start");
  if (!startElement) {
    throw new Error("Unable to return 'js-start' element");
  }
  startElement.addEventListener("click", (): void => {
    startGame(ws);
  });

  const playAgainElement = document.getElementById("js-play-again");
  if (!playAgainElement) {
    throw new Error("Unable to return 'js-play-again' element");
  }
  playAgainElement.addEventListener("click", (): void => {
    playAgain(ws);
  });
};

init();
