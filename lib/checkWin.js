const logGrid = require("./logGrid");
const { playAgain } = require("./playAgain");
// const { store } = require("./store");

const mapGridValues = (store) => {
  let gridArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  return gridArray.map((array) => {
    let result = array
      .map((ref) => {
        return store.grid[ref];
      })
      .join("");
    return result;
  });
};

const checkMappedGridForWin = (store, array) => {
  let winner = false;
  array.map((result) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
    }
  });
  store.setWinner(winner);
  console.log(store);
  return winner;
};

const checkForDraw = (store) => {
  if (store.choices.length === 9 && !store.winner) {
    logGrid(store);
    console.log("You drew!");
    return true;
  } else {
    return false;
  }
};

const checkForWin = async (store) => {
  let winner = checkMappedGridForWin(store, mapGridValues(store));
  if (winner === store.userTeam) {
    logGrid(store);
    console.log("You won!");
    return await playAgain(store);
  } else if (winner === store.cpuTeam) {
    logGrid(store);
    console.log("CPU won!");
    return await playAgain(store);
  }
};

const checkForGameOver = async (store) => {
  await checkForWin(store);
  if (checkForDraw(store)) {
    return await playAgain(store);
  } else {
    return false;
  }
};

exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
exports.checkForDraw = checkForDraw;
exports.checkForWin = checkForWin;
exports.checkForGameOver = checkForGameOver;
