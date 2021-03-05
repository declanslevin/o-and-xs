const { Game } = require("./game");
const { CpuPlayer, HumanPlayer } = require("./player");

describe("Game methods can set values", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("getPlayerName returns player name", () => {
    const game = new Game();
    game.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = game.getPlayerName("O");
    const result2 = game.getPlayerName("X");
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("getNextPlayerName returns name of nextPlayer", () => {
    const game = new Game();
    game.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    game.nextPlayer = "O";
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = game.getNextPlayerName();
    game.nextPlayer = "X";
    const result2 = game.getNextPlayerName();
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("getCpuPlayer returns cpu player", () => {
    const game = new Game();
    game.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    const expected = "X";

    const result = game.getCpuPlayer();
    expect(result).toEqual(expected);
  });

  it("setPlayers when single player", () => {
    const game1 = new Game();
    const game2 = new Game();

    const expected1 = ["You", true, "CPU", false];
    const expected2 = ["CPU", false, "You", true];

    game1.setPlayers(true, "O");
    game2.setPlayers(true, "X");

    const result1 = [
      game1.players.O.name,
      game1.players.O.isHuman,
      game1.players.X.name,
      game1.players.X.isHuman,
    ];
    const result2 = [
      game2.players.O.name,
      game2.players.O.isHuman,
      game2.players.X.name,
      game2.players.X.isHuman,
    ];

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setPlayers when 2 player", () => {
    const game1 = new Game();
    const game2 = new Game();

    const expected1 = ["Player 1", true, "Player 2", true];
    const expected2 = ["Player 2", true, "Player 1", true];

    game1.setPlayers(false, "O");
    game2.setPlayers(false, "X");

    const result1 = [
      game1.players.O.name,
      game1.players.O.isHuman,
      game1.players.X.name,
      game1.players.X.isHuman,
    ];
    const result2 = [
      game2.players.O.name,
      game2.players.O.isHuman,
      game2.players.X.name,
      game2.players.X.isHuman,
    ];

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setNextPlayer stores player when null", () => {
    const game = new Game();
    const input = "X";
    const expected = "X";
    game.setNextPlayer(input);
    const result = game.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setNextPlayer replaces stored player", () => {
    const game = new Game();
    game.nextPlayer = "O";
    const expected = "X";
    game.setNextPlayer();
    const result = game.nextPlayer;
    expect(result).toEqual(expected);
  });

  describe("setGridChoice", () => {
    it("setGridChoice stores HumanPlayer choice", () => {
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        X: { name: "CPU" },
      };
      game.nextPlayer = "O";
      const input = 5;
      const expectedGrid = "O";
      const expectedChoices = [5];

      game.setGridChoice(input);
      const resultGrid = game.grid[5];
      const resultChoices = game.choices;

      expect(resultGrid).toEqual(expectedGrid);
      expect(resultChoices).toEqual(expectedChoices);
    });

    it("setGridChoice stores CpuPlayer choice", () => {
      const game = new Game();
      game.players = {
        O: new CpuPlayer("CPU"),
        X: { name: "You" },
      };
      game.nextPlayer = "O";
      const input = 5;
      const expectedGrid = "O";
      const expectedChoices = [5];

      game.setGridChoice(input);
      const resultGrid = game.grid[5];
      const resultChoices = game.choices;

      expect(resultGrid).toEqual(expectedGrid);
      expect(resultChoices).toEqual(expectedChoices);
    });
  });

  it("setWinner stores winner", () => {
    const game = new Game();
    const expected = "X";
    game.setWinner("X");
    const result = game.winner;
    expect(result).toEqual(expected);
  });

  it("logGrid logs grid correctly", () => {
    const game = new Game();
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
