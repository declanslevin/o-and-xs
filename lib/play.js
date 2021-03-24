const { checkForGameOver, waitForGameOver } = require("./checkWin");
const { playAgain } = require("./playAgain");
const { Game } = require("./game");
const { HumanPlayer, CpuPlayer } = require("./player");

const playerTurn = async (game, player) => {
  const choice = await player.getGridChoice(game);
  player.setGridChoice(game, choice);
};

const makeTurn = async (game) => {
  const player = game.players[game.nextPlayer];
  player.logGrid(game);
  await playerTurn(game, player);
  game.setNextPlayer();
  console.log(game);
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

const play = async (game, players) => {
  if (players) {
    await game.setPlayers(players);
    game.setPlayOrder();
    console.log(game);

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
    const mode = await receiveGameModeChoice(player);
    if (mode === "cpu") {
      const players = [player, new CpuPlayer()];
      const game = new Game();
      lobby.addGame(game);
      await play(game, players);
    } else if (mode === "local") {
      const players = [player, new HumanPlayer("Player 2")];
      const game = new Game();
      lobby.addGame(game);
      await play(game, players);
    } else if (mode === "online") {
      lobby.addAsWaitingPlayer(player);
      let players = await lobby.waitForOpponent(player);
      if (players) {
        const game = new Game();
        lobby.addGame(game);
        await play(game, players);
      } else {
        const game = lobby.getGameFromPlayer(player);
        await play(game);
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
