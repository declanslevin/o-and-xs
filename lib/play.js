const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { getNumPlayersChoice } = require("./chooseNumPlayers");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const { TwoPlayerStore, SinglePlayerStore } = require("./store");

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
    if (store.nextPlayer === "user") {
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

let singlePlayer;
const play = async (store) => {
  singlePlayer = await getNumPlayersChoice();
  const teamChoice = await getTeamChoice(store);
  store.setTeamChoice(teamChoice);
  setPlayOrder(store, pickOrder());
  while (!store.winner) {
    const check = await checkForGameOver(store);
    if (!check) {
      await makeTurn(store);
      store.setNextPlayer();
    }
  }
};

const runPlayLoop = async () => {
  let playAgainResult = true;
  while (playAgainResult) {
    let store;
    const gridObj = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
    };
    if (singlePlayer) {
      store = new SinglePlayerStore();
      store.grid = gridObj;
    } else {
      store = new TwoPlayerStore();
      store.grid = gridObj;
    }
    await play(store);

    playAgainResult = await playAgain();
    if (!playAgainResult) {
      console.log("Thank you for playing!");
      process.exit(0);
    }
  }
};

exports.userTurn = userTurn;
exports.cpuTurn = cpuTurn;
exports.makeTurn = makeTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
