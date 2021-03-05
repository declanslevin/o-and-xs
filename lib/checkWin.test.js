const {
  mapGridValues,
  checkMappedGridForWin,
  checkForDraw,
  checkForWin,
  checkForGameOver,
} = require("./checkWin");
const { Game } = require("./game");

jest.mock("./playAgain");

describe("checkWin returns the correct result", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("mapGridValues returns array of stored grid values", () => {
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
      9: "X",
    };
    const expected = ["X23", "4X6", "78X", "X47", "2X8", "36X", "XXX", "3X7"];
    const result = mapGridValues(game);
    expect(result).toEqual(expected);
  });

  it("checkMappedGridForWin returns winning team", () => {
    const game1 = new Game();
    const game2 = new Game();
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    const result1 = checkMappedGridForWin(game1, array1);
    const result2 = checkMappedGridForWin(game2, array2);
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("checkMappedGridForWin sets game.winner when there is a winner", () => {
    const game1 = new Game();
    const game2 = new Game();
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    checkMappedGridForWin(game1, array1);
    checkMappedGridForWin(game2, array2);

    const result1 = game1.winner;
    const result2 = game2.winner;
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("checkMappedGridForWin returns false when there isn't a winner", () => {
    const game = new Game();
    const array = ["123", "XXO", "OXO"];
    const expected = false;

    const result = checkMappedGridForWin(game, array);
    expect(result).toEqual(expected);
  });

  it("checkForDraw returns true when there is a draw", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: "O",
      3: "X",
      4: "X",
      5: "O",
      6: "O",
      7: "O",
      8: "X",
      9: "X",
    };
    game.choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const expected = true;
    const expectedLog = `
         --- --- ---
        | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |
         --- --- ---
        | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |
         --- --- ---
        | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |
         --- --- ---
        `;
    const expectedLog1 = "You drew!";
    const result = await checkForDraw(game);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(consoleOutput[1]).toEqual(expectedLog1);
  });

  it("checkForDraw sets game.winner when there is a draw", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: "O",
      3: "X",
      4: "X",
      5: "O",
      6: "O",
      7: "O",
      8: "X",
      9: "X",
    };
    game.choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = "draw";
    await checkForDraw(game);
    const result = game.winner;
    expect(result).toEqual(expected);
  });

  it("checkforDraw returns false when there isn't a draw", async () => {
    const game = new Game((choices = [1, 2, 3, 4, 5, 6, 7, 8, 9]));
    const expected = false;
    const result = await checkForDraw(game);
    expect(result).toEqual(expected);
  });

  it("checkForWin announces user win and returns true", async () => {
    const game = new Game();
    game.grid = {
      1: "X",
      2: 2,
      3: "O",
      4: "O",
      5: "X",
      6: 6,
      7: 7,
      8: 8,
      9: "X",
    };
    game.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };

    const expected = true;
    const expectedWinner = "X";
    const expectedLog1 = `
         --- --- ---
        | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |
         --- --- ---
        | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |
         --- --- ---
        | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |
         --- --- ---
        `;
    const expectedLog2 = "You won!";

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
  });

  it("checkForWin announces cpu win and returns true", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: 2,
      3: "X",
      4: "X",
      5: "O",
      6: 6,
      7: 7,
      8: 8,
      9: "O",
    };
    game.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };

    const expected = true;
    const expectedWinner = "O";
    const expectedLog1 = `
         --- --- ---
        | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |
         --- --- ---
        | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |
         --- --- ---
        | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |
         --- --- ---
        `;
    const expectedLog2 = "CPU won!";

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
  });

  it("checkForWin returns false when no winner", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: 2,
      3: "X",
      4: "X",
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: "O",
    };
    game.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };
    const expected = false;
    const expectedWinner = false;

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
  });

  it("checkForGameOver returns true when there is a user win", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: "O",
      3: "X",
      4: "X",
      5: "O",
      6: "X",
      7: "O",
      8: "X",
      9: "O",
    };
    game.players = {
      O: {
        name: "You",
        isHuman: true,
      },
      X: {
        name: "CPU",
        isHuman: false,
      },
    };
    game.choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });

  it("checkForGameOver returns true when there is a cpu win", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: "O",
      3: "X",
      4: "X",
      5: "O",
      6: "X",
      7: "O",
      8: "X",
      9: "O",
    };
    game.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };
    game.choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });

  it("checkForGameOver returns true when there is a draw", async () => {
    const game = new Game();
    game.grid = {
      1: "O",
      2: "O",
      3: "X",
      4: "X",
      5: "O",
      6: "O",
      7: "O",
      8: "X",
      9: "X",
    };
    game.player1 = {
      team: "X",
      name: "You",
    };
    game.player2 = {
      team: "O",
      name: "CPU",
    };
    game.choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });
});
