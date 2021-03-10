const { sleep } = require("./helpers");

class Lobby {
  constructor(waitingPlayers = [], games = {}) {
    this.waitingPlayers = waitingPlayers;
    this.games = games;
  }
  addGame(game) {
    const sortedKeys = Object.keys(this.games).sort();
    if (sortedKeys.length === 0) {
      this.games["game_" + "1"] = game;
    } else {
      const index = Number(sortedKeys.slice(-1)[0].split("_")[1]) + 1;
      this.games["game_" + index] = game;
    }
  }
  addAsWaitingPlayer(player) {
    player.log("Adding you to the lobby");
    if (!this.waitingPlayers.includes(player)) {
      this.waitingPlayers.push(player);
    }
  }
  getGameFromPlayer(player) {
    let game;
    const gameKeys = Object.keys(this.games);
    gameKeys.forEach((key) => {
      const playerValues = Object.values(this.games[key].players);
      playerValues.forEach((playerVal) => {
        if (playerVal === player) {
          game = this.games[key];
        }
      });
    });
    return game;
  }
  async matchPlayers(player) {
    if (this.waitingPlayers.length > 1) {
      const player1 = await this.waitingPlayers.pop();
      const player2 = await this.waitingPlayers.pop();
      return [player1, player2];
    } else {
      player.log("Waiting for an opponent to join lobby");
      return false;
    }
  }

  async waitForOpponent(player) {
    while (true) {
      let matchedPlayers = await this.matchPlayers(player);
      if (matchedPlayers) {
        player.log("Opponent player has joined your game");
        return matchedPlayers;
      } else {
        if (!this.waitingPlayers.includes(player)) {
          return null;
        }
        player.log("Waiting for an opponent to join lobby");
        await sleep(5000);
      }
    }
  }
}

exports.Lobby = Lobby;
