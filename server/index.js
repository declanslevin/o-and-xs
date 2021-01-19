const WebSocket = require("ws");
const rl = require("../lib/rl");

console.log("*****************");
console.log("STARTING");
const wss = new WebSocket.Server({ port: 8080 });

const promptForTeamChoice = () => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

wss.on("connection", async (ws) => {
  console.log("New client connected!");
  const question = (prompt, cb) => {
    console.log(prompt);
    ws.send(prompt);
    // TODO unregister cb
    // ws.on("message", cb);
    ws.onmessage = ({ data }) => {
      console.log("DATA = " + data);
      cb(data);
      ws.onmessage = null;
    };
  };
  rl.question = question;
  const result = await promptForTeamChoice();
  console.log("RESULT = " + result);

  // ws.on("message", (data) => {
  //   console.log(`Client has sent us: ${data}`);
  // });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});
