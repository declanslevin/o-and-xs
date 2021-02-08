const { sleep } = require("./helpers");
const rl = require("./rl");

class Player {
  constructor(name = null, isHuman = null) {
    this.name = name;
    this.isHuman = isHuman;
  }
  _isValidGridChoice(store, choice) {
    if (
      isNaN(choice) ||
      choice < 1 ||
      choice > 9 ||
      store.choices.includes(choice)
    ) {
      if (this.isHuman) {
        store.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return false;
      }
    } else {
      return true;
    }
  }
}

class HumanPlayer extends Player {
  constructor(player) {
    super(player);
    this.isHuman = true;
  }
  _promptForUserGridChoice() {
    return new Promise((resolve) => {
      rl.question("Enter your choice of grid number = ", (choice) => {
        return resolve(Number(choice));
      });
    });
  }
  _recieveUserGridChoice(store) {
    let promptObj = {
      type: "prompt",
      prompt: "Choose a grid number:",
    };
    store.ws.send(JSON.stringify(promptObj));
    return new Promise((resolve) => {
      store.ws.on("message", (message) => {
        let gridObj = JSON.parse(message);
        if (gridObj.type === "grid") {
          return resolve(gridObj.grid);
        }
      });
    });
  }
  async getGridChoice(store) {
    if (this.name !== "You") {
      store.log(`${this.name}'s turn:`);
    }
    while (true) {
      let grid = store.ws
        ? await this._recieveUserGridChoice(store)
        : await this._promptForUserGridChoice();
      if (this._isValidGridChoice(store, grid)) {
        store.log(`${this.name} chose ${grid}!`);
        return grid;
      }
    }
  }
}

class CpuPlayer extends Player {
  constructor(player) {
    super(player);
    this.name = "CPU";
    this.isHuman = false;
  }
  _generateCpuGridChoice() {
    return Math.floor(Math.random() * 9 + 1);
  }
  getGridChoice(store) {
    while (true) {
      let choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(store, choice)) {
        store.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
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
        this.players.O = new HumanPlayer("You");
        this.players.X = new CpuPlayer();
      } else {
        this.players.O = new CpuPlayer();
        this.players.X = new HumanPlayer("You");
      }
    } else {
      if (teamChoice === "O") {
        this.players.O = new HumanPlayer("Player 1");
        this.players.X = new HumanPlayer("Player 2");
      } else {
        this.players.O = new HumanPlayer("Player 2");
        this.players.X = new HumanPlayer("Player 1");
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
  async setGridChoice(choice) {
    const thisPlayer = this.nextPlayer;
    const cpuPlayer = this.getCpuPlayer();
    this.grid[choice] = thisPlayer;
    this.choices.push(choice);
    if (thisPlayer === cpuPlayer) {
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
  }
  // setUserGridChoice(choice) {
  //   this.grid[choice] = this.nextPlayer;
  //   this.choices.push(choice);
  // }
  // async setCpuGridChoice(choice) {
  //   const cpuPlayer = this.getCpuPlayer();
  //   this.grid[choice] = cpuPlayer;
  //   this.choices.push(choice);
  //   if (this.ws) {
  //     let cpuChoiceObj = {
  //       type: "cpuChoice",
  //       choice: choice,
  //       team: cpuPlayer,
  //     };
  //     // TODO : Await for callback
  //     await sleep(500);
  //     this.ws.send(JSON.stringify(cpuChoiceObj));
  //   }
  // }
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

// const store = new Store();
// store.setPlayers(true, "O");
// console.log(store);
// const choice = store.players.X.getGridChoice(store);
// store.setCpuGridChoice(choice);
// const user = store.players.O.getGridChoice(store);
// console.log(user);
// store.setUserGridChoice(user);
// console.log(store);

exports.Store = Store;
