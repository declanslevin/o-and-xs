import { checkForGameOver, waitForGameOver } from "./checkWin";
import { playAgain } from "./playAgain";
import Game from "./game";
import { Player, HumanPlayer, CpuPlayer } from "./player";
import Lobby from "./lobby";

const playerTurn = async (game: Game, player: Player): Promise<void> => {
  const choice = await player.getGridChoice(game);
  player.setGridChoice(game, choice);
};

const makeTurn = async (game: Game): Promise<void> => {
  const player = game.players[game.nextPlayer];
  player.logGrid(game);
  await playerTurn(game, player);
  game.setNextPlayer();
};

const receiveGameModeChoice = async (player: HumanPlayer): Promise<string> => {
  return new Promise((resolve) => {
    if (player.ws) {
      player.ws.on("message", (message: string) => {
        let msg = JSON.parse(message);
        // TODO: Message validation
        if (msg.type === "mode") {
          return resolve(msg.mode);
        }
      });
    }
  });
};

const play = async (game: Game, players?: Player[]): Promise<void> => {
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

const runPlayLoop = async (
  lobby: Lobby,
  player: HumanPlayer
): Promise<void> => {
  console.log("Starting runPlayLoop");
  let playAgainResult = true;
  while (playAgainResult) {
    const mode = await receiveGameModeChoice(player);
    if (mode === "cpu") {
      const players = [player, new CpuPlayer()];
      const game = new Game();
      lobby.addGame(game);
      await play(game, players);
      // } else if (mode === "local") {
      //   const players = [player, new HumanPlayer("Player 2")];
      //   const game = new Game();
      //   lobby.addGame(game);
      //   await play(game, players);
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
      return;
      // process.exit(0);
    }
  }
};

export { playerTurn, play, runPlayLoop };
