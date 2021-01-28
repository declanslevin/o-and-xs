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
      console.log(msg.grid);
    } else if (msg.type === "prompt") {
      console.log(msg.players);
      console.log(msg.team);
    } else if (msg.type === "playAgain") {
      console.log("PLAYAGAIN = " + msg.val);
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

// var http = require('http');
// var fs = require('fs');

// const PORT=8080;

// fs.readFile('./index.html', (err, html) => {

//     if (err) throw err;

//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(PORT);
// });
