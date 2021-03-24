const { sleep } = require("./helpers");
const rl = require("./rl");

class Player {
  constructor(name = null, isHuman = null, ws = null) {
    this.name = name;
    this.isHuman = isHuman;
    this.ws = ws;
  }
  getTeam(game) {
    return Object.keys(game.players).find((key) => game.players[key] === this);
  }
  getOtherPlayerTeam(game) {
    let team;
    Object.keys(game.players).find((key) => {
      if (game.players[key] !== this) {
        team = key;
      }
    });
    return team;
  }
  _isValidGridChoice(game, choice) {
    if (
      isNaN(choice) ||
      choice < 1 ||
      choice > 9 ||
      game.choices.includes(choice)
    ) {
      this.log(
        "Please enter a valid grid number. Make sure it hasn't already been picked!"
      );
      return false;
    } else {
      return true;
    }
  }
  sendThisPlayerToBrowser(game) {
    let playerObj = {
      type: "thisPlayer",
      team: this.getTeam(game),
      name: this.name,
    };
    this.send(playerObj);
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
  send(messageObj) {
    if (this.ws) {
      this.ws.send(JSON.stringify(messageObj));
    }
  }
  logGrid(game) {
    if (this.name !== "CPU") {
      if (this.ws) {
        this.log(`&nbsp;--- --- ---<br>
          | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |<br>
          &nbsp;--- --- ---<br>
          | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |<br>
          &nbsp;--- --- ---<br>
          | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |<br>
          &nbsp;--- --- ---
          `);
      } else {
        this.log(
          `
           --- --- ---
          | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |
           --- --- ---
          | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |
           --- --- ---
          | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |
           --- --- ---
          `
        );
      }
    }
  }
}

class HumanPlayer extends Player {
  constructor(name = "You", isHuman = null, ws = null) {
    super(name, isHuman, ws);
    this.isHuman = true;
  }
  async _promptForUserGridChoice() {
    return new Promise((resolve) => {
      rl.question("Enter your choice of grid number = ", (choice) => {
        return resolve(Number(choice));
      });
    });
  }
  async _recieveUserGridChoice() {
    let promptObj = {
      type: "prompt",
      prompt: "Choose a grid number:",
    };
    this.send(promptObj);
    return new Promise((resolve) => {
      this.ws.on("message", (message) => {
        let gridObj = JSON.parse(message);
        if (gridObj.type === "grid") {
          return resolve(gridObj.grid);
        }
      });
    });
  }
  async getGridChoice(game) {
    if (this.name !== "You") {
      this.log(`${this.name}'s turn:`);
    }
    while (true) {
      let choice = this.ws
        ? await this._recieveUserGridChoice()
        : await this._promptForUserGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        this.log(`${this.name} chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(game, choice) {
    game.grid[choice] = this.getTeam(game);
    game.choices.push(choice);
    let playerChoiceObj = {
      type: "playerChoice",
      choice: choice,
      team: this.getTeam(game),
    };
    game.send(playerChoiceObj);
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
  async getGridChoice(game) {
    while (true) {
      let choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        game.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(game, choice) {
    game.grid[choice] = this.getTeam(game);
    game.choices.push(choice);
    let cpuChoiceObj = {
      type: "playerChoice",
      choice: choice,
      team: this.getTeam(game),
    };
    await sleep(500);
    game.send(cpuChoiceObj);
  }
}

exports.Player = Player;
exports.HumanPlayer = HumanPlayer;
exports.CpuPlayer = CpuPlayer;
