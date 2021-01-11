const { getCpuGridChoice } = require("./chooseCpuGrid");
const { getUserGridChoice } = require("./chooseUserGrid");
const { getTeamChoice } = require("./chooseTeam");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");

const userTurn = async (store) => {
  const userChoice = await getUserGridChoice(store);
  store.setUserGridChoice(userChoice);
};

const cpuTurn = async (store) => {
  const cpuChoice = await getCpuGridChoice(store);
  store.setCpuGridChoice(cpuChoice);
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
    const check = await checkForGameOver(store);
    if (!check) {
      await makeTurn(store);
      store.setNextPlayer();
    }
    if (store.winner) {
      const playAgainResult = await playAgain();
      if (playAgainResult) {
        store.reset();
        return await play(store);
      } else {
        process.on("exit", () => {
          console.log("Thank you for playing!");
        });
        process.exit(0);
      }
    }
    console.log(store);
  }
};

exports.userTurn = userTurn;
exports.cpuTurn = cpuTurn;
exports.makeTurn = makeTurn;
exports.play = play;
