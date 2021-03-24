import { sleep } from "./helpers";

class Player {
  // TODO
  name: any;
  isHuman: any;
  ws: any;
  constructor(name = null, isHuman = null, ws = null) {
    this.name = name;
    this.isHuman = isHuman;
    this.ws = ws;
  }
  getTeam(game: any) {
    return Object.keys(game.players).find((key) => game.players[key] === this);
  }
  getOtherPlayerTeam(game: any) {
    let team;
    Object.keys(game.players).find((key) => {
      if (game.players[key] !== this) {
        team = key;
      }
    });
    return team;
  }
  _isValidGridChoice(game: any, choice: any) {
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
  sendThisPlayerToBrowser(game: any) {
    let playerObj = {
      type: "thisPlayer",
      team: this.getTeam(game),
      name: this.name,
    };
    this.send(playerObj);
  }
  log(message: any) {
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
  send(messageObj: any) {
    if (this.ws) {
      this.ws.send(JSON.stringify(messageObj));
    }
  }
  logGrid(game: any) {
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
  // TODO - had to assign types in the constructor to stop super() from whining
  constructor(name: any = "You", isHuman: any = null, ws: any = null) {
    super(name, isHuman, ws);
    this.isHuman = true;
  }
  async _recieveUserGridChoice() {
    let promptObj = {
      type: "prompt",
      prompt: "Choose a grid number:",
    };
    this.send(promptObj);
    return new Promise((resolve) => {
      this.ws.on("message", (message: any) => {
        let gridObj = JSON.parse(message);
        if (gridObj.type === "grid") {
          return resolve(gridObj.grid);
        }
      });
    });
  }
  async getGridChoice(game: any) {
    if (this.name !== "You") {
      this.log(`${this.name}'s turn:`);
    }
    while (true) {
      let choice = await this._recieveUserGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        this.log(`${this.name} chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(game: any, choice: any) {
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
  constructor(name: any = "CPU", isHuman: any = null) {
    super(name, isHuman);
    this.isHuman = false;
  }
  _generateCpuGridChoice() {
    return Math.floor(Math.random() * 9 + 1);
  }
  async getGridChoice(game: any) {
    while (true) {
      let choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        game.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
  }
  async setGridChoice(game: any, choice: any) {
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

export { Player, HumanPlayer, CpuPlayer };
