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
  if (!store.winner && store.choices.length === 9) {
    store.logGrid();
    console.log("You drew!");
    store.setWinner("draw");
    return true;
  } else {
    return false;
  }
};

const checkForWin = async (store) => {
  let winner = checkMappedGridForWin(store, mapGridValues(store));
  if (store.numPlayers === 1) {
    const log = winner === store.userTeam ? "You won!" : "CPU won!";
    if (winner) {
      store.logGrid();
      console.log(log);
    }
    return winner ? true : false;
  } else {
    const log = winner === store.player1 ? "Player 1 won!" : "Player 2 won!";
    if (winner) {
      store.logGrid();
      console.log(log);
    }
    return winner ? true : false;
  }
};

const checkForGameOver = async (store) => {
  const win = await checkForWin(store);
  const draw = await checkForDraw(store);
  return !win && !draw ? false : true;
};

exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
exports.checkForDraw = checkForDraw;
exports.checkForWin = checkForWin;
exports.checkForGameOver = checkForGameOver;
