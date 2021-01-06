const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { checkForGameOver } = require("./checkWin");
// const logGrid = require("./logGrid");
const { pickOrder, setPlayOrder } = require("./playOrder");
// const {
//   setTeamChoice,
//   setUserGridChoice,
//   setCpuGridChoice,
//   setNextPlayer,
// } = require("./store");

const userTurn = async (store) => {
  const check = await checkForGameOver(store);
  if (!check) {
    const userChoice = await getUserGridChoice(store);
    store.setUserGridChoice(userChoice);
  }
};

const cpuTurn = async (store) => {
  const check = await checkForGameOver(store);
  if (!check) {
    const cpuChoice = await getCpuGridChoice(store);
    store.setCpuGridChoice(cpuChoice);
  }
};

const makeTurn = async (store) => {
  if (store.nextPlayer === "user") {
    store.logGrid();
    await userTurn(store);
  } else {
    await cpuTurn(store);
  }
};

const play = async (store) => {
  const teamChoice = await getTeamChoice();
  store.setTeamChoice(teamChoice);
  setPlayOrder(store, pickOrder());
  while (!store.winner) {
    await makeTurn(store);
    store.setNextPlayer();
  }
};

exports.userTurn = userTurn;
exports.cpuTurn = cpuTurn;
exports.makeTurn = makeTurn;
exports.play = play;
