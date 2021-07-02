import React from "react";
import ReactDOM from "react-dom";
// import App from '../my-app/src/App';
import reportWebVitals from "../my-app/src/reportWebVitals";
import { startGame, playAgain } from "./game";
import { registerGridBehaviour } from "./ui";
import { handleMessage } from "./message";
import { getLogsElement, getElementById } from "./helpers";
import Grid from "../src/components/Grid/Grid";
import { GridObj } from "../lib/game";
import { Provider } from "react-redux";
import { store } from "./store";

const init = (): void => {
  const ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("error", (err): void => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 3 CLOSED The connection is closed or couldn't be opened.
    if (ws.readyState === 3) {
      console.log("Run your server dummy");
      const logElement = getLogsElement();
      logElement.innerHTML = "Check your server is running (try 'yarn server')";
    }
    console.log(err);
  });

  ws.addEventListener("open", (event): void => {
    if (event.target !== ws) {
      throw new Error("Why is this not the WebSocket?");
    }
    console.log("We are connected!");
    registerGridBehaviour(ws);

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

const labels: GridObj = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <button>hello world</button>
      <Grid />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
