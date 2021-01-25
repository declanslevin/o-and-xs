const rl = require("./rl");
const {
  promptForPlayAgain,
  isValidPlayAgainAnswer,
  playAgain,
} = require("./playAgain");
const Store = require("./store");

jest.mock("./rl");
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
    const store = new Store();
    const expected = true;
    const input = "y";
    const input2 = "yes";
    const input3 = "n";
    const input4 = "no";

    const result = isValidPlayAgainAnswer(store, input);
    const result2 = isValidPlayAgainAnswer(store, input2);
    const result3 = isValidPlayAgainAnswer(store, input3);
    const result4 = isValidPlayAgainAnswer(store, input4);

    expect(result).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(result4).toEqual(expected);
  });

  it("isValidPlayAgainAnswer returns false", () => {
    const store = new Store();
    const expected = false;
    const expectedLog =
      "Please enter one of the following: 'y', 'yes', 'n' or 'no'";
    const input = "foo";

    const result = isValidPlayAgainAnswer(store, input);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("playAgain returns true", async () => {
    const store = new Store();
    const expected = true;
    const input = "y";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await playAgain(store);

    expect(result).toEqual(expected);
  });

  it("playAgain returns false", async () => {
    const store = new Store();
    const expected = false;
    const input = "n";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await playAgain(store);

    expect(result).toEqual(expected);
  });
});
