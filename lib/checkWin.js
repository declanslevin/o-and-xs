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

const checkMappedGridForWin = async (store, array) => {
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
    store.setWinner("draw");
    return true;
  } else {
    return false;
  }
};

const logDraw = async (store, draw) => {
  if (draw) {
    const player = store.players[store.getFirstHumanPlayer()];
    player.logGrid(store);
    player.log("You drew!");
    if (store.ws) {
      let drawObj = {
        type: "draw",
      };
      store.ws.send(JSON.stringify(drawObj));
    }
  }
};

const checkForWin = async (store) => {
  let winner = await checkMappedGridForWin(store, mapGridValues(store));
  return Boolean(winner);
};

const logWinner = async (store, win) => {
  if (win) {
    const winner = store.players[store.winner];
    winner.logGrid(store);
    winner.log(`${winner.name} won!`);
    if (store.ws) {
      let winObj = {
        type: "win",
        winner: winner,
      };
      store.ws.send(JSON.stringify(winObj));
    }
  }
};

const checkForGameOver = async (store) => {
  const win = await checkForWin(store);
  const draw = await checkForDraw(store);
  await logWinner(store, win);
  await logDraw(store, draw);
  return win || draw;
};

exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
exports.checkForDraw = checkForDraw;
exports.checkForWin = checkForWin;
exports.checkForGameOver = checkForGameOver;
