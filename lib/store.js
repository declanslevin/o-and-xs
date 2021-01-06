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

const store = {
  grid: {
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
  userTeam: null,
  cpuTeam: null,
  nextPlayer: null,
  choices: [],
  winner: false,
  setTeamChoice(choice) {
    this.userTeam = choice;
    if (choice === "O") {
      this.cpuTeam = "X";
    } else {
      this.cpuTeam = "O";
    }
  },
  setUserGridChoice(choice) {
    this.grid[choice] = this.userTeam;
    this.choices.push(choice);
  },
  setCpuGridChoice(choice) {
    this.grid[choice] = this.cpuTeam;
    this.choices.push(choice);
  },
  setWinner(player) {
    this.winner = player;
  },
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
  },
};

const setTeamChoice = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};

const setUserGridChoice = (store, choice) => {
  store.grid[choice] = store.userTeam;
  store.choices.push(choice);
};

const setCpuGridChoice = (store, choice) => {
  store.grid[choice] = store.cpuTeam;
  store.choices.push(choice);
};

const setNextPlayer = (store, player) => {
  if (player) {
    store.nextPlayer = player;
  } else {
    if (store.nextPlayer === "user") {
      store.nextPlayer = "cpu";
    } else {
      store.nextPlayer = "user";
    }
  }
};

const setWinner = (store, player) => {
  store.winner = player;
};

const resetStore = (store) => {
  store.grid = {
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
  store.userTeam = null;
  store.cpuTeam = null;
  store.nextPlayer = null;
  store.choices = [];
  store.winner = false;
};

exports.store = store;
exports.Store = Store;
exports.setTeamChoice = setTeamChoice;
exports.setUserGridChoice = setUserGridChoice;
exports.setCpuGridChoice = setCpuGridChoice;
exports.setNextPlayer = setNextPlayer;
exports.setWinner = setWinner;
exports.resetStore = resetStore;
