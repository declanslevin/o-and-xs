// const { createWebSocketConnection } = require("./webSocket");
const WebSocket = require("ws");
const rl = require("../lib/rl");
const { runPlayLoop } = require("../lib/play");
const { Lobby } = require("../lib/lobby");
const { HumanPlayer } = require("../lib/player");

const lobby = new Lobby();
let playerCount = 0;

console.log("*****************");
console.log("STARTING");
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", async (ws) => {
  console.log("New client connected!");

  ws.on("close", () => {
    console.log("Client has disconnected");
  });

  ws.on("message", (message) => {
    let msg = JSON.parse(message);
    if (msg.type === "grid") {
      console.log(`DEBUG User choice made (${msg.grid})`);
    } else if (msg.type === "prompt") {
      const log =
        msg.players === true
          ? `DEBUG Game started with 1 human player. They chose team ${msg.team}.`
          : `DEBUG Game started with 2 human players. Player 1 chose ${msg.team}.`;
      console.log(log);
    } else if (msg.type === "playAgain") {
      console.log("DEBUG User(s) decided to play again");
    }
  });

  playerCount++;
  const player = new HumanPlayer(`${playerCount}`, true, ws);

  await runPlayLoop(lobby, player);
});

// const play = async () => {
//   const ws = createWebSocketConnection();
//   await runPlayLoop(ws);
// };

// play();
