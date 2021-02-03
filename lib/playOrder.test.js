const { expect } = require("@jest/globals");
const { SinglePlayer, CpuPlayer } = require("./player");
const { setPlayOrder } = require("./playOrder");
const { NewStore, Store } = require("./store");

let consoleOutput = [];
const mockedLog = (output) => consoleOutput.push(output);
beforeEach(() => {
  console.log = mockedLog;
});

const originalLog = console.log;
afterEach(() => {
  console.log = originalLog;
  consoleOutput = [];
});

describe("It sets play order correctly", () => {
  it("User goes first", () => {
    const store = new NewStore();
    store.players["X"] = new SinglePlayer();
    store.players["O"] = new CpuPlayer();
    const order = 0.3;

    const expectedName = "You";
    const expectedNext = "X";
    const expectedLog = "You get to go first!";

    setPlayOrder(store, order);
    const resultNext = store.nextPlayer;
    const resultName = store.players[resultNext].name;

    expect(resultNext).toEqual(expectedNext);
    expect(resultName).toEqual(expectedName);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("CPU goes first", () => {
    const store = new NewStore();
    store.players["X"] = new SinglePlayer();
    store.players["O"] = new CpuPlayer();
    const order = 0.8;

    const expectedName = "CPU";
    const expectedNext = "O";
    const expectedLog = "CPU gets to go first!";

    setPlayOrder(store, order);
    const resultNext = store.nextPlayer;
    const resultName = store.players[resultNext].name;

    expect(resultNext).toEqual(expectedNext);
    expect(resultName).toEqual(expectedName);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });
});
