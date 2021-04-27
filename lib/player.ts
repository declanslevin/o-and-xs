import { sleep } from "./helpers";
import WebSocket from "ws";
import { Game, Team } from "./game";

class Player {
  name: string;
  ws?: WebSocket;
  constructor (name: string = "Player", ws?: WebSocket) {
    this.name = name;
    this.ws = ws;
  }

  async getGridChoice (game: Game): Promise<number> {
    throw new Error("You must implement this in your subclass");
  }

  async setGridChoice (game: Game, choice: number): Promise<void> {
    throw new Error("You must implement this in your subclass");
  }

  getTeam (game: Game): Team {
    const teams: Team[] = ["O", "X"];
    for (const key of teams) {
      if (game.players[key] === this) {
        return key;
      }
    }
    throw new Error("Can't return a team");
  }

  getOtherPlayerTeam (game: Game): Team {
    const teams: Team[] = ["O", "X"];
    for (const key of teams) {
      if (game.players[key] !== this) {
        return key;
      }
    }
    throw new Error("Can't return a team");
  }

  _isValidGridChoice (game: Game, choice: number): boolean {
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

  sendThisPlayerToBrowser (game: Game): void {
    const playerObj = {
      type: "thisPlayer",
      team: this.getTeam(game),
      name: this.name,
    };
    this.send(playerObj);
  }

  log (message: string): void {
    if (this.ws) {
      const logObj = {
        type: "log",
        log: message,
      };
      this.ws.send(JSON.stringify(logObj));
    } else {
      console.log(message);
    }
  }

  // TODO: Type this properly
  send (messageObj: any): void {
    if (this.ws) {
      this.ws.send(JSON.stringify(messageObj));
    }
  }

  logGrid (game: Game): void {
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
  ws?: WebSocket;
  constructor (name: string = "You", ws?: WebSocket) {
    super(name, ws);
    this.name = name;
    this.ws = ws;
  }

  async _recieveUserGridChoice (): Promise<number> {
    const promptObj = {
      type: "prompt",
      prompt: "Choose a grid number:",
    };
    this.send(promptObj);
    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.on("message", (message: string) => {
          const gridObj = JSON.parse(message);
          if (gridObj.type === "grid") {
            return resolve(gridObj.grid);
          }
        });
      }
    });
  }

  async getGridChoice (game: Game): Promise<number> {
    if (this.name !== "You") {
      this.log(`${this.name}'s turn:`);
    }
    while (true) {
      const choice = await this._recieveUserGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        this.log(`${this.name} chose ${choice}!`);
        return choice;
      }
    }
  }

  async setGridChoice (game: Game, choice: number): Promise<void> {
    game.grid[choice] = this.getTeam(game);
    game.choices.push(choice);
    const playerChoiceObj = {
      type: "playerChoice",
      choice: choice,
      team: this.getTeam(game),
    };
    game.send(playerChoiceObj);
  }
}

class CpuPlayer extends Player {
  constructor (name: any = "CPU") {
    super(name);
  }

  _generateCpuGridChoice (): number {
    return Math.floor(Math.random() * 9 + 1);
  }

  async getGridChoice (game: any): Promise<number> {
    while (true) {
      const choice = this._generateCpuGridChoice();
      if (this._isValidGridChoice(game, choice)) {
        game.log(`CPU chose ${choice}!`);
        return choice;
      }
    }
  }

  async setGridChoice (game: Game, choice: number): Promise<void> {
    game.grid[choice] = this.getTeam(game);
    game.choices.push(choice);
    const cpuChoiceObj = {
      type: "playerChoice",
      choice: choice,
      team: this.getTeam(game),
    };
    await sleep(500);
    game.send(cpuChoiceObj);
  }
}

export { Player, HumanPlayer, CpuPlayer };
