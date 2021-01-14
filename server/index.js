const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
// const wss = new WebSocket.Server({ port: 8082, noServer: true });

// const clients = new Set();

// http.createServer((req, res) => {
//   wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
// });

// const onSocketConnect = (ws) => {
//   clients.add(ws);

//   ws.on("connection", () => {
//     console.log("New client connected!");
//   });
//   ws.on("close", () => {
//     console.log("Client has disconnected");
//   });
// };
wss.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head);
});

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});
