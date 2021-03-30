import { Game, Team } from "./game";
import { CpuPlayer, HumanPlayer, Player } from "./player";

type Vs = "Cpu" | "Human";

const gameFactory = (
  vs?: Vs,
  nextPlayer?: Team,
  choices?: number[],
  winner?: string
): Game => {
  const regularisePlayers = (game: Game): void => {
    if (game.players.O.constructor.name === "CpuPlayer") {
      const playerO = game.players.O;
      const playerX = game.players.X;
      game.players = {
        O: playerX,
        X: playerO,
      };
    }
  };
  const setNextPlayer = (game: Game, nextPlayer: Team | undefined): void => {
    if (nextPlayer) {
      game.nextPlayer = nextPlayer;
    }
  };
  const setChoices = (game: Game, choices: number[] | undefined): void => {
    if (choices) {
      game.choices = choices;
    }
  };
  const setWinner = (game: Game, winner: string | undefined): void => {
    if (winner) {
      game.winner = winner;
    }
  };

  let game: Game;
  let players: [Player, Player];
  if (vs) {
    switch (vs) {
      case "Cpu":
        players = [new HumanPlayer(), new CpuPlayer()];
        game = new Game(players);
        regularisePlayers(game);
        setNextPlayer(game, nextPlayer);
        setChoices(game, choices);
        setWinner(game, winner);
        break;
      case "Human":
        players = [new HumanPlayer("Player 1"), new HumanPlayer("Player 2")];
        game = new Game(players);
        regularisePlayers(game);
        setNextPlayer(game, nextPlayer);
        setChoices(game, choices);
        setWinner(game, winner);
        break;
    }
  } else {
    players = [new HumanPlayer(), new CpuPlayer()];
    game = new Game(players);
  }
  return game;
};

describe("Game methods can set values", () => {
  let consoleOutput: string[] = [];
  const mockedLog = (output: string) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("getPlayerName returns player name", () => {
    const game = gameFactory("Cpu");
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = game.getPlayerName("O");
    const result2 = game.getPlayerName("X");
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("getNextPlayerName returns name of nextPlayer", () => {
    const game = gameFactory("Cpu", "O");
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = game.getNextPlayerName();
    game.nextPlayer = "X";
    const result2 = game.getNextPlayerName();
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it.skip("setPlayOrder sets nextPlayer", () => {
    const game = gameFactory("Human");

    game.setPlayOrder("O");

    const expected = "O";
    const expectedLog = "Player 1 gets to go first!";
    expect(game.nextPlayer).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it.skip("setPlayers assigns players from array to players object", async () => {
    // @ts-ignore
    const game = new Game();
    const player1 = new HumanPlayer("Player 1");
    const player2 = new HumanPlayer("Player 2");
    const players = [player1, player2];
    const teams = ["O", "X"];

    game.setPlayers(players, teams);

    const expected1 = "Player 1";
    const expected2 = "Player 2";

    const result1 = game.players.O.name;
    const result2 = game.players.X.name;

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setNextPlayer stores player when passed arg", () => {
    const game = gameFactory("Human");

    const input = "X";
    const expected = "X";
    game.setNextPlayer(input);
    const result = game.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setNextPlayer replaces stored player", () => {
    const game = gameFactory("Human", "O");

    const expected = "X";
    game.setNextPlayer();
    const result = game.nextPlayer;
    expect(result).toEqual(expected);
  });

  describe("setGridChoice", () => {
    it.skip("setGridChoice stores HumanPlayer choice", () => {
      // @ts-ignore
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        // @ts-ignore
        X: { name: "CPU" },
      };
      game.nextPlayer = "O";
      const input = 5;
      const expectedGrid = "O";
      const expectedChoices = [5];

      // game.setGridChoice(input);
      const resultGrid = game.grid[5];
      const resultChoices = game.choices;

      expect(resultGrid).toEqual(expectedGrid);
      expect(resultChoices).toEqual(expectedChoices);
    });

    it.skip("setGridChoice stores CpuPlayer choice", () => {
      // @ts-ignore
      const game = new Game();
      game.players = {
        O: new CpuPlayer("CPU"),
        // @ts-ignore
        X: { name: "You" },
      };
      game.nextPlayer = "O";
      const input = 5;
      const expectedGrid = "O";
      const expectedChoices = [5];

      // game.setGridChoice(input);
      const resultGrid = game.grid[5];
      const resultChoices = game.choices;

      expect(resultGrid).toEqual(expectedGrid);
      expect(resultChoices).toEqual(expectedChoices);
    });
  });

  it("setWinner stores winner", () => {
    const game = gameFactory("Cpu");
    const expected = "X";
    game.setWinner("X");
    const result = game.winner;
    expect(result).toEqual(expected);
  });

  it("logGrid logs grid correctly", () => {
    const game = gameFactory("Human");
    game.grid = {
      1: "X",
      2: 2,
      3: 3,
      4: 4,
      5: "X",
      6: 6,
      7: 7,
      8: 8,
      9: "O",
    };
    const expected = `
           --- --- ---
          | X | 2 | 3 |
           --- --- ---
          | 4 | X | 6 |
           --- --- ---
          | 7 | 8 | O |
           --- --- ---
          `;
    game.logGrid();
    expect(consoleOutput[0]).toEqual(expected);
  });
});
