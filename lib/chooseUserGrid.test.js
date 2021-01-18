const rl = require("./rl");
const {
  promptForUserGridChoice,
  isValidUserGridChoice,
  getUserGridChoice,
} = require("./chooseUserGrid");
const Store = require("./store");

jest.mock("./rl");

describe("Grid choices are returned correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("promptForUserGridChoice returns user input", async () => {
    const expected = 5;

    rl.question = (question, cb) => {
      cb(expected);
    };

    const result = await promptForUserGridChoice();

    expect(result).toEqual(expected);
  });

  it("promptForUserGridChoice returns user input as a number", async () => {
    const expectedType = "number";
    const input = "5";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await promptForUserGridChoice();
    const resultType = typeof result;
    expect(resultType).toEqual(expectedType);
  });

  it("isValidUserGridChoice returns true", () => {
    const store = { choices: [] };
    const expected = true;
    const input1 = 1;
    const input2 = 9;

    const result1 = isValidUserGridChoice(store, input1);
    const result2 = isValidUserGridChoice(store, input2);

    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("isValidUserGridChoice returns false", () => {
    const store = { choices: [5] };
    const expected = false;
    const expectedLog =
      "Please enter a valid grid number. Make sure it hasn't already been picked!";
    const input1 = 0;
    const input2 = 10;
    const input3 = "foo";
    const input4 = 5;

    const result1 = isValidUserGridChoice(store, input1);
    const result2 = isValidUserGridChoice(store, input2);
    const result3 = isValidUserGridChoice(store, input3);
    const result4 = isValidUserGridChoice(store, input4);

    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
    expect(result3).toEqual(expected);
    expect(result4).toEqual(expected);
    expect(consoleOutput.length).toEqual(4);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("getUserGridChoice returns a valid grid choice", async () => {
    const store = new Store();
    store.singlePlayer = true;
    const input = 5;
    const expected = 5;
    const expectedLog = `You chose ${input}!`;

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getUserGridChoice(store);
    expect(result).toEqual(expected);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("getUserGridChoice rejects until given a valid grid choice", async () => {
    const store = new Store();
    store.choices = [5];
    const expected = 1;
    const expectedLog =
      "Please enter a valid grid number. Make sure it hasn't already been picked!";

    rl.question = jest
      .fn()
      .mockImplementationOnce((question, cb) => {
        cb("foo");
      })
      .mockImplementationOnce((question, cb) => {
        cb(5);
      })
      .mockImplementationOnce((question, cb) => {
        cb(1);
      })
      .mockImplementationOnce((question, cb) => {
        cb("bar");
      });

    const result = await getUserGridChoice(store);
    expect(result).toEqual(expected);
    expect(rl.question).toHaveBeenCalledTimes(3);
    expect(consoleOutput[1]).toEqual(expectedLog);
  });
});
