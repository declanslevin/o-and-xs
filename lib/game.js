class Game {
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
    winner = false,
    mode = null
  ) {
    this.ws = ws;
    this.grid = grid;
    this.players = players;
    this.nextPlayer = nextPlayer;
    this.choices = choices;
    this.winner = winner;
    this.mode = mode;
  }
  getPlayerName(player) {
    return this.players[player].name;
  }
  getNextPlayerName() {
    return this.players[this.nextPlayer].name;
  }
  randomTeams() {
    const player1 = Math.random() < 0.5 ? "O" : "X";
    const player2 = player1 === "O" ? "X" : "O";
    return [player1, player2];
  }
  setMode(mode) {
    this.mode = mode;
  }
  setPlayOrder() {
    const team = Math.random() < 0.5 ? "X" : "O";
    this.setNextPlayer(team);
    const name = this.getPlayerName(team);
    const log =
      name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
    this.log(log);
  }
  setPlayer(player, team) {
    this.players[team] = player;
    player.sendThisPlayerToBrowser(this);
  }
  async setPlayers(players) {
    const teams = this.randomTeams();
    this.setPlayer(players[0], teams[0]);
    this.setPlayer(players[1], teams[1]);
  }
  setNextPlayer(player) {
    if (player) {
      this.nextPlayer = player;
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
  setWinner(team) {
    this.winner = team;
  }
  logGrid() {
    this.players.O.logGrid(this);
    this.players.X.logGrid(this);
  }
  log(message) {
    this.players.O.log(message);
    this.players.X.log(message);
  }
  send(messageObj) {
    this.players.O.send(messageObj);
    this.players.X.send(messageObj);
  }
}

exports.Game = Game;
