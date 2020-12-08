// const { chooseOX, chooseUserGrid, chooseCpuGrid } = require("./choices");
const rl = require("./rl");
const { getTeamChoice, setTeam } = require("./choices_refactor");
const { expect } = require("@jest/globals");

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

  it("getTeamChoice returns a team choice", async () => {
    const expected = "X";

    rl.question = (question, cb) => {
      cb(expected);
    };

    const result = await getTeamChoice();

    expect(result).toEqual(expected);
  });

  it("user inputs lower case", async () => {
    const expected = "X";
    const input = "x";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getTeamChoice();
    expect(result).toEqual(expected);
  });
});
