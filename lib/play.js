const { getTeamChoice } = require("./chooseTeam");
const {
  setTeamChoice,
  setUserGridChoice,
  setCpuGridChoice,
} = require("./store");
const { pickOrder, playOrder } = require("./playOrder");
const logGrid = require("./logGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getCpuGridChoice } = require("./chooseCpuGrid");
const { checkForGameOver } = require("./checkWin");

const userTurn = async (store) => {
  setUserGridChoice(store, await getUserGridChoice(store));
  if (!checkForGameOver(store)) {
    setCpuGridChoice(store, await getCpuGridChoice(store));
  }
  logGrid(store);
};

const cpuTurn = async (store) => {
  setCpuGridChoice(store, await getCpuGridChoice(store));
  logGrid(store);
  if (!checkForGameOver(store)) {
    setUserGridChoice(store, await getUserGridChoice(store));
  }
};

const play = async (store) => {
  setTeamChoice(store, await getTeamChoice());
  playOrder(store, pickOrder());
  logGrid(store);
  while (store.winner === false) {
    if (store.firstPlayer === "user") {
      await userTurn(store);
    } else {
      await cpuTurn(store);
    }
  }
};

module.exports = play;
