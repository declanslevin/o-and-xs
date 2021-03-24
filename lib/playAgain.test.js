const { isValidPlayAgainAnswer, playAgain } = require("./playAgain");
const { Game } = require("./game");
const { HumanPlayer } = require("./player");

jest.mock("./play");

describe("PlayAgain restarts or ends play accordingly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("isValidPlayAgainAnswer returns true", () => {
    const game = new Game();
    const expected = true;
    const input = "y";
    const input2 = "yes";
    const input3 = "n";
    const input4 = "no";

    const result = isValidPlayAgainAnswer(game, input);
    const result2 = isValidPlayAgainAnswer(game, input2);
    const result3 = isValidPlayAgainAnswer(game, input3);
    const result4 = isValidPlayAgainAnswer(game, input4);

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(result4).toEqual(expected);
  });

  it("isValidPlayAgainAnswer returns false", () => {
    const game = new Game();
    game.players = {
      O: new HumanPlayer("Player 1"),
      X: new HumanPlayer("Player 2"),
    };
    const expected = false;
    const expectedLog =
      "Please enter one of the following: 'y', 'yes', 'n' or 'no'";
    const input = "foo";

    const result = isValidPlayAgainAnswer(game, input);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it.skip("playAgain returns true", async () => {
    const game = new Game();
    const expected = true;
    const input = "y";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await playAgain(game);

    expect(result).toEqual(expected);
  });

  it.skip("playAgain returns false", async () => {
    const game = new Game();
    const expected = false;
    const input = "n";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await playAgain(game);

    expect(result).toEqual(expected);
  });
});
