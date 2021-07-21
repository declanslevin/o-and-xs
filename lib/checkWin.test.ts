import {
  mapGridValues,
  checkMappedGridForWin,
  checkForDraw,
  checkForWin,
  checkForGameOver,
} from "./checkWin";
import { GridObj } from "./game";
import { gameFactory } from "./test-helpers";

jest.mock("./playAgain");

describe("checkWin returns the correct result", () => {
  let consoleOutput: string[] = [];
  const mockedLog = (output: string) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("mapGridValues returns array of stored grid values", () => {
    const grid: GridObj = {
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
    const game = gameFactory({ vs: "Cpu", grid: grid });

    const expected = ["X23", "4X6", "78X", "X47", "2X8", "36X", "XXX", "3X7"];
    const result = mapGridValues(game);
    expect(result).toEqual(expected);
  });

  it("checkMappedGridForWin returns winning team", async () => {
    const game1 = gameFactory({ vs: "Cpu" });
    const game2 = gameFactory({ vs: "Cpu" });
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    const result1 = await checkMappedGridForWin(game1, array1);
    const result2 = await checkMappedGridForWin(game2, array2);
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("checkMappedGridForWin sets game.winner when there is a winner", async () => {
    const game1 = gameFactory({ vs: "Cpu" });
    const game2 = gameFactory({ vs: "Cpu" });
    const array1 = ["XXX", "123"];
    const array2 = ["OOO", "123"];
    const expected1 = "X";
    const expected2 = "O";

    await checkMappedGridForWin(game1, array1);
    await checkMappedGridForWin(game2, array2);

    const result1 = game1.winner;
    const result2 = game2.winner;
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("checkMappedGridForWin returns null when there isn't a winner", async () => {
    const game = gameFactory({ vs: "Cpu" });
    const array = ["123", "XXO", "OXO"];
    const expected = null;

    const result = await checkMappedGridForWin(game, array);
    expect(result).toEqual(expected);
  });

  it("checkForDraw returns true when there is a draw", async () => {
    const grid: GridObj = {
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
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Human", grid: grid, choices: choices });

    const expected = true;
    const result = await checkForDraw(game);
    expect(result).toEqual(expected);
  });

  it("checkForDraw sets game.winner when there is a draw", async () => {
    const grid: GridObj = {
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
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Human", grid: grid, choices: choices });

    const expected = "draw";
    await checkForDraw(game);
    const result = game.winner;
    expect(result).toEqual(expected);
  });

  it.skip("checkforDraw returns false when there isn't a draw", async () => {
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Human", choices: choices });

    const expected = false;
    const result = await checkForDraw(game);
    expect(result).toEqual(expected);
  });

  it("checkForWin announces user win and returns true", async () => {
    const grid: GridObj = {
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
    const game = gameFactory({ vs: "Human", grid: grid });

    const expected = true;
    const expectedWinner = "X";

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
  });

  it("checkForWin announces cpu win and returns true", async () => {
    const grid: GridObj = {
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
    const game = gameFactory({ vs: "Cpu", grid: grid });

    const expected = true;
    const expectedWinner = "O";

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
  });

  it("checkForWin returns false when no winner", async () => {
    const grid: GridObj = {
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
    const game = gameFactory({ vs: "Cpu", grid: grid });

    const expected = false;
    const expectedWinner = null;

    const result = await checkForWin(game);
    const resultWinner = game.winner;

    expect(result).toEqual(expected);
    expect(resultWinner).toEqual(expectedWinner);
  });

  // it.skip("logGameOver", () => {
  //   const expectedLog = `
  //        --- --- ---
  //       | ${game.grid[1]} | ${game.grid[2]} | ${game.grid[3]} |
  //        --- --- ---
  //       | ${game.grid[4]} | ${game.grid[5]} | ${game.grid[6]} |
  //        --- --- ---
  //       | ${game.grid[7]} | ${game.grid[8]} | ${game.grid[9]} |
  //        --- --- ---
  //       `;
  // });

  it("checkForGameOver returns true when there is a user win", async () => {
    const grid: GridObj = {
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
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Human", grid: grid, choices: choices });

    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });

  it("checkForGameOver returns true when there is a cpu win", async () => {
    const grid: GridObj = {
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
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Cpu", grid: grid, choices: choices });

    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });

  it("checkForGameOver returns true when there is a draw", async () => {
    const grid: GridObj = {
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
    const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const game = gameFactory({ vs: "Cpu", grid: grid, choices: choices });

    const expected = true;

    const result = await checkForGameOver(game);
    expect(result).toEqual(expected);
  });
});
