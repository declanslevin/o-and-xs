const { expect } = require("@jest/globals");
const {
  mapGridValues,
  checkMappedGridForWin,
  checkForDraw,
  checkForWin,
  checkForGameOver,
} = require("./checkWin");
const { playAgain } = require("./playAgain");

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
    const store1 = { winner: false };
    const store2 = { winner: false };
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    const result1 = checkMappedGridForWin(store1, array1);
    const result2 = checkMappedGridForWin(store2, array2);
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("checkMappedGridForWin sets store.winner when there is a winner", () => {
    const store1 = { winner: false };
    const store2 = { winner: false };
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    checkMappedGridForWin(store1, array1);
    checkMappedGridForWin(store2, array2);

    const storeResult1 = store1.winner;
    const storeResult2 = store2.winner;
    expect(storeResult1).toEqual(expected1);
    expect(storeResult2).toEqual(expected2);
  });

  it("checkMappedGridForWin returns false when there isn't a winner", () => {
    const store = { winner: false };
    const array = ["123", "XXO", "OXO"];
    const expected = false;

    const result = checkMappedGridForWin(store, array);
    expect(result).toEqual(expected);
  });

  it("checkForDraw returns true when there is a draw", () => {
    const store = {
      grid: {
        1: "O",
        2: "O",
        3: "X",
        4: "X",
        5: "O",
        6: "O",
        7: "O",
        8: "X",
        9: "X",
      },
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: false,
    };
    const expected = true;
    const expectedLog = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog1 = "You drew!";
    const result = checkForDraw(store);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(consoleOutput[1]).toEqual(expectedLog1);
  });

  it("checkforDraw returns false when there isn't a draw", () => {
    const store = {
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: true,
    };
    const expected = false;
    const result = checkForDraw(store);
    expect(result).toEqual(expected);
  });

  it("checkForWin announces user win and returns playAgain()", async () => {
    const store = {
      grid: {
        1: "X",
        2: 2,
        3: "O",
        4: "O",
        5: "X",
        6: 6,
        7: 7,
        8: 8,
        9: "X",
      },
      userTeam: "X",
      cpuTeam: "O",
      choices: [],
      winner: false,
    };

    const expectedWinner = "X";
    const expectedLog1 = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog2 = "You won!";

    await checkForWin(store);

    const resultWinner = store.winner;

    expect(resultWinner).toEqual(expectedWinner);
    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
    expect(playAgain).toHaveBeenCalled();
  });

  it("checkForWin announces cpu win and returns playAgain()", async () => {
    const store = {
      grid: {
        1: "O",
        2: 2,
        3: "X",
        4: "X",
        5: "O",
        6: 6,
        7: 7,
        8: 8,
        9: "O",
      },
      userTeam: "X",
      cpuTeam: "O",
      choices: [],
      winner: false,
    };
    const expectedLog1 = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog2 = "CPU won!";

    await checkForWin(store);

    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
    expect(playAgain).toHaveBeenCalled();
  });

  it("checkForGameOver announces user win", async () => {
    const store = {
      grid: {
        1: "O",
        2: "O",
        3: "X",
        4: "X",
        5: "O",
        6: "X",
        7: "O",
        8: "X",
        9: "O",
      },
      userTeam: "O",
      cpuTeam: "X",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: false,
    };

    const expectedLog1 = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog2 = "You won!";

    await checkForGameOver(store);

    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
    expect(playAgain).toHaveBeenCalled();
  });

  it("checkForGameOver announces cpu win", async () => {
    const store = {
      grid: {
        1: "O",
        2: "O",
        3: "X",
        4: "X",
        5: "O",
        6: "X",
        7: "O",
        8: "X",
        9: "O",
      },
      userTeam: "X",
      cpuTeam: "O",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: false,
    };

    const expectedLog1 = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog2 = "CPU won!";

    await checkForGameOver(store);

    expect(consoleOutput[0]).toEqual(expectedLog1);
    expect(consoleOutput[1]).toEqual(expectedLog2);
    expect(playAgain).toHaveBeenCalled();
  });

  it("checkForGameOver announces draw if no winner", async () => {
    const store = {
      grid: {
        1: "O",
        2: "O",
        3: "X",
        4: "X",
        5: "O",
        6: "O",
        7: "O",
        8: "X",
        9: "X",
      },
      userTeam: "X",
      cpuTeam: "O",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: false,
    };

    const expectedLog = `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `;
    const expectedLog1 = "You drew!";

    await checkForGameOver(store);
    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(consoleOutput[1]).toEqual(expectedLog1);
    expect(playAgain).toHaveBeenCalled();
  });
});
