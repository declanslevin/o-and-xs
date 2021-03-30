import Game from "./game";
import { sleep } from "./helpers";
import { Player } from "./player";

class Lobby {
  waitingPlayers: Player[];
  games: Set<Game>;
  constructor(waitingPlayers: Player[] = [], games: Set<Game> = new Set()) {
    this.waitingPlayers = waitingPlayers;
    this.games = games;
  }
  addGame(game: Game): void {
    this.games.add(game);
  }
  addAsWaitingPlayer(player: Player): void {
    if (!this.waitingPlayers.includes(player)) {
      player.log("Adding you to the lobby");
      this.waitingPlayers.push(player);
    }
  }
  getGameFromPlayer(player: Player): Game {
    for (let game of this.games) {
      if (Object.values(game.players).includes(player)) {
        return game;
      }
    }
    throw new Error("This player isnt in a game");
  }
  matchPlayers(): [Player, Player] | null {
    if (this.waitingPlayers.length > 1) {
      const player1 = this.waitingPlayers.pop();
      const player2 = this.waitingPlayers.pop();
      return [player1!, player2!];
    } else {
      return null;
    }
  }
  async waitForOpponent(player: Player): Promise<[Player, Player] | null> {
    let loopCount = 0;
    while (true) {
      let matchedPlayers = this.matchPlayers();
      if (matchedPlayers) {
        player.log("Opponent player has joined your game");
        return matchedPlayers;
      } else {
        if (!this.waitingPlayers.includes(player)) {
          return null;
        }
        if (loopCount % 10 === 0) {
          player.log("Waiting for an opponent to join lobby");
        }
        loopCount++;
        await sleep(500);
      }
    }
  }
}

export default Lobby;
