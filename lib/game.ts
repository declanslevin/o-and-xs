import { Player } from "./player";

class Game {
  // TODO
  grid?: any;
  players?: any;
  nextPlayer: string;
  choices: number[];
  winner?: boolean | string;
  mode?: string | null;
  constructor(
    grid: any = {
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
    players: any = {
      O: null,
      X: null,
    },
    // 😩 TODO: setting a default string of "null" because it causes a headache if I set this to null to begin with
    // The headache is from trying to use the nextPlayer string as an index/key to access the player object
    nextPlayer: string = "null",
    choices: number[] = [],
    winner: boolean | string = false,
    mode: string | null = null
  ) {
    this.grid = grid;
    this.players = players;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
    this.mode = mode;
  }
  getPlayerName(team: string): string {
    return this.players[team].name;
  }
  getNextPlayerName(): string {
    if (!this.nextPlayer) {
      throw new Error("this.nextPlayer is undefined");
    }
    return this.players[this.nextPlayer].name;
  }
  randomTeams(): string[] {
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
  setPlayer(player: Player, team: string): void {
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
  setNextPlayer(team?: string): void {
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
