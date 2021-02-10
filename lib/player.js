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
  constructor(player, ui = null) {
    super(player);
    this.ui = ui;
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
      let choice = store.ws
        ? await this._recieveUserGridChoice(store)
        : await this._promptForUserGridChoice();
      if (this._isValidGridChoice(store, choice)) {
        store.log(`${this.name} chose ${choice}!`);
        return choice;
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
  async getGridChoice(store) {
    while (true) {
      let choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(store, choice)) {
        store.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
  }
}

exports.Player = Player;
exports.HumanPlayer = HumanPlayer;
exports.CpuPlayer = CpuPlayer;
