// const waitingPlayers = [];
// const { Game } = require("./game");
const { sleep } = require("./helpers");
const { HumanPlayer } = require("./player");

// const testPlayer = new HumanPlayer("test");

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
    console.log("Adding you to the lobby");
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
      player1.inGame = true;
      player2.inGame = true;
      return [player1, player2];
    } else {
      player.log("Waiting for an opponent to join lobby");
      return false;
    }
  }
  // async getWaitingPlayer(player) {
  //   if (this.waitingPlayers.length > 1) {
  //     let target = this.waitingPlayers.filter(
  //       (waiting) => waiting !== player
  //     )[0];
  //     let index = this.waitingPlayers.indexOf(target);
  //     this.waitingPlayers.splice(index, 1);
  //     target.inGame = true;
  //     return target;
  //   } else {
  //     player.log("Waiting for another player to join lobby");
  //   }
  // }
  // async matchWithWaitingPlayer(player) {
  //   let matchedPlayer = await this.getWaitingPlayer(player);
  //   let index = this.waitingPlayers.indexOf(player);
  //   this.waitingPlayers.splice(index, 1);
  //   player.inGame = true;
  //   return [player, matchedPlayer];
  // }
  // async waitForOpponent(player) {
  //   let opponent = false;
  //   while (!opponent) {
  //     // while (this.waitingPlayers.length <= 1) {
  //     await sleep(5000);
  //     if (player.inGame) {
  //       player.log("Opponent player has joined your game");
  //       opponent = true;
  //     } else {
  //       player.log("Waiting for an opponent to join lobby");
  //     }
  //   }
  // }
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

// const player1 = new HumanPlayer("player1");
// const player2 = new HumanPlayer("player2");
// const player3 = new HumanPlayer("player3");
// const player4 = new HumanPlayer("player4");
// const player5 = new HumanPlayer("player5");
// const player6 = new HumanPlayer("player6");

// const lobby = new Lobby();
// lobby.addGame(new Game());
// lobby.addGame(new Game());
// lobby.addGame(new Game());
// lobby.games.game_1.players.O = player1;
// lobby.games.game_1.players.X = player2;
// lobby.games.game_2.players.O = player3;
// lobby.games.game_2.players.X = player4;
// lobby.games.game_3.players.O = player5;
// lobby.games.game_3.players.X = player6;

// // console.log(lobby);
// // console.log(lobby.games.game_2.players);
// console.log(lobby.getGameFromPlayer(player4));

// const createPlayers = (lobby) => {
//   for (let i = 1; i < 7; i++) {
//     lobby.addAsWaitingPlayer(new HumanPlayer(`player${i}`))
//   }
// }

// const lobby = new Lobby();
// lobby.addAsWaitingPlayer(player1);
// lobby.addAsWaitingPlayer(player2);
// lobby.addAsWaitingPlayer(player3);
// console.log(lobby);
// console.log("**************");
// // console.log(lobby.getWaitingPlayer(player1));
// // console.log("**************");
// console.log(lobby);
// console.log(lobby.matchWithWaitingPlayer(player1));

exports.Lobby = Lobby;
