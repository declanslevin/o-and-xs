import { sleep } from "./helpers";

class Lobby {
  // TODO
  waitingPlayers: any[];
  games: Set<any>;
  constructor(waitingPlayers = [], games = new Set()) {
    this.waitingPlayers = waitingPlayers;
    this.games = games;
  }
  addGame(game: any) {
    this.games.add(game);
  }
  addAsWaitingPlayer(player: any) {
    if (!this.waitingPlayers.includes(player)) {
      player.log("Adding you to the lobby");
      this.waitingPlayers.push(player);
    }
  }
  getGameFromPlayer(player: any) {
    for (let game of this.games) {
      if (Object.values(game.players).includes(player)) {
        return game;
      }
    }
  }
  matchPlayers(player: any) {
    if (this.waitingPlayers.length > 1) {
      const player1 = this.waitingPlayers.pop();
      const player2 = this.waitingPlayers.pop();
      return [player1, player2];
    } else {
      return false;
    }
  }

  async waitForOpponent(player: any) {
    let loopCount = 0;
    while (true) {
      let matchedPlayers = this.matchPlayers(player);
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

exports.Lobby = Lobby;
