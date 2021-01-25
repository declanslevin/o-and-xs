const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { getNumPlayersChoice } = require("./chooseNumPlayers");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const Store = require("./store");

const recieveUserGridChoice = async (store) => {
  return new Promise((resolve) => {
    store.ws.on("message", (message) => {
      let gridObj = JSON.parse(message);
      if (gridObj.id === "grid") {
        return resolve(gridObj.grid);
      }
    });
  });
};

const userTurn = async (store) => {
  const userChoice = store.ws
    ? await recieveUserGridChoice(store)
    : await getUserGridChoice(store);
  store.setUserGridChoice(userChoice);
};

const cpuTurn = async (store) => {
  const cpuChoice = await getCpuGridChoice(store);
  store.setCpuGridChoice(cpuChoice);
};

const makeTurn = async (store) => {
  if (store.singlePlayer) {
    if (store.nextPlayer === "player1") {
      store.logGrid();
      await userTurn(store);
    } else {
      await cpuTurn(store);
    }
  } else {
    store.logGrid();
    await userTurn(store);
  }
};

const play = async (store) => {
  const singlePlayer = await getNumPlayersChoice(store);
  store.setSinglePlayer(singlePlayer);
  const teamChoice = await getTeamChoice(store);
  store.setTeamChoice(teamChoice);
  setPlayOrder(store, pickOrder());
  if (store.ws) {
    await store.sendNextPlayerToBrowser();
    await store.sendNextPlayerTeamToBrowser();
  }
  while (!store.winner) {
    const check = await checkForGameOver(store);
    if (!check) {
      await makeTurn(store);
      store.setNextPlayer();
      if (store.ws) {
        store.sendNextPlayerToBrowser();
        store.sendNextPlayerTeamToBrowser();
      }
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

exports.userTurn = userTurn;
exports.cpuTurn = cpuTurn;
exports.makeTurn = makeTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
