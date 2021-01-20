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

  // UGLY AF HAX
  const question = (prompt, cb) => {
    console.log(prompt);
    ws.send(prompt);
    ws.onmessage = ({ data }) => {
      console.log("DATA = " + data);
      cb(data);
      ws.onmessage = null;
    };
  };
  rl.question = question;

  await runPlayLoop(ws);
});
