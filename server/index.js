const WebSocket = require("ws");
const rl = require("../lib/rl");
const { runPlayLoop } = require("../lib/play");

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
      console.log(`User choice made (${msg.grid})`);
    } else if (msg.type === "prompt") {
      const log =
        msg.players === true
          ? `Game started with 1 human player. They chose team ${msg.team}.`
          : `Game started with 2 human players. Player 1 chose ${msg.team}.`;
      console.log(log);
    } else if (msg.type === "playAgain") {
      console.log("User(s) decided to play again");
    }
  });

  // UGLY AF HAX
  const question = (prompt, cb) => {
    let promptObj = {
      type: "prompt",
      prompt: prompt,
    };
    ws.send(JSON.stringify(promptObj));

    ws.onmessage = ({ data }) => {
      let dataObj = JSON.parse(data);
      if (dataObj.type === "input") {
        console.log("DATA = " + dataObj.input);
        cb(dataObj.input);
        ws.onmessage = null;
      } else if (dataObj.type === "playAgain") {
        cb(dataObj.val);
        ws.onmessage = null;
      }
    };
  };
  rl.question = question;

  await runPlayLoop(ws);
});
