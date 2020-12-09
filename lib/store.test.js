const { expect } = require("@jest/globals");
const set = require("set-value");
const {
  setTeamChoice,
  setUserGridChoice,
  setCpuGridChoice,
} = require("./store");

describe("Store methods can set values", () => {
  it("setTeamChoice stores team choice of 'X'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    setTeamChoice(store, "X");
    expect(store).toEqual(expected);
  });

  it("setTeamChoice stores team choice of 'O'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "O",
      cpuTeam: "X",
    };
    setTeamChoice(store, "O");
    expect(store).toEqual(expected);
  });

  it("setUserGridChoice stores grid choice of 5", () => {
    const store = {
      grid: {
        5: 5,
      },
      userTeam: "X",
      choices: [],
    };
    const input = 5;

    const expected = {
      grid: {
        5: "X",
      },
      userTeam: "X",
      choices: [5],
    };
    setUserGridChoice(store, input);
    expect(store).toEqual(expected);
  });

  it("setCpuGridChoice stores grid choice of 5", () => {
    const store = {
      grid: {
        5: 5,
      },
      cpuTeam: "X",
      choices: [],
    };
    const input = 5;

    const expected = {
      grid: {
        5: "X",
      },
      cpuTeam: "X",
      choices: [5],
    };
    setCpuGridChoice(store, input);
    expect(store).toEqual(expected);
  });
});
