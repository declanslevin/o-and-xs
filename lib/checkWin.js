const logGrid = require("./logGrid");
const playAgain = require("./playAgain");

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

const checkMappedGridForWin = (array) => {
  let winner = false;
  array.map((result) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
    }
  });
  return winner;
};

const checkForDraw = (store) => {
  if (store.choices.length === 9 && store.winner === false) {
    console.log("You drew!");
    return true;
  } else {
    return false;
  }
};

const checkForWin = (store) => {
  let winner = checkMappedGridForWin(mapGridValues(store));
  if (winner === store.userTeam) {
    logGrid(store);
    console.log("You won!");
    return playAgain();
  } else if (winner === store.cpuTeam) {
    logGrid(store);
    console.log("CPU won!");
    return playAgain();
  }
};

const checkForGameOver = (store) => {
  checkForWin(store);
  if (checkForDraw(store)) {
    return playAgain();
  }
};

exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
exports.checkForDraw = checkForDraw;
exports.checkForWin = checkForWin;
exports.checkForGameOver = checkForGameOver;
