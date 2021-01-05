const { userTurn, cpuTurn, makeTurn } = require("./play");
const addStoreMethods = require("./test-helpers/storeHelpers");
const rl = require("./rl");
const { expect } = require("@jest/globals");
// const { playAgain } = require("./playAgain");
// const { checkForGameOver } = require("./checkWin");

jest.mock("./rl");
// jest.mock("./playAgain");

describe("play functions work correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("userTurn stores user turn when there is no win or draw", async () => {
    const store = {
      grid: {
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
      userTeam: "X",
      cpuTeam: "O",
      nextPlayer: "X",
      choices: [],
      winner: false,
    };
    addStoreMethods(store);

    const expectedGridChoice = "X";
    const expectedChoices = [5];
    const expectedLog = "You chose 5!";

    const input = 5;
    rl.question = (question, cb) => {
      cb(input);
    };
    await userTurn(store);

    const resultGridChoice = store.grid[5];
    const resultChoices = store.choices;

    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(resultGridChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });

  // it("userTurn rejects user choice when there is a win", async () => {
  //   const store = {
  //     grid: {
  //       1: "X",
  //       2: "O",
  //       3: "O",
  //       4: 4,
  //       5: "X",
  //       6: 6,
  //       7: 7,
  //       8: 8,
  //       9: "X",
  //     },
  //     userTeam: "X",
  //     cpuTeam: "O",
  //     nextPlayer: "X",
  //     choices: [1, 2, 3, 5, 9],
  //     winner: false,
  //   };

  //   const expected = {
  //     grid: {
  //       1: "X",
  //       2: "O",
  //       3: "O",
  //       4: 4,
  //       5: "X",
  //       6: 6,
  //       7: 7,
  //       8: 8,
  //       9: "X",
  //     },
  //     userTeam: "X",
  //     cpuTeam: "O",
  //     nextPlayer: "X",
  //     choices: [1, 2, 3, 5, 9],
  //     winner: false,
  //   };

  //   // const expected = {
  //   //   grid: {
  //   //     1: 1,
  //   //     2: 2,
  //   //     3: 3,
  //   //     4: 4,
  //   //     5: "X",
  //   //     6: 6,
  //   //     7: 7,
  //   //     8: 8,
  //   //     9: 9,
  //   //   },
  //   //   userTeam: "X",
  //   //   cpuTeam: "O",
  //   //   nextPlayer: "X",
  //   //   choices: [5],
  //   //   winner: false,
  //   // };

  //   const expectedLog = `
  //    --- --- ---
  //   | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
  //    --- --- ---
  //   | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
  //    --- --- ---
  //   | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
  //    --- --- ---
  //   `;
  //   const expectedLog2 = "You won!";

  //   const mockFn = jest.createMockFromModule('checkForGameOver');
  //   // jest.fn().mockName("checkForGameOver").mockReturnValue(true);
  //   // const mock = jest.fn();
  //   // mockFn.mockReturnValue(true);
  //   // mockFn();
  //   // expect(mockFn).toHaveBeenCalled();

  //   // rl.question = (question, cb) => {
  //   //   cb(input);
  //   // };

  //   await userTurn(store);
  //   // expect(consoleOutput[0]).toEqual(expectedLog);
  //   // expect(consoleOutput[1]).toEqual(expectedLog2);
  //   // expect(playAgain).toHaveBeenCalled();
  //   expect(mockFn).toHaveBeenCalled();

  //   expect(store).toEqual(expected);
  // });
});
