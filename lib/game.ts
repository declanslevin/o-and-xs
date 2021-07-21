import { MessageToFrontEnd } from "./message";
import { Player } from "./player";

export type Team = "O" | "X";

export type GridType = number | Team;

export interface GridObj {
  [key: number]: GridType;
}

export type GameStage = "initial" | "playing" | "over";

interface Players {
  O: Player;
  X: Player;
}

export class Game {
  grid: GridObj;
  players: Players;
  nextPlayer: Team;
  choices: number[];
  stage: GameStage;
  winner?: string | null;

  constructor(players: [Player, Player]) {
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
    this.players = this.randomPlayersObject(players);
    this.nextPlayer = Math.random() < 0.5 ? "X" : "O";
    this.choices = [];
    this.stage = "initial";
    this.winner = null;
  }

  getPlayerName(team: Team): string {
    return this.players[team].name;
  }

  getNextPlayerName(): string {
    return this.players[this.nextPlayer].name;
  }

  randomPlayersObject(players: [Player, Player]): Players {
    const swap = Math.random() < 0.5;
    if (swap) {
      return {
        X: players[0],
        O: players[1],
      };
    } else {
      return {
        O: players[0],
        X: players[1],
      };
    }
  }

  sendInitialBrowserState(): void {
    this.players.O.sendThisPlayerToBrowser(this);
    this.players.X.sendThisPlayerToBrowser(this);
    const name = this.getNextPlayerName();
    const log =
      name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
    this.log(log);
    const playerObj = {
      type: "currentPlayer" as const,
      team: this.nextPlayer,
      name: name,
    };
    this.send(playerObj);
  }

  setNextPlayer(team?: Team): void {
    if (team) {
      this.nextPlayer = team;
    } else {
      this.nextPlayer = this.players[this.nextPlayer].getOtherPlayerTeam(this);
    }
    const playerObj = {
      type: "currentPlayer" as const,
      team: this.nextPlayer,
      name: this.players[this.nextPlayer].name,
    };
    this.send(playerObj);
  }

  setGameStage(stage: GameStage): void {
    this.stage = stage;
    const stageObj = {
      type: "stage" as const,
      stage: stage,
    }
    this.send(stageObj);
  }

  setWinner(team: string): void {
    this.winner = team;
  }

  logGrid(): void {
    this.players.O.logGrid(this);
    this.players.X.logGrid(this);
  }

  log(message: string): void {
    this.players.O.log(message);
    this.players.X.log(message);
  }

  send(messageObj: MessageToFrontEnd): void {
    this.players.O.send(messageObj);
    this.players.X.send(messageObj);
  }
}

export default Game;
