import { sleep } from "./helpers";

const mapGridValues = (game: any) => {
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

const checkMappedGridForWin = async (game: any, array: any) => {
  let winner = false;
  array.map((result: any) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
      game.setWinner(winner);
    }
  });
  return winner;
};

const checkForDraw = async (game: any) => {
  if (!game.winner && game.choices.length === 9) {
    game.setWinner("draw");
    return true;
  } else {
    return false;
  }
};

const checkForWin = async (game: any) => {
  let winner = await checkMappedGridForWin(game, mapGridValues(game));
  return Boolean(winner);
};

const logGameOver = async (game: any, win: any, draw: any) => {
  if (win || draw) {
    let log;
    let gameOverObj;
    if (win) {
      const player = game.players[game.winner].name;
      log = `${player} won!`;
      gameOverObj = {
        type: "win",
        winner: player,
      };
    } else if (draw) {
      log = "You drew!";
      gameOverObj = {
        type: "draw",
      };
    }
    game.logGrid();
    game.log(log);
    game.send(gameOverObj);
  }
};

const checkForGameOver = async (game: any) => {
  const win = await checkForWin(game);
  const draw = await checkForDraw(game);
  await logGameOver(game, win, draw);
  return win || draw;
};

const waitForGameOver = async (game: any) => {
  let check = await checkForGameOver(game);
  while (!check) {
    await sleep(1000);
    check = await checkForGameOver(game);
  }
};

export {
  mapGridValues,
  checkMappedGridForWin,
  checkForDraw,
  checkForWin,
  checkForGameOver,
  waitForGameOver,
};
