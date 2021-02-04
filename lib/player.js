// class Player1 {
//   constructor(ws = null, name = "Player 1", team = null, isHuman = true) {
//     this.ws = ws;
//     this.name = name;
//     this.team = team;
//     this.isHuman = isHuman;
//   }
// }

// class Player2 {
//   constructor(ws = null, name = "Player 2", team = null, isHuman = true) {
//     this.ws = ws;
//     this.name = name;
//     this.team = team;
//     this.isHuman = isHuman;
//   }
// }

// class CpuPlayer {
//   constructor(ws = null, name = "CPU", team = null, isHuman = false) {
//     this.ws = ws;
//     this.name = name;
//     this.team = team;
//     this.isHuman = isHuman;
//   }
// }

// const player1 = new Player1();
// const player2 = new Player2();
// const cpuPlayer = new CpuPlayer();
// console.log(player1);
// console.log(player2);
// console.log(cpuPlayer);

//////////
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

// const player1 = new Player1();
// const player2 = new Player2();
// const singlePlayer = new SinglePlayer();
// const cpuPlayer = new CpuPlayer();
// console.log(player1);
// console.log(player2);
// console.log(singlePlayer);
// console.log(cpuPlayer);

const { Store } = require("./store");

const store = new Store();
store.setPlayers(true, "O");
// store.players["X"] = player1;
// store.players["O"] = player2;

console.log(store);
const entries = Object.entries(store.players);
console.log(entries);
const keys = Object.keys(store.players);
console.log(keys);
keys.forEach((k) => console.log(k + " = " + store.players[k].name));

Object.keys(store.players).forEach((key) => {
  if (store.players[key].name === "CPU") {
    this.grid[choice] = key;
  }
});

// async setCpuGridChoice(choice) {
//   Object.entries;
//   this.grid[choice] = this.player2.team;
//   this.choices.push(choice);
//   if (this.ws) {
//     let cpuChoiceObj = {
//       type: "cpuChoice",
//       choice: choice,
//       team: this.player2.team,
//     };
//     // TODO : Await for callback
//     await sleep(500);
//     this.ws.send(JSON.stringify(cpuChoiceObj));
//   }
// }
// store.players["X"] = singlePlayer;
// store.players["O"] = cpuPlayer;

// console.log(store);
// console.log(store.players.X.name);

exports.Player1 = Player1;
exports.Player2 = Player2;
exports.SinglePlayer = SinglePlayer;
exports.CpuPlayer = CpuPlayer;
