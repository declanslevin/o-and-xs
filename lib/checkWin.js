const { sleep } = require("./helpers");

const mapGridValues = (game) => {
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
        return game.grid[ref];
      })
      .join("");
    return result;
  });
};

const checkMappedGridForWin = async (game, array) => {
  let winner = false;
  array.map((result) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
      game.setWinner(winner);
    }
  });
  return winner;
};

const checkForDraw = async (game) => {
  if (!game.winner && game.choices.length === 9) {
    game.setWinner("draw");
    return true;
  } else {
    return false;
  }
};

const logDraw = async (game, draw) => {
  if (draw) {
    const player = game.players[game.getFirstHumanPlayer()];
    player.logGrid(game);
    player.log("You drew!");
    if (game.ws) {
      let drawObj = {
        type: "draw",
      };
      game.ws.send(JSON.stringify(drawObj));
    }
  }
};

const checkForWin = async (game) => {
  let winner = await checkMappedGridForWin(game, mapGridValues(game));
  return Boolean(winner);
};

const logWinner = async (game, win) => {
  if (win) {
    const winner = game.players[game.winner];
    winner.logGrid(game);
    winner.log(`${winner.name} won!`);
    if (game.ws) {
      let winObj = {
        type: "win",
        winner: winner,
      };
      game.ws.send(JSON.stringify(winObj));
    }
  }
};

const checkForGameOver = async (game) => {
  const win = await checkForWin(game);
  const draw = await checkForDraw(game);
  await logWinner(game, win);
  await logDraw(game, draw);
  return win || draw;
};

const waitForGameOver = async (game) => {
  let check = await checkForGameOver(game);
  while (!check) {
    await sleep(1000);
    check = await checkForGameOver(game);
  }
};

exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
exports.checkForDraw = checkForDraw;
exports.checkForWin = checkForWin;
exports.checkForGameOver = checkForGameOver;
exports.waitForGameOver = waitForGameOver;
