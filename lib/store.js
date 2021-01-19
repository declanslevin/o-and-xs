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
    userTeam = null,
    cpuTeam = null,
    nextPlayer = null,
    choices = [],
    winner = false
  ) {
    this.ws = ws;
    this.grid = grid;
    this.userTeam = userTeam;
    this.cpuTeam = cpuTeam;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
  }
  setTeamChoice(choice) {
    this.userTeam = choice;
    if (choice === "O") {
      this.cpuTeam = "X";
    } else {
      this.cpuTeam = "O";
    }
  }
  setUserGridChoice(choice) {
    this.grid[choice] = this.userTeam;
    this.choices.push(choice);
  }
  setCpuGridChoice(choice) {
    this.grid[choice] = this.cpuTeam;
    this.choices.push(choice);
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      if (this.nextPlayer === "user") {
        this.nextPlayer = "cpu";
      } else {
        this.nextPlayer = "user";
      }
    }
  }
  setWinner(player) {
    this.winner = player;
  }
  log(message) {
    if (this.ws) {
      this.ws.send(message);
    } else {
      console.log(message);
    }
  }
  logGrid() {
    // console.log(
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
  reset() {
    this.grid = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
    };
    this.userTeam = null;
    this.cpuTeam = null;
    this.nextPlayer = null;
    this.choices = [];
    this.winner = false;
  }
}

exports.Store = Store;
