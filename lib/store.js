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
  firstPlayer: null,
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
  setWinner() {
    this.winner = true;
  },
};

const getGrid = (store) => {
  return store.grid;
};

const getUserTeam = (store) => {
  return store.userTeam;
};

const getCpuTeam = (store) => {
  return store.cpuTeam;
};

const getFirstPlayer = (store) => {
  return store.firstPlayer;
};

const getChoices = (store) => {
  return store.choices;
};

const getWinner = (store) => {
  return store.winner;
};

// const setTeamChoice = (store, choice) => {
//   store.userTeam = choice;
//   if (choice === "O") {
//     store.cpuTeam = "X";
//   } else {
//     store.cpuTeam = "O";
//   }
// };

// const setUserGridChoice = (store, choice) => {
//   store.grid[choice] = store.userTeam;
//   store.choices.push(choice);
// };

// const setCpuGridChoice = (store, choice) => {
//   store.grid[choice] = store.cpuTeam;
//   store.choices.push(choice);
// };

// const setWinner = (store) => {
//   store.winner = true;
// };

//--------------- inline store gettter/setters --------------//
const store1 = {
  _grid: {
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
  _userTeam: null,
  _cpuTeam: null,
  _firstPlayer: null,
  _choices: [],
  _winner: false,
  get grid() {
    return this._grid;
  },
  set grid(key, value) {
    this._grid[key] = value;
  },
  get userTeam() {
    return this._userTeam;
  },
  set userTeam(value) {
    this._userTeam = value;
  },
  get cpuTeam() {
    return this._cpuTeam;
  },
  set cpuTeam(value) {
    this._cpuTeam = value;
  },
  get firstPlayer() {
    return this._firstPlayer;
  },
  set firstPlayer(value) {
    this._firstPlayer = value;
  },
  get choices() {
    return this._choices;
  },
  set choices(value) {
    this._choices.push(value);
  },
  get winner() {
    return this._winner;
  },
  set winner(boolean) {
    this._winner = boolean;
  },
  setUserGridChoice(choice) {
    this.grid(choice, this.userTeam());
    this.choices(choice);
  },
  setCpuGridChoice(choice) {
    this.grid(choice, this.cpuTeam());
    this.choices(choice);
  },
};

//--------------- defineProperty() gettter/setters --------------//
const store2 = {
  _grid: {
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
  _userTeam: null,
  _cpuTeam: null,
  _firstPlayer: null,
  _choices: [],
  _winner: false,
};

Object.defineProperty(store2, "grid", {
  get: () => {
    return this._grid;
  },
  set: (key, value) => {
    this._grid[key] = value;
  },
});

Object.defineProperty(store2, "userTeam", {
  get: () => {
    return this._userTeam;
  },
  set: (value) => {
    this._userTeam = value;
  },
});

Object.defineProperty(store2, "cpuTeam", {
  get: () => {
    return this._cpuTeam;
  },
  set: (value) => {
    this._cpuTeam = value;
  },
});

Object.defineProperty(store2, "firstPlayer", {
  get: () => {
    return this._firstPlayer;
  },
  set: (value) => {
    this._firstPlayer = value;
  },
});

Object.defineProperty(store2, "choices", {
  get: () => {
    return this._choices;
  },
  set: (array) => {
    if (Array.isArray(array)) {
      this._choices = array;
    } else {
      console.log("store.choices must be an Array object");
    }
  },
});

Object.defineProperty(store2, "winner", {
  get: () => {
    return this._winner;
  },
  set: (boolean) => {
    if (typeof boolean === "boolean") {
      this._winner = boolean;
    } else {
      console.log("store.winner must be a boolean value");
    }
  },
});

//--------------- exports --------------//

exports.store = store;
exports.setTeamChoice = setTeamChoice;
exports.setUserGridChoice = setUserGridChoice;
exports.setCpuGridChoice = setCpuGridChoice;
exports.setWinner = setWinner;
