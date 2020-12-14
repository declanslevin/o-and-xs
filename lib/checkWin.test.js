const { expect } = require("@jest/globals");
const {
  checkWin,
  mapGridValues,
  checkMappedGridForWin,
} = require("./checkWin");
const playAgain = require("./playAgain");

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
    const store = {
      grid: {
        1: "X",
        2: 2,
        3: 3,
        4: 4,
        5: "X",
        6: 6,
        7: 7,
        8: 8,
        9: "X",
      },
    };
    const expected = ["X23", "4X6", "78X", "X47", "2X8", "36X", "XXX", "3X7"];
    const result = mapGridValues(store);
    expect(result).toEqual(expected);
  });

  it("checkMappedGridForWin returns winning team", () => {
    const array1 = ["XXX", "OOO"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    const result1 = checkMappedGridForWin(array1);
    const result2 = checkMappedGridForWin(array2);
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("Player wins", () => {
    const store = {
      grid: {
        1: "X",
        2: 2,
        3: 3,
        4: 4,
        5: "X",
        6: 6,
        7: 7,
        8: 8,
        9: "X",
      },
      userTeam: "X",
      choices: [1, 5, 9],
      winner: false,
    };

    checkWin(store);
    const expected = "You won!";
    const result = store.winner;

    expect(consoleOutput[1]).toEqual(expected);
    expect(result).toEqual(true);
    expect(playAgain).toHaveBeenCalled();
  });

  it("CPU wins", () => {
    const store = {
      grid: {
        1: "X",
        2: 2,
        3: 3,
        4: 4,
        5: "X",
        6: 6,
        7: 7,
        8: 8,
        9: "X",
      },
      userTeam: "O",
      choices: [1, 5, 9],
      winner: false,
    };

    checkWin(store);
    const expected = "CPU won!";
    const result = store.winner;

    expect(consoleOutput[1]).toEqual(expected);
    expect(result).toEqual(true);
    expect(playAgain).toHaveBeenCalled();
  });

  it("Handles a draw", () => {
    const store = {
      grid: {
        1: "X",
        2: "X",
        3: "O",
        4: "O",
        5: "O",
        6: "X",
        7: "X",
        8: "O",
        9: "X",
      },
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: false,
    };

    checkWin(store);
    const expected = "You drew!";
    const result = store.winner;

    expect(consoleOutput[1]).toEqual(expected);
    expect(result).toEqual(true);
    expect(playAgain).toHaveBeenCalled();
  });
});
