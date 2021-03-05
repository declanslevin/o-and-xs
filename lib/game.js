class Game {
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
  setNextPlayer(player) {
    this.nextPlayer = player;
    // Add send to browser?
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
  setWinner(team) {
    this.winner = team;
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

exports.Game = Game;
