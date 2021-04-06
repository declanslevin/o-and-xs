import Game, { Grid, Team } from "./game";
import { Player, HumanPlayer, CpuPlayer } from "./player";

type Vs = "Cpu" | "Human";

const gameFactory = ({
  vs,
  grid,
  nextPlayer,
  choices = [],
  winner = null,
}: {
  vs: Vs;
  grid?: Grid;
  nextPlayer?: Team;
  choices?: number[];
  winner?: string | null;
}): Game => {
  let players: [Player, Player];
  switch (vs) {
    case "Cpu":
      players = [new HumanPlayer("You"), new CpuPlayer("CPU")];
      break;
    case "Human":
      players = [new HumanPlayer("Player 1"), new HumanPlayer("Player 2")];
      break;
    default:
      throw new Error("No vs argument supplied");
  }

  const game = new Game(players);
  game.players = {
    O: players[0],
    X: players[1],
  };
  if (grid) {
    game.grid = grid;
  }
  // TODO: Decide if you care about having a default nextPlayer in tests
  if (nextPlayer) {
    game.nextPlayer = nextPlayer;
  }
  game.choices = choices;
  game.winner = winner;

  return game;
};

export { gameFactory };
