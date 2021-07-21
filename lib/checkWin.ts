import Game from "./game";
import { sleep } from "./helpers";
import { MessageToFrontEnd } from "./message";

const mapGridValues = (game: Game): string[] => {
  const gridArray = [
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
    const result = array
      .map((ref) => {
        return game.grid[ref];
      })
      .join("");
    return result;
  });
};

const checkMappedGridForWin = async (
  game: Game,
  resultArray: string[]
): Promise<string | null> => {
  let winner = null;
  resultArray.forEach((result: string) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
      game.setWinner(winner);
    }
  });
  return winner;
};

const checkForDraw = async (game: Game): Promise<boolean> => {
  if (!game.winner && game.choices.length === 9) {
    game.setWinner("draw");
    return true;
  } else {
    return false;
  }
};

const checkForWin = async (game: Game): Promise<boolean> => {
  const winner = await checkMappedGridForWin(game, mapGridValues(game));
  return Boolean(winner);
};

const logGameOver = async (
  game: Game,
  win: boolean,
  draw: boolean
): Promise<void> => {
  if (win || draw) {
    let log: string;
    let gameOverObj: MessageToFrontEnd;
    if (win) {
      if (!game.winner) {
        throw new Error("game.winner is not a string");
      }
      // @ts-ignore
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
    } else {
      throw new Error("There was no win or draw");
    }
    game.logGrid();
    game.log(log);
    game.setGameStage("over");
    game.send(gameOverObj);
  }
};

const checkForGameOver = async (game: Game): Promise<boolean> => {
  const win = await checkForWin(game);
  const draw = await checkForDraw(game);
  await logGameOver(game, win, draw);
  return win || draw;
};

const waitForGameOver = async (game: Game): Promise<void> => {
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
