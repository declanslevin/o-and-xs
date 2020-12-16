const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { checkForGameOver } = require("./checkWin");
const logGrid = require("./logGrid");
const { pickOrder, setPlayOrder } = require("./playOrder");
const {
  setTeamChoice,
  setUserGridChoice,
  setCpuGridChoice,
  setNextPlayer,
} = require("./store");

const userTurn = async (store) => {
  const check = await checkForGameOver(store);
  if (!check) {
    logGrid(store);
    const userChoice = await getUserGridChoice(store);
    setUserGridChoice(store, userChoice);
  }
};

const cpuTurn = async (store) => {
  const check = await checkForGameOver(store);
  if (!check) {
    const cpuChoice = await getCpuGridChoice(store);
    setCpuGridChoice(store, cpuChoice);
  }
};

const makeTurn = async (store) => {
  if (store.nextPlayer === "user") {
    await userTurn(store);
  } else {
    await cpuTurn(store);
  }
};

const play = async (store) => {
  const teamChoice = await getTeamChoice();
  setTeamChoice(store, teamChoice);
  setPlayOrder(store, pickOrder());
  // setPlayOrder(store, 0.2); // TESTING
  while (!store.winner) {
    await makeTurn(store);
    setNextPlayer(store);
  }
};

module.exports = play;
