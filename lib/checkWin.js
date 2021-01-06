const { playAgain } = require("./playAgain");

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
      store.setWinner(winner);
    }
  });
  return winner;
};

const checkForDraw = async (store) => {
  if (store.choices.length === 9 && !store.winner) {
    await store.logGrid();
    await console.log("You drew!");
    return true;
  } else {
    return false;
  }
};

const checkForWin = async (store) => {
  let winner = checkMappedGridForWin(store, mapGridValues(store));
  if (winner === store.userTeam) {
    store.logGrid();
    console.log("You won!");
    return await playAgain(store);
  } else if (winner === store.cpuTeam) {
    store.logGrid();
    console.log("CPU won!");
    return await playAgain(store);
  }
};

const checkForGameOver = async (store) => {
  await checkForWin(store);
  const draw = await checkForDraw(store);
  if (draw) {
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
