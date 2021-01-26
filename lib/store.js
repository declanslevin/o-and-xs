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
    singlePlayer = null,
    player1 = {
      team: null,
      name: null,
    },
    player2 = {
      team: null,
      name: null,
    },
    nextPlayer = null,
    choices = [],
    winner = false
  ) {
    this.ws = ws;
    this.grid = grid;
    this.singlePlayer = singlePlayer;
    this.player1 = player1;
    this.player2 = player2;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
  }
  setSinglePlayer(boolean) {
    this.singlePlayer = boolean;
    this.player1.name = boolean ? "You" : "Player 1";
    this.player2.name = boolean ? "CPU" : "Player 2";
  }
  setTeamChoice(choice) {
    this.player1.team = choice;
    this.player2.team = choice === "O" ? "X" : "O";
  }
  setUserGridChoice(choice) {
    this.grid[choice] =
      this.nextPlayer === "player1" ? this.player1.team : this.player2.team;
    this.choices.push(choice);
  }
  setCpuGridChoice(choice) {
    this.grid[choice] = this.player2.team;
    this.choices.push(choice);
    if (this.ws) {
      let cpuChoiceObj = {
        type: "cpuChoice",
        choice: choice,
        team: this.player2.team,
      };
      // TODO : Await for callback
      setTimeout(() => {
        this.ws.send(JSON.stringify(cpuChoiceObj));
      }, 500);
    }
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      this.nextPlayer = this.nextPlayer === "player1" ? "player2" : "player1";
    }
    if (this.ws) {
      this._sendNextPlayerToBrowser();
      this._sendNextPlayerTeamToBrowser();
    }
  }
  nextPlayerName() {
    return this.nextPlayer === "player1"
      ? this.player1.name
      : this.player2.name;
  }
  _sendNextPlayerToBrowser() {
    let currentPlayerObj = {
      type: "currentPlayer",
      currentPlayer: this.nextPlayerName(),
    };
    this.ws.send(JSON.stringify(currentPlayerObj));
  }
  _sendNextPlayerTeamToBrowser() {
    let nextPlayer =
      this.nextPlayer === "player1" ? this.player1.team : this.player2.team;
    let currentPlayerTeamObj = {
      type: "currentPlayerTeam",
      currentPlayerTeam: nextPlayer,
    };
    this.ws.send(JSON.stringify(currentPlayerTeamObj));
  }
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

module.exports = Store;
