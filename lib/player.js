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
  setNextPlayer(game) {
    const otherTeam = this.getOtherPlayerTeam(game);
    game.nextPlayer = otherTeam;
    if (this.ws) {
      this._sendNextPlayerToBrowser(otherTeam);
    }
  }
  setWebSocket(ws) {
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
      if (this.isHuman) {
        game.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return false;
      }
    } else {
      return true;
    }
  }
  _sendNextPlayerToBrowser(playerArray) {
    let playerObj = {
      type: "currentPlayer",
      team: playerArray[0],
      // player: this,
      player: playerArray[1],
    };
    this.ws.send(JSON.stringify(playerObj));
    // if (this.isHuman && this.ws) {
    //   this.ws.send(JSON.stringify(playerObj));
    // }
  }
  sendThisPlayerToBrowser(game) {
    let playerObj = {
      type: "thisPlayer",
      team: this.getTeam(game),
      name: this.name,
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
  constructor(name = null, isHuman = null, ws = null, ui = null, wsUi = null) {
    super(name, isHuman, ws);
    this.ui = ui;
    this.wsUi = Object.freeze({
      WEB: "WEB",
      CONSOLE: "CONSOLE",
    });
    this.isHuman = true;
  }
  setWebSocketUi(val) {
    this.ui = val;
  }
  getUiType() {
    return this.ui.type;
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
    this.ws.send(JSON.stringify(promptObj));
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
    if (this.ws) {
      let playerChoiceObj = {
        type: "playerChoice",
        choice: choice,
        team: this.getTeam(game),
      };
      game.send(playerChoiceObj);
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
  getHumanPlayer(game) {
    // Could replace with a check if isHuman is true?
    let player;
    Object.keys(game.players).forEach((key) => {
      if (game.players[key].constructor.name === "HumanPlayer") {
        player = game.players[key];
      }
    });
    return player;
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
    const humanPlayer = this.getHumanPlayer(game);
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

exports.Player = Player;
exports.HumanPlayer = HumanPlayer;
exports.CpuPlayer = CpuPlayer;
