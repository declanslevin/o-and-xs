const { expect } = require("@jest/globals");
const addStoreMethods = require("./storeHelpers");

describe("storeHelpers add test helpers for the store", () => {
  it("setTeamChoice sets team choice when called", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expectedUser = "X";
    const expectedCpu = "O";

    addStoreMethods(store);
    const input = "X";
    store.setTeamChoice(input);

    const userResult = store.userTeam;
    const cpuResult = store.cpuTeam;

    expect(userResult).toEqual(expectedUser);
    expect(cpuResult).toEqual(expectedCpu);
  });

  it("setUserGridChoice sets user grid choice", () => {
    const store = {
      userTeam: "X",
      choices: [],
    };
    const expectedGridChoice = "X";
    const expectedChoices = [5];

    addStoreMethods(store);
    const input = 5;
    store.setUserGridChoice(input);

    const resultGridChoice = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGridChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });

  it("setCpuGridChoice sets cpu grid choice", () => {
    const store = {
      cpuTeam: "X",
      choices: [],
    };
    const expectedGridChoice = "X";
    const expectedChoices = [5];

    addStoreMethods(store);
    const input = 5;
    store.setCpuGridChoice(input);

    const resultGridChoice = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGridChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });
});
