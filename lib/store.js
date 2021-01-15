class Store {
  constructor(
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
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      this.nextPlayer = this.nextPlayer === "player1" ? "player2" : "player1";
    }
  }
  setWinner(team) {
    this.winner = team;
  }
  logGrid() {
    console.log(
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

module.exports = Store;
