const rl = require("./rl");
const play = require("./play");
const {
  promptForPlayAgain,
  isValidPlayAgainAnswer,
  playAgain,
} = require("./playAgain");
// const process = require("process");

jest.mock("./rl");
jest.mock("./play");
// jest.mock("process");

describe("PlayAgain restarts or ends play accordingly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("promptForPlayAgain returns input in lowercase", async () => {
    const expected = "foo";
    const input = "FOO";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await promptForPlayAgain();

    expect(result).toEqual(expected);
  });

  it("isValidPlayAgainAnswer returns true", () => {
    const expected = true;
    const input = "y";
    const input2 = "yes";
    const input3 = "n";
    const input4 = "no";

    const result = isValidPlayAgainAnswer(input);
    const result2 = isValidPlayAgainAnswer(input2);
    const result3 = isValidPlayAgainAnswer(input3);
    const result4 = isValidPlayAgainAnswer(input4);

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(result4).toEqual(expected);
  });

  it("isValidPlayAgainAnswer returns false", () => {
    const expected = false;
    const expectedLog =
      "Please enter one of the following: 'y', 'yes', 'n' or 'no'";
    const input = "foo";

    const result = isValidPlayAgainAnswer(input);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("playAgain resets store and calls play()", async () => {
    const store = {
      grid: {
        1: "X",
        2: "X",
        3: "O",
        4: "O",
        5: "X",
        6: "X",
        7: "O",
        8: "O",
        9: "X",
      },
      userTeam: "X",
      cpuTeam: "O",
      firstPlayer: "X",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: "X",
    };
    const expected = {
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
      userTeam: null,
      cpuTeam: null,
      firstPlayer: null,
      choices: [],
      winner: false,
    };
    const input = "y";

    rl.question = (question, cb) => {
      cb(input);
    };

    await playAgain(store);

    expect(store).toEqual(expected);
    expect(play).toHaveBeenCalled();
  });

  // it("playAgain exits application", async () => {
  //   const input = "n";
  //   const expectedLog = "Thank you for playing!";
  //   const mockExit = jest
  //     .mock(process.exit, "exit")
  //     .mockImplementationOnce(() => {
  //       // throw new Error("process.exit() was called.");
  //       // console.log("process.exit() was called");
  //     });

  //   rl.question = (question, cb) => {
  //     cb(input);
  //   };

  //   await playAgain();
  //   expect(consoleOutput[0]).toEqual(expectedLog);
  //   expect(mockExit).toHaveBeenCalledWith(0);
  // });
});
