const WebSocket = require("ws");
const rl = require("../lib/rl");
const { runPlayLoop } = require("../lib/play");
const { HumanPlayer } = require("../lib/player");

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
    console.log(msg);
    if (msg.type === "grid") {
      console.log(`User choice made (${msg.grid})`);
    } else if (msg.type === "prompt") {
      const log =
        msg.players === true
          ? `Game started with 1 human player. They chose team ${msg.team}.`
          : `Game started with 2 human players. Player 1 chose ${msg.team}.`;
      console.log(log);
    } else if (msg.type === "playAgain") {
      console.log("User(s) decided to play again");
    } else if (msg.type === "mode") {
      console.log("Game mode = " + msg.mode);
    }
  });

  const player = new HumanPlayer(ws);

  await runPlayLoop(player);
});
