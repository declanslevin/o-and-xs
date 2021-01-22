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
    let gridObj = JSON.parse(message);
    if (gridObj.id === "grid") {
      console.log(gridObj.grid);
    }
  });

  // UGLY AF HAX
  const question = (prompt, cb) => {
    let promptObj = {
      id: "prompt",
      prompt: prompt,
    };
    ws.send(JSON.stringify(promptObj));

    ws.onmessage = ({ data }) => {
      let dataObj = JSON.parse(data);
      if (dataObj.id === "input") {
        console.log("DATA = " + dataObj.input);
        cb(dataObj.input);
        ws.onmessage = null;
      }
    };
  };
  rl.question = question;

  await runPlayLoop(ws);
});
