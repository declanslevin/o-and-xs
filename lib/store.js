const { sleep } = require("./helpers");
const { HumanPlayer, CpuPlayer } = require("./player");

class Store {
  constructor(
    ws = null,
    grid = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
    },
    players = {
      O: null,
      X: null,
    },
    nextPlayer = null,
    choices = [],
    winner = false,
    mode = null
  ) {
    this.ws = ws;
    this.grid = grid;
    this.players = players;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
    this.mode = mode;
  }
  getPlayerName(player) {
    return this.players[player].name;
  }
  getNextPlayerName() {
    return this.players[this.nextPlayer].name;
  }
  getCpuPlayer() {
    let player;
    Object.keys(this.players).forEach((key) => {
      if (this.players[key].constructor.name === "CpuPlayer") {
        player = key;
      }
    });
    return player;
  }
  getFirstHumanPlayer() {
    let playerArr = [];
    Object.keys(this.players).forEach((key) => {
      if (this.players[key].constructor.name === "HumanPlayer") {
        playerArr.push(key);
      }
    });
    return playerArr[0];
  }
  setMode(mode) {
    this.mode = mode;
  }
  setPlayer(player, team) {
    this.players[team] = player;
  }
  // setPlayers(singlePlayer, teamChoice) {
  //   if (singlePlayer) {
  //     if (teamChoice === "O") {
  //       this.players.O = new HumanPlayer("You");
  //       this.players.X = new CpuPlayer();
  //     } else {
  //       this.players.O = new CpuPlayer();
  //       this.players.X = new HumanPlayer("You");
  //     }
  //   } else {
  //     if (teamChoice === "O") {
  //       this.players.O = new HumanPlayer("Player 1");
  //       this.players.X = new HumanPlayer("Player 2");
  //     } else {
  //       this.players.O = new HumanPlayer("Player 2");
  //       this.players.X = new HumanPlayer("Player 1");
  //     }
  //   }
  // }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      this.nextPlayer = this.nextPlayer === "X" ? "O" : "X";
    }
    if (this.ws) {
      this._sendNextPlayerToBrowser();
    }
  }
  setWinner(team) {
    this.winner = team;
  }
  isSinglePlayer() {
    return this.players.O.isHuman && this.players.X.isHuman ? false : true;
  }
  _sendNextPlayerToBrowser() {
    const team = this.nextPlayer;
    let playerObj = {
      type: "player",
      team: team,
      player: this.players[team],
    };
    this.ws.send(JSON.stringify(playerObj));
  }
  log(message) {
    if (this.ws) {
      let logObj = {
        type: "log",
        log: message,
      };
      this.ws.send(JSON.stringify(logObj));
    } else {
      console.log(message);
    }
  }
}

// const store = new Store();
// store.players = {
//   X: new HumanPlayer("You"),
//   O: new CpuPlayer(),
// };
// const human = store.getFirstHumanPlayer();
// console.log(human);

exports.Store = Store;
