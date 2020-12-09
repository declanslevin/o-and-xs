const rl = require("./rl");
const {
  getTeamChoice,
  getValidTeamChoice,
  setTeam,
  storeTeamChoice,
} = require("./chooseTeam");

jest.mock("./rl");

describe("Choices are stored correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("getTeamChoice returns user input", async () => {
    const expected = "X";

    rl.question = (question, cb) => {
      cb(expected);
    };

    const result = await getTeamChoice();

    expect(result).toEqual(expected);
  });

  it("getTeamChoice returns user input in upperCase", async () => {
    const expected = "X";
    const input = "x";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getTeamChoice();
    expect(result).toEqual(expected);
  });

  it("getValidTeamChoice returns true", () => {
    const expected = true;
    const input1 = "X";
    const input2 = "O";

    const result1 = getValidTeamChoice(input1);
    const result2 = getValidTeamChoice(input2);
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("getValidTeamChoice returns false", () => {
    const expected = false;
    const input = "foo";

    const result = getValidTeamChoice(input);
    expect(result).toEqual(expected);
  });

  it("getValidTeamChoice validates getTeamChoice of 'X'", async () => {
    const expected = true;
    const input = "X";
    rl.question = (question, cb) => {
      cb(input);
    };
    const result = getValidTeamChoice(await getTeamChoice());
    expect(result).toEqual(expected);
  });

  it("getValidTeamChoice validates getTeamChoice of 'foo'", async () => {
    const expected = false;
    const input = "foo";
    rl.question = (question, cb) => {
      cb(input);
    };
    const result = getValidTeamChoice(await getTeamChoice());
    expect(result).toEqual(expected);
  });

  it("setTeam stores team choice of 'X'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    setTeam(store, "X");
    expect(store).toEqual(expected);
  });

  it("setTeam stores team choice of 'O'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "O",
      cpuTeam: "X",
    };
    setTeam(store, "O");
    expect(store).toEqual(expected);
  });

  it("storeTeamChoice validates and stores choice of 'X'", async () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    const input = "X";

    rl.question = (question, cb) => {
      cb(input);
    };

    await storeTeamChoice(store);
    expect(store).toEqual(expected);
  });

  it("storeTeamChoice validates and rejects choice of 'foo'", async () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    const expectedLog =
      "Please enter only the letter O or X to choose your team";
    const input = "foo";

    rl.question = (question, cb) => {
      cb(input);
    };

    const mock = jest.fn();
    await storeTeamChoice(store);

    expect(mock).toHaveBeenCalled();
    mock.mockRestore();

    // expect(storeTeamChoice).toHaveBeenCalled();
    expect(consoleOutput).toEqual([expectedLog]);
    // expect(store).toEqual(expected);
  });
});
