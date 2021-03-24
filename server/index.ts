import WebSocket from "ws";
// TODO: Convert these files to typescript
// @ts-ignore
import { runPlayLoop } from "../lib/play";
import Lobby from "../lib/lobby";
import { HumanPlayer } from "../lib/player";

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
    console.log(message);
    let msg = JSON.parse(message.toString());
    console.log(msg);
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
  const player = new HumanPlayer(`Player ${playerCount}`, true, ws);

  await runPlayLoop(lobby, player);
});
