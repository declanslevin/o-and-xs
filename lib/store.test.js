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

  it("getPlayerName returns player name", () => {
    const store = new Store();
    store.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = store.getPlayerName("O");
    const result2 = store.getPlayerName("X");
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("getNextPlayerName returns name of nextPlayer", () => {
    const store = new Store();
    store.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    store.nextPlayer = "O";
    const expected1 = "You";
    const expected2 = "CPU";

    const result1 = store.getNextPlayerName();
    store.nextPlayer = "X";
    const result2 = store.getNextPlayerName();
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("getCpuPlayer returns cpu player", () => {
    const store = new Store();
    store.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    const expected = "X";

    const result = store.getCpuPlayer();
    expect(result).toEqual(expected);
  });

  it("setPlayers when single player", () => {
    const store1 = new Store();
    const store2 = new Store();

    const expected1 = ["You", true, "CPU", false];
    const expected2 = ["CPU", false, "You", true];

    store1.setPlayers(true, "O");
    store2.setPlayers(true, "X");

    const result1 = [
      store1.players.O.name,
      store1.players.O.isHuman,
      store1.players.X.name,
      store1.players.X.isHuman,
    ];
    const result2 = [
      store2.players.O.name,
      store2.players.O.isHuman,
      store2.players.X.name,
      store2.players.X.isHuman,
    ];

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setPlayers when 2 player", () => {
    const store1 = new Store();
    const store2 = new Store();

    const expected1 = ["Player 1", true, "Player 2", true];
    const expected2 = ["Player 2", true, "Player 1", true];

    store1.setPlayers(false, "O");
    store2.setPlayers(false, "X");

    const result1 = [
      store1.players.O.name,
      store1.players.O.isHuman,
      store1.players.X.name,
      store1.players.X.isHuman,
    ];
    const result2 = [
      store2.players.O.name,
      store2.players.O.isHuman,
      store2.players.X.name,
      store2.players.X.isHuman,
    ];

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  it("setNextPlayer stores player when null", () => {
    const store = new Store();
    const input = "X";
    const expected = "X";
    store.setNextPlayer(input);
    const result = store.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setNextPlayer replaces stored player", () => {
    const store = new Store();
    store.nextPlayer = "O";
    const expected = "X";
    store.setNextPlayer();
    const result = store.nextPlayer;
    expect(result).toEqual(expected);
  });

  it("setUserGridChoice stores grid choice of 5", () => {
    const store = new Store();
    store.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    store.nextPlayer = "O";
    const input = 5;
    const expectedGrid = "O";
    const expectedChoices = [5];

    store.setUserGridChoice(input);
    const resultGrid = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGrid).toEqual(expectedGrid);
    expect(resultChoices).toEqual(expectedChoices);
  });

  it("setCpuGridChoice stores grid choice of 5", () => {
    const store = new Store();
    store.players = {
      O: { name: "You" },
      X: { name: "CPU" },
    };
    store.nextPlayer = "X";
    const input = 5;
    const expectedGrid = "X";
    const expectedChoices = [5];

    store.setCpuGridChoice(input);
    const resultGrid = store.grid[5];
    const resultChoices = store.choices;

    expect(resultGrid).toEqual(expectedGrid);
    expect(resultChoices).toEqual(expectedChoices);
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
