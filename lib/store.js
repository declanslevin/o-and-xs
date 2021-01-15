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
    userTeam = null,
    cpuTeam = null,
    nextPlayer = null,
    choices = [],
    winner = false
  ) {
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

class BaseStore {
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
    nextPlayer = null,
    choices = [],
    winner = false
  ) {
    this.grid = grid;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
  }
  setWinner(player) {
    this.winner = player;
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

class SinglePlayerStore extends BaseStore {
  constructor(userTeam = null, cpuTeam = null, numPlayers = 1) {
    super(userTeam, cpuTeam);
    this.userTeam = userTeam;
    this.cpuTeam = cpuTeam;
    this.numPlayers = numPlayers;
  }
  setUserGridChoice(choice) {
    this.grid[choice] = this.userTeam;
    this.choices.push(choice);
  }
  setCpuGridChoice(choice) {
    this.grid[choice] = this.cpuTeam;
    this.choices.push(choice);
  }
  setTeamChoice(choice) {
    this.userTeam = choice;
    this.cpuTeam = choice === "O" ? "X" : "O";
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      this.nextPlayer = this.nextPlayer === "user" ? "cpu" : "user";
    }
  }
}

class TwoPlayerStore extends BaseStore {
  constructor(player1 = null, player2 = null, numPlayers = 2) {
    super(player1, player2);
    this.player1 = player1;
    this.player2 = player2;
    this.numPlayers = numPlayers;
  }
  setTeamChoice(choice) {
    this.player1 = choice;
    this.player2 = choice === "O" ? "X" : "O";
  }
  setUserGridChoice(choice) {
    this.grid[choice] =
      this.nextPlayer === "player1" ? this.player1 : this.player2;
    this.choices.push(choice);
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
    } else {
      this.nextPlayer = this.nextPlayer === "player1" ? "player2" : "player1";
    }
  }
}

exports.Store = Store;
exports.SinglePlayerStore = SinglePlayerStore;
exports.TwoPlayerStore = TwoPlayerStore;

// const store = new Store();

// console.log(store);

// const p1store = new SinglePlayerStore();

// console.log(p1store);

// p1store.setTeamChoice("X");
// p1store.setNextPlayer("X");

// console.log(p1store);

// const p2store = new TwoPlayerStore();

// p2store.setTeamChoice("X");
// p2store.setNextPlayer("X");

// console.log(p2store);
