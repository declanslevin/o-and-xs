const { getTeamChoice } = require("./chooseTeam");
const { getNumPlayersChoice } = require("./chooseNumPlayers");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const { Store } = require("./store");
// const { CpuPlayer, HumanPlayer } = require("./player");
// const { createWebSocketConnection } = require("../server/webSocket");

const playerTurn = async (store) => {
  const thisPlayer = store.nextPlayer;
  const choice = await store.players[thisPlayer].getGridChoice(store);
  store.setGridChoice(choice);
};

const makeTurn = async (store) => {
  const thisPlayer = store.nextPlayer;
  store.players[thisPlayer].logGrid(store);
  await playerTurn(store);
};

const recieveGameSetupChoices = async (store) => {
  return new Promise((resolve) => {
    store.ws.on("message", (message) => {
      let msg = JSON.parse(message);
      if (msg.type === "prompt") {
        return resolve([msg.players, msg.team]);
      }
    });
  });
};

const gameSetup = async (store) => {
  if (store.ws) {
    const choices = await recieveGameSetupChoices(store);
    store.setPlayers(choices[0], choices[1]);
  } else {
    const singlePlayer = await getNumPlayersChoice(store);
    const teamChoice = await getTeamChoice(store);
    store.setPlayers(singlePlayer, teamChoice);
  }
};

const play = async (store) => {
  await gameSetup(store);
  setPlayOrder(store, pickOrder());
  while (!store.winner) {
    const check = await checkForGameOver(store);
    if (!check) {
      await makeTurn(store);
      store.setNextPlayer();
    }
  }
};

const runPlayLoop = async (ws) => {
  let playAgainResult = true;
  while (playAgainResult) {
    const store = new Store(ws);
    await play(store);

    playAgainResult = await playAgain(store);
    if (!playAgainResult) {
      store.log("Thank you for playing!");
      process.exit(0);
    }
  }
};

// const store = new Store();
// const human = new HumanPlayer("You");
// const ws = createWebSocketConnection();
// human.setWebSocketUi(ws);
// store.players = {
//   O: human,
//   X: new CpuPlayer(),
// };
// const players = [new HumanPlayer("You").setWebSocketUi(ws)]
// store.

// players = {
//   O: HumanPlayer {
//     name: "You",
//     ui: {
//       type: "WebSocketUi",
//       ws: ws
//     }
//   },
//   X: CpuPlayer {
//     name: "CPU"
//   }
// }
// console.log(store);
// console.log(store.players.O);

exports.playerTurn = playerTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
