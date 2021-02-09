const rl = require("./rl");
const {
  promptForNumPlayersChoice,
  isValidNumPlayersChoice,
  getNumPlayersChoice,
} = require("./chooseNumPlayers");
const { Store } = require("./store");

jest.mock("./rl");

describe("Number of players is chosen correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("promptForNumPlayersChoice returns user input", async () => {
    const expected = 1;

    rl.question = (question, cb) => {
      cb(expected);
    };

    const result = await promptForNumPlayersChoice();

    expect(result).toEqual(expected);
  });

  it("promptForNumPlayersChoice returns user input as a number", async () => {
    const expectedType = "number";
    const input = "1";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await promptForNumPlayersChoice();
    const resultType = typeof result;
    expect(resultType).toEqual(expectedType);
  });

  it("isValidNumPlayersChoice returns true", () => {
    const store = new Store();
    const expected = true;
    const input1 = 1;
    const input2 = 2;

    const result1 = isValidNumPlayersChoice(store, input1);
    const result2 = isValidNumPlayersChoice(store, input2);

    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("isValidNumPlayersChoice returns false", () => {
    const store = new Store();
    const expected = false;
    const expectedLog =
      "Please enter 1 to play against CPU or 2 to play against another person";
    const input1 = 0;
    const input2 = 3;
    const input3 = "foo";

    const result1 = isValidNumPlayersChoice(store, input1);
    const result2 = isValidNumPlayersChoice(store, input2);
    const result3 = isValidNumPlayersChoice(store, input3);

    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(consoleOutput.length).toEqual(3);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("getNumPlayersChoice returns true", async () => {
    const store = new Store();
    const input = 1;
    const expected = true;

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getNumPlayersChoice(store);
    expect(result).toEqual(result);
  });

  it("getNumPlayersChoice rejects until given a valid input", async () => {
    const store = new Store();
    const expected = true;
    const expectedLog =
      "Please enter 1 to play against CPU or 2 to play against another person";

    rl.question = jest
      .fn()
      .mockImplementationOnce((question, cb) => {
        cb("foo");
      })
      .mockImplementationOnce((question, cb) => {
        cb(3);
      })
      .mockImplementationOnce((question, cb) => {
        cb(1);
      })
      .mockImplementationOnce((question, cb) => {
        cb("bar");
      });

    const result = await getNumPlayersChoice(store);
    expect(result).toEqual(expected);
    expect(rl.question).toHaveBeenCalledTimes(3);
    expect(consoleOutput[1]).toEqual(expectedLog);
  });
});
