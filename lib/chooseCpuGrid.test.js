const { expect } = require("@jest/globals");
const {
  generateCpuGridChoice,
  isValidCpuGridChoice,
  getCpuGridChoice,
} = require("./chooseCpuGrid");

describe("Cpu grid choices are returned correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("generateCpuGridChoice returns a number between 1 and 9", () => {
    const expected = true;
    let result = true;

    const check = (input) => {
      if (input >= 1 && input <= 9 && typeof input === "number") {
        return true;
      } else {
        return false;
      }
    };

    for (let i = 0; i < 100; i++) {
      const grid = generateCpuGridChoice();
      if (check(grid) === false) {
        result = false;
      }
    }

    expect(result).toEqual(expected);
  });

  it("isValidCpuGridChoice returns true", () => {
    const store = {
      choices: [],
    };
    const expected = true;
    const input1 = 1;

    const result1 = isValidCpuGridChoice(store, input1);

    expect(result1).toEqual(expected);
  });

  it("isValidCpuGridChoice returns false", () => {
    const store = {
      choices: [1],
    };
    const expected = false;
    const input1 = 1;

    const result1 = isValidCpuGridChoice(store, input1);

    expect(result1).toEqual(expected);
  });
});
