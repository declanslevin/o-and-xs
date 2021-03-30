import { Player } from "./player";

export interface Grid {
  [key: number]: number | string;
}

interface Players {
  O: Player;
  X: Player;
}

export type Team = "O" | "X";

export class Game {
  // TODO
  grid: Grid;
  players: Players;
  nextPlayer: Team;
  choices: number[];
  winner?: string | null;
  mode?: string | null;

  constructor(
    players: [Player, Player],
    grid: Grid = {
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
    nextPlayer?: Team,
    choices: number[] = [],
    winner: string | null = null,
    mode: string | null = null
  ) {
    this.grid = grid;
    this.players = this.randomPlayersObject(players);
    this.nextPlayer = nextPlayer || Math.random() < 0.5 ? "X" : "O";
    this.choices = choices;
    this.winner = winner;
    this.mode = mode;
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
    }
    return {
      O: players[0],
      X: players[1],
    };
  }
  randomTeams(): Team[] {
    const player1 = Math.random() < 0.5 ? "O" : "X";
    const player2 = player1 === "O" ? "X" : "O";
    return [player1, player2];
  }
  setMode(mode: string): void {
    this.mode = mode;
  }
  // FIXUP - added a test parameter to facilitate testing in short term
  setPlayOrder(test?: any): void {
    let team;
    if (test) {
      team = test;
    } else {
      team = Math.random() < 0.5 ? "X" : "O";
    }
    this.setNextPlayer(team);
    const name = this.getPlayerName(team);
    const log =
      name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
    this.log(log);
  }
  setPlayer(player: Player, team: Team): void {
    this.players[team] = player;
    player.sendThisPlayerToBrowser(this);
  }
  // FIXUP - added a test parameter to facilitate testing in short term
  setPlayers(players: any, test?: any): void {
    let teams;
    if (test) {
      teams = test;
    } else if (test === undefined) {
      teams = this.randomTeams();
    }
    this.setPlayer(players[0], teams[0]);
    this.setPlayer(players[1], teams[1]);
  }
  setNextPlayer(team?: Team): void {
    if (team) {
      this.nextPlayer = team;
    } else {
      this.nextPlayer = this.players[this.nextPlayer].getOtherPlayerTeam(this);
    }
    let playerObj = {
      type: "currentPlayer",
      team: this.nextPlayer,
      player: this.players[this.nextPlayer].name,
    };
    this.send(playerObj);
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
  send(messageObj: any): void {
    this.players.O.send(messageObj);
    this.players.X.send(messageObj);
  }
}

export default Game;
