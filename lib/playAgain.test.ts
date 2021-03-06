import { isValidPlayAgainAnswer, playAgain } from "./playAgain";
import { HumanPlayer } from "./player";

jest.mock("./play");

describe("PlayAgain restarts or ends play accordingly", () => {
  let consoleOutput: string[] = [];
  const mockedLog = (output: string) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("isValidPlayAgainAnswer returns true", () => {
    const player = new HumanPlayer("Player 1");
    const expected = true;
    const input = "y";
    const input2 = "yes";
    const input3 = "n";
    const input4 = "no";

    const result = isValidPlayAgainAnswer(player, input);
    const result2 = isValidPlayAgainAnswer(player, input2);
    const result3 = isValidPlayAgainAnswer(player, input3);
    const result4 = isValidPlayAgainAnswer(player, input4);

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(result4).toEqual(expected);
  });

  it("isValidPlayAgainAnswer returns false", () => {
    const player = new HumanPlayer("Player 1");

    const expected = false;
    const expectedLog =
      "Please enter one of the following: 'y', 'yes', 'n' or 'no'";
    const input = "foo";

    const result = isValidPlayAgainAnswer(player, input);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it.skip("playAgain returns true", async () => {
    const player = new HumanPlayer("Player 1");

    const expected = true;
    // const input = "y";

    // rl.question = (question, cb) => {
    //   cb(input);
    // };

    const result = await playAgain(player);

    expect(result).toEqual(expected);
  });

  it.skip("playAgain returns false", async () => {
    const player = new HumanPlayer("Player 1");
    const expected = false;
    // const input = "n";

    // rl.question = (question, cb) => {
    //   cb(input);
    // };

    const result = await playAgain(player);

    expect(result).toEqual(expected);
  });
});
