// const waitingPlayers = [];
const { sleep } = require("./helpers");
const { HumanPlayer } = require("./player");

// const matchPlayers = (player) => {
//   waitingPlayers.push(player);
//   if (waitingPlayers.length > 1) {
//     const playerA = waitingPlayers.pop();
//     const playerB = waitingPlayers.pop();
//     return [playerA, playerB];
//   } else {
//     player.log("You're still awaiting a match");
//     return null;
//   }
// }

const testPlayer = new HumanPlayer("test");

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
  async matchPlayers(player) {
    if (this.waitingPlayers.length > 1) {
      const player1 = await this.waitingPlayers.pop();
      console.log(player1);
      const player2 = await this.waitingPlayers.pop();
      console.log(player2);
      // player.log("Opponent player has joined your game")
      return [player1, player2];
    } else {
      player.log("Waiting for an opponent to join lobby");
      return false;
    }
  }
  async getWaitingPlayer(player) {
    if (this.waitingPlayers.length > 1) {
      let target = this.waitingPlayers.filter(
        (waiting) => waiting !== player
      )[0];
      let index = this.waitingPlayers.indexOf(target);
      this.waitingPlayers.splice(index, 1);
      target.inGame = true;
      return target;
    } else {
      player.log("Waiting for another player to join lobby");
    }
  }
  async matchWithWaitingPlayer(player) {
    let matchedPlayer = await this.getWaitingPlayer(player);
    let index = this.waitingPlayers.indexOf(player);
    this.waitingPlayers.splice(index, 1);
    player.inGame = true;
    return [player, matchedPlayer];
  }
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
    // let matchedPlayers = false;
    // while (!matchedPlayers) {
    while (true) {
      let matchedPlayers = await this.matchPlayers(player);
      if (matchedPlayers) {
        player.log("Opponent player has joined your game");
        return matchedPlayers;
      } else {
        player.log("Waiting for an opponent to join lobby");
        await sleep(5000);
      }
    }
  }
}

// const player1 = new HumanPlayer("player1");
// const player2 = new HumanPlayer("player2");
// const player3 = new HumanPlayer("player3");

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
