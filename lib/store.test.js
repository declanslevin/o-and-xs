const { Store } = require("./store");

describe("Store methods can set values", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("setTeamChoice stores team choice of 'X'", () => {
    const store = new Store();
    const expectedUser = "X";
    const expectedCpu = "O";

    store.setTeamChoice("X");
    const resultUser = store.userTeam;
    const resultCpu = store.cpuTeam;
    expect(resultUser).toEqual(expectedUser);
    expect(resultCpu).toEqual(expectedCpu);
  });

  it("setTeamChoice stores team choice of 'O'", () => {
    const store = new Store();
    const expectedUser = "O";
    const expectedCpu = "X";

    store.setTeamChoice("O");
    const resultUser = store.userTeam;
    const resultCpu = store.cpuTeam;
    expect(resultUser).toEqual(expectedUser);
    expect(resultCpu).toEqual(expectedCpu);
  });

  it("setUserGridChoice stores grid choice of 5", () => {
    const store = new Store();
    store.userTeam = "X";
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
    store.cpuTeam = "X";
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
    store.nextPlayer = "user";
    const expected = "cpu";
    store.setNextPlayer();
    const result = store.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setWinner stores winner", () => {
    const store = new Store();
    const expected = "X";
    store.setWinner("X");
    const result = store.winner;
    expect(result).toEqual(expected);
  });

  it("logGrid logs grid correctly", () => {
    const store = new Store(
      (grid = {
        1: "X",
        2: 2,
        3: 3,
        4: 4,
        5: "X",
        6: 6,
        7: 7,
        8: 8,
        9: "O",
      })
    );
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

  it("resetStore resets the store", () => {
    const store = new Store({
      grid: {
        1: "X",
        2: "X",
        3: "O",
        4: "O",
        5: "X",
        6: "X",
        7: "O",
        8: "O",
        9: "X",
      },
      userTeam: "X",
      cpuTeam: "O",
      nextPlayer: "X",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: "X",
    });
    const expected = {
      grid: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      },
      userTeam: null,
      cpuTeam: null,
      nextPlayer: null,
      choices: [],
      winner: false,
    };
    store.reset();
    expect(store).toEqual(expected);
  });
});
