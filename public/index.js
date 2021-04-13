import { startGame, playAgain } from "./game";
import { registerGridBehaviour } from "./ui";
import { handleMessage } from "./message";

const init = () => {
  // add ticket to add retry logic
  // ? kill server and reconnect to games already running (database?)
  const ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("error", (err) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 3	CLOSED	The connection is closed or couldn't be opened.
    if (err.currentTarget.readyState === 3) {
      console.log("run your server dummy");
      const logElement = document.getElementById("logs");
      let currentText = logElement.innerHTML;
      logElement.innerHTML = "Check your server is running (try 'yarn server')";
    }
    console.log(err);
  });

  ws.addEventListener("open", (event) => {
    if (event.target !== ws) {
      throw new Error("Why is this not the WebSocket?");
    }
    console.log("We are connected!");
    registerGridBehaviour(ws);

    ws.addEventListener("message", (message) => {
      handleMessage(message);
    });
  });

  document.getElementById("js-start").addEventListener("click", () => {
    startGame(ws);
  });

  document.getElementById("js-play-again").addEventListener("click", () => {
    playAgain(ws);
  });
};

init();
