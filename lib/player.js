const { sleep } = require("./helpers");
const rl = require("./rl");

class Player {
  // Add flag to signify player is currently in a game
  constructor(name = null, isHuman = null, ws = null) {
    this.name = name;
    this.isHuman = isHuman;
    this.ws = ws;
  }
  setName(name) {
    this.name = name;
  }
  setNextPlayer(store) {
    const otherTeam = this.getOtherPlayerTeam(store);
    store.nextPlayer = otherTeam;
    if (this.ws) {
      this._sendNextPlayerToBrowser(otherTeam);
    }
  }
  setWebSocket(ws) {
    this.ws = ws;
  }
  getTeam(store) {
    return Object.keys(store.players).find(
      (key) => store.players[key] === this
    );
  }
  getOtherPlayerTeam(store) {
    let team;
    Object.keys(store.players).find((key) => {
      if (store.players[key] !== this) {
        team = key;
      }
    });
    return team;
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
  _sendNextPlayerToBrowser(team) {
    let playerObj = {
      type: "currentPlayer",
      team: team,
      player: this,
    };
    if (this.isHuman && this.ws) {
      this.ws.send(JSON.stringify(playerObj));
    }
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
  logGrid(store) {
    if (this.name !== "CPU") {
      if (store.ws) {
        this.log(`&nbsp;--- --- ---<br>
          | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |<br>
          &nbsp;--- --- ---<br>
          | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |<br>
          &nbsp;--- --- ---<br>
          | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |<br>
          &nbsp;--- --- ---
          `);
      } else {
        this.log(
          `
           --- --- ---
          | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
           --- --- ---
          | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
           --- --- ---
          | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
           --- --- ---
          `
        );
      }
    }
  }
}

class HumanPlayer extends Player {
  constructor(
    name = null,
    isHuman = null,
    ws = null,
    ui = null,
    wsUi = null,
    inGame = null
  ) {
    super(name, isHuman, ws);
    this.ui = ui;
    this.wsUi = Object.freeze({
      WEB: "WEB",
      CONSOLE: "CONSOLE",
    });
    this.inGame = inGame;
    this.isHuman = true;
  }
  setWebSocketUi(val) {
    this.ui = val;
  }
  getUiType() {
    return this.ui.type;
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
      let choice = store.ws
        ? await this._recieveUserGridChoice(store)
        : await this._promptForUserGridChoice();
      if (this._isValidGridChoice(store, choice)) {
        store.log(`${this.name} chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(store, choice) {
    store.grid[choice] = this.getTeam(store);
    store.choices.push(choice);
    if (player.ws) {
      let playerChoiceObj = {
        type: "playerChoice",
        choice: choice,
        team: this.getTeam(store),
      };
      this.ws.send(JSON.stringify(playerChoiceObj));
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
  getHumanPlayer(store) {
    // Could replace with a check if isHuman is true?
    let player;
    Object.keys(store.players).forEach((key) => {
      if (store.players[key].constructor.name === "HumanPlayer") {
        player = store.players[key];
      }
    });
    return player;
  }
  async getGridChoice(store) {
    while (true) {
      let choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(store, choice)) {
        store.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(store, choice) {
    store.grid[choice] = this.getTeam(store);
    store.choices.push(choice);
    const humanPlayer = this.getHumanPlayer(store);
    if (humanPlayer.ws) {
      let cpuChoiceObj = {
        type: "cpuChoice",
        choice: choice,
        team: cpuPlayer,
      };
      await sleep(500);
      this.ws.send(JSON.stringify(cpuChoiceObj));
    }
  }
}

// const { Store } = require("./store");

// const player = new HumanPlayer("You");
// const cpu = new CpuPlayer();
// // console.log(typeof player);
// // console.log(player.constructor.name);
// const store = new Store();
// store.setPlayer(player, "X");
// store.setPlayer(cpu, "O");
// store.nextPlayer = "O";

// console.log(cpu.getOtherPlayerTeam(store));
// cpu.setNextPlayer(store);
// console.log(store.nextPlayer);

// console.log(player.getTeam(store));
// console.log(cpu.getTeam(store));

exports.Player = Player;
exports.HumanPlayer = HumanPlayer;
exports.CpuPlayer = CpuPlayer;
