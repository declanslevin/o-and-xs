const { expect } = require("@jest/globals");
const Store = require("./store");

describe("Store methods can set values", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("setSinglePlayer returns true", () => {
    const store = new Store();
    const expected = true;

    store.setSinglePlayer(true);
    const result = store.singlePlayer;
    expect(result).toEqual(expected);
  });

  it("setSinglePlayer sets player names when true", () => {
    const store = new Store();
    const expected1 = "You";
    const expected2 = "CPU";
    store.setSinglePlayer(true);
    const result1 = store.player1.name;
    const result2 = store.player2.name;
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setSinglePlayer returns false", () => {
    const store = new Store();
    const expected = false;

    store.setSinglePlayer(false);
    const result = store.singlePlayer;
    expect(result).toEqual(expected);
  });

  it("setSinglePlayer sets player names when false", () => {
    const store = new Store();
    const expected1 = "Player 1";
    const expected2 = "Player 2";
    store.setSinglePlayer(false);
    const result1 = store.player1.name;
    const result2 = store.player2.name;
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setTeamChoice stores team choice of 'X'", () => {
    const store = new Store();
    const expectedUser = "X";
    const expectedCpu = "O";

    store.setTeamChoice("X");
    const resultUser = store.player1.team;
    const resultCpu = store.player2.team;
    expect(resultUser).toEqual(expectedUser);
    expect(resultCpu).toEqual(expectedCpu);
  });

  it("setTeamChoice stores team choice of 'O'", () => {
    const store = new Store();
    const expectedUser = "O";
    const expectedCpu = "X";

    store.setTeamChoice("O");
    const resultUser = store.player1.team;
    const resultCpu = store.player2.team;
    expect(resultUser).toEqual(expectedUser);
    expect(resultCpu).toEqual(expectedCpu);
  });

  it("setUserGridChoice stores grid choice of 5", () => {
    const store = new Store();
    store.player1.team = "X";
    store.nextPlayer = "player1";
    const input = 5;
    const expectedGrid = "X";
    const expectedChoices = [5];

    store.setUserGridChoice(input);
    const resultGrid = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGrid).toEqual(expectedGrid);
    expect(resultChoices).toEqual(expectedChoices);
  });

  it("setCpuGridChoice stores grid choice of 5", () => {
    const store = new Store();
    store.player2.team = "X";
    store.nextPlayer = "player2";
    const input = 5;
    const expectedGrid = "X";
    const expectedChoices = [5];

    store.setCpuGridChoice(input);
    const resultGrid = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGrid).toEqual(expectedGrid);
    expect(resultChoices).toEqual(expectedChoices);
  });

  it("setNextPlayer stores player when null", () => {
    const store = new Store();
    const input = "user";
    const expected = "user";
    store.setNextPlayer(input);
    const result = store.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setNextPlayer replaces stored player", () => {
    const store = new Store();
    store.nextPlayer = "player1";
    const expected = "player2";
    store.setNextPlayer();
    const result = store.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("nextPlayerName returns name of nextPlayer", () => {
    const store = new Store();
    store.nextPlayer = "player1";
    store.player1.name = "You";
    store.player2.name = "CPU";

    const expected1 = "You";
    const expected2 = "CPU";
    const result1 = store.nextPlayerName();
    store.nextPlayer = "player2";
    const result2 = store.nextPlayerName();
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setWinner stores winner", () => {
    const store = new Store();
    const expected = "X";
    store.setWinner("X");
    const result = store.winner;
    expect(result).toEqual(expected);
  });

  it("logGrid logs grid correctly", () => {
    const store = new Store();
    store.grid = {
      1: "X",
      2: 2,
      3: 3,
      4: 4,
      5: "X",
      6: 6,
      7: 7,
      8: 8,
      9: "O",
    };
    const expected = `
       --- --- ---
      | X | 2 | 3 |
       --- --- ---
      | 4 | X | 6 |
       --- --- ---
      | 7 | 8 | O |
       --- --- ---
      `;
    store.logGrid();
    expect(consoleOutput[0]).toEqual(expected);
  });
});
