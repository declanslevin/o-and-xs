const rl = require("./rl");
const {
  getTeamChoice,
  isValidTeamChoice,
  promptForTeamChoice,
} = require("./chooseTeam");
const Store = require("./store");

jest.mock("./rl");

describe("Team choices are returned correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("promptForTeamChoice returns user input", async () => {
    const store = new Store();
    store.singlePlayer = true;
    const expected = "X";

    rl.question = (question, cb) => {
      cb(expected);
    };

    const result = await promptForTeamChoice(store);

    expect(result).toEqual(expected);
  });

  it("promptForTeamChoice returns user input in upperCase", async () => {
    const store = new Store();
    store.singlePlayer = true;
    const expected = "X";
    const input = "x";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await promptForTeamChoice(store);
    expect(result).toEqual(expected);
  });

  it("isValidTeamChoice returns true", () => {
    const expected = true;
    const input1 = "X";
    const input2 = "O";

    const result1 = isValidTeamChoice(input1);
    const result2 = isValidTeamChoice(input2);
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("isValidTeamChoice returns false", () => {
    const expected = false;
    const expectedLog =
      "Please enter only the letter O or X to choose your team";

    const input = "foo";

    const result = isValidTeamChoice(input);
    expect(result).toEqual(expected);
    expect(consoleOutput).toEqual([expectedLog]);
  });

  it("getTeamChoice returns a valid team choice", async () => {
    const store = new Store();
    store.singlePlayer = true;
    const expected = "X";
    const input = "X";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getTeamChoice(store);
    expect(result).toEqual(expected);
  });

  it("getTeamChoice rejects until given a valid team choice", async () => {
    const store = new Store();
    store.singlePlayer = true;
    const expected = "X";
    const expectedLog =
      "Please enter only the letter O or X to choose your team";

    rl.question = jest
      .fn()
      .mockImplementationOnce((question, cb) => {
        cb("foo");
      })
      .mockImplementationOnce((question, cb) => {
        cb("X");
      })
      .mockImplementationOnce((question, cb) => {
        cb("bar");
      });

    const result = await getTeamChoice(store);

    expect(result).toEqual(expected);
    expect(rl.question).toHaveBeenCalledTimes(2);
    expect(consoleOutput).toEqual([expectedLog]);
  });
});
