import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../my-app/src/reportWebVitals";
import { handleMessage } from "./message";
import Grid from "../src/components/Grid/Grid";
import Header from "../src/components/Header";
import GameMode from "../src/components/GameMode";
import GameOver from "../src/components/GameOver";
import PlayerIndicator from "../src/components/PlayerIndicator";
import Logs from "../src/components/Logs";
import { Provider } from "react-redux";
import { store } from "./store";

const init = (): void => {
  const ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("error", (err): void => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 3 CLOSED The connection is closed or couldn't be opened.
    if (ws.readyState === 3) {
      console.log("Run your server dummy");
      const logElement = document.getElementById("log-text-container")
        .firstChild as HTMLParagraphElement;
      logElement.innerHTML = "Check your server is running (try 'yarn server')";
    }
    console.log(err);
  });

  ws.addEventListener("open", (event): void => {
    if (event.target !== ws) {
      throw new Error("Why is this not the WebSocket?");
    }
    console.log("We are connected!");
    // registerGridBehaviour(ws);

    ws.addEventListener("message", (message): void => {
      handleMessage(message);
    });
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Header />
        <GameMode ws={ws} />
        <PlayerIndicator />
        <Grid ws={ws} />
        <GameOver ws={ws} />
        <Logs />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
