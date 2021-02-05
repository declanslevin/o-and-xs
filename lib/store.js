const { sleep } = require("./helpers");

class Player {
  constructor(name = null, isHuman = null) {
    this.name = name;
    this.isHuman = isHuman;
  }
}

class Player1 extends Player {
  constructor(player) {
    super(player);
    this.name = "Player 1";
    this.isHuman = true;
  }
}

class Player2 extends Player {
  constructor(player) {
    super(player);
    this.name = "Player 2";
    this.isHuman = true;
  }
}

class SinglePlayer extends Player {
  constructor(player) {
    super(player);
    this.name = "You";
    this.isHuman = true;
  }
}

class CpuPlayer extends Player {
  constructor(player) {
    super(player);
    this.name = "CPU";
    this.isHuman = false;
  }
}

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
    winner = false
  ) {
    this.ws = ws;
    this.grid = grid;
    this.players = players;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
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
      if (this.players[key].name === "CPU") {
        player = key;
      }
    });
    return player;
  }
  setPlayers(singlePlayer, teamChoice) {
    if (singlePlayer) {
      if (teamChoice === "O") {
        this.players.O = new SinglePlayer();
        this.players.X = new CpuPlayer();
      } else {
        this.players.O = new CpuPlayer();
        this.players.X = new SinglePlayer();
      }
    } else {
      if (teamChoice === "O") {
        this.players.O = new Player1();
        this.players.X = new Player2();
      } else {
        this.players.O = new Player2();
        this.players.X = new Player1();
      }
    }
  }
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
  setUserGridChoice(choice) {
    this.grid[choice] = this.nextPlayer;
    this.choices.push(choice);
  }
  async setCpuGridChoice(choice) {
    const cpuPlayer = this.getCpuPlayer();
    this.grid[choice] = cpuPlayer;
    this.choices.push(choice);
    if (this.ws) {
      let cpuChoiceObj = {
        type: "cpuChoice",
        choice: choice,
        team: cpuPlayer,
      };
      // TODO : Await for callback
      await sleep(500);
      this.ws.send(JSON.stringify(cpuChoiceObj));
    }
  }
  setWinner(team) {
    this.winner = team;
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
  logGrid() {
    if (this.ws) {
      this.log(`&nbsp;--- --- ---<br>
        | ${this.grid[1]} | ${this.grid[2]} | ${this.grid[3]} |<br>
        &nbsp;--- --- ---<br>
        | ${this.grid[4]} | ${this.grid[5]} | ${this.grid[6]} |<br>
        &nbsp;--- --- ---<br>
        | ${this.grid[7]} | ${this.grid[8]} | ${this.grid[9]} |<br>
        &nbsp;--- --- ---
        `);
    } else {
      this.log(
        `
         --- --- ---
        | ${this.grid[1]} | ${this.grid[2]} | ${this.grid[3]} |
         --- --- ---
        | ${this.grid[4]} | ${this.grid[5]} | ${this.grid[6]} |
         --- --- ---
        | ${this.grid[7]} | ${this.grid[8]} | ${this.grid[9]} |
         --- --- ---
        `
      );
    }
  }
}

exports.Store = Store;
