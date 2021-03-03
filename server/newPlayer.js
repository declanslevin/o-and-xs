const WebSocket = require("ws");
const rl = require("../lib/rl");
// const { runPlayLoop } = require("../lib/play");
// const { HumanPlayer } = require("../lib/player");

const newWebSocket = async (player) => {
  console.log("*****************");
  console.log("STARTING");
  const ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("error", (err) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    // 3	CLOSED	The connection is closed or couldn't be opened.
    if (err.currentTarget.readyState === 3) {
      console.log("run your server dummy");
    }
    console.log(err);
  });

  ws.addEventListener("open", () => {
    console.log("We are connected!");

    // gridBehaviour();

    ws.addEventListener("message", (message) => {
      handleMessage(message);
    });
  });

  // const wss = new WebSocket.Server({ port: 8080 });
  // wss.on("connection", async (ws) => {
  //   console.log("New client connected!");

  //   ws.on("close", () => {
  //     console.log("Client has disconnected");
  //   });

  //   ws.on("message", (message) => {
  //     let msg = JSON.parse(message);
  //     console.log(msg);
  //     if (msg.type === "grid") {
  //       console.log(`User choice made (${msg.grid})`);
  //     } else if (msg.type === "prompt") {
  //       const log =
  //         msg.players === true
  //           ? `Game started with 1 human player. They chose team ${msg.team}.`
  //           : `Game started with 2 human players. Player 1 chose ${msg.team}.`;
  //       console.log(log);
  //     } else if (msg.type === "playAgain") {
  //       console.log("User(s) decided to play again");
  //     } else if (msg.type === "mode") {
  //       console.log("Game mode = " + msg.mode);
  //     }
  //   });

  // const player = new HumanPlayer(ws);
  player.setWebSocket(ws);
  player.setWebSocketUi(player.wsUi.CONSOLE);

  // await runPlayLoop(player);
  // });
};

exports.newWebSocket = newWebSocket;
