const { checkForGameOver, waitForGameOver } = require("./checkWin");
const { playAgain } = require("./playAgain");
const { Game } = require("./game");
const rl = require("./rl");

const playerTurn = async (game, player) => {
  const choice = await player.getGridChoice(game);
  player.setGridChoice(game, choice);
};

const makeTurn = async (game) => {
  const player = game.players[game.nextPlayer];
  player.logGrid(game);
  await playerTurn(game, player);
  game.setNextPlayer();
};

const promptForGameModeChoice = () => {
  return new Promise((resolve) => {
    rl.question(
      "Select your game mode: \n  1) CPU \n  2) Local 2-Player \n  3) Online 2-Player\n",
      (choice) => {
        return resolve(Number(choice));
      }
    );
  });
};

const isValidGameChoice = (choice) => {
  if (choice === 1 || choice === 2 || choice === 3) {
    return true;
  } else {
    // Change this to a player/game log, if possible?
    console.log("Please enter 1, 2 or 3");
    return false;
  }
};

const getGameModeChoice = async () => {
  while (true) {
    let choice = await promptForGameModeChoice();
    if (isValidGameChoice(choice)) {
      if (choice === 1) {
        return "cpu";
      } else if (choice === 2) {
        return "local";
      } else if (choice === 3) {
        return "online";
      }
    }
  }
};

const receiveGameModeChoice = async (player) => {
  return new Promise((resolve) => {
    player.ws.on("message", (message) => {
      let msg = JSON.parse(message);
      if (msg.type === "mode") {
        return resolve(msg.mode);
      }
    });
  });
};

const getGameMode = async (player) => {
  return player.ws
    ? await receiveGameModeChoice(player)
    : await getGameModeChoice();
};

const play = async (game, players) => {
  if (players) {
    await game.setPlayers(players);
    game.setPlayOrder();

    while (!game.winner) {
      const check = await checkForGameOver(game);
      if (!check) {
        await makeTurn(game);
      }
    }
  } else {
    await waitForGameOver(game);
  }
};

const runPlayLoop = async (lobby, player) => {
  console.log("Starting runPlayLoop");
  let playAgainResult = true;
  while (playAgainResult) {
    const mode = await getGameMode(player);
    if (mode === "online") {
      lobby.addAsWaitingPlayer(player);
      let players = await lobby.waitForOpponent(player);
      if (players) {
        const game = new Game();
        lobby.addGame(game);
        await play(lobby, game, players);
      } else {
        const game = lobby.getGameFromPlayer(player);
        await play(lobby, game);
      }
    }
    playAgainResult = await playAgain(player);
    if (!playAgainResult) {
      player.log("Thank you for playing!");
      return null;
      // process.exit(0);
    }
  }
};

exports.playerTurn = playerTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
