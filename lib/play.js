const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { getNumPlayersChoice } = require("./chooseNumPlayers");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const Store = require("./store");

const userTurn = async (store) => {
  const userChoice = await getUserGridChoice(store);
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
    store.setSinglePlayer(choices[0]);
    store.setTeamChoice(choices[1]);
  } else {
    const singlePlayer = await getNumPlayersChoice(store);
    store.setSinglePlayer(singlePlayer);
    const teamChoice = await getTeamChoice(store);
    store.setTeamChoice(teamChoice);
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

exports.userTurn = userTurn;
exports.cpuTurn = cpuTurn;
exports.makeTurn = makeTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
