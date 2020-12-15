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
  logGrid(store);
  const userChoice = await getUserGridChoice(store);
  setUserGridChoice(store, userChoice);

  const check = await checkForGameOver(store);
  if (!check) {
    const cpuChoice = await getCpuGridChoice(store);
    setCpuGridChoice(store, cpuChoice);
  }
};

const cpuTurn = async (store) => {
  const cpuChoice = await getCpuGridChoice(store);
  setCpuGridChoice(store, cpuChoice);

  const check = await checkForGameOver(store);
  if (!check) {
    logGrid(store);
    const userChoice = await getUserGridChoice(store);
    setUserGridChoice(store, userChoice);
  }
};

const play = async (store) => {
  setTeamChoice(store, await getTeamChoice());
  playOrder(store, pickOrder());
  // playOrder(store, 0.2); // TESTING
  while (!store.winner) {
    if (store.firstPlayer === "user") {
      await userTurn(store);
    } else {
      await cpuTurn(store);
    }
  }
};

module.exports = play;
