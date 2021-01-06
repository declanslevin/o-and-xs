const { setPlayOrder } = require("./playOrder");
const { Store } = require("./store");

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
    const store = new Store();
    const order = 0.3;

    const expected = "user";
    const expectedLog = "You get to go first!";

    setPlayOrder(store, order);
    const result = store.nextPlayer;

    expect(result).toEqual(expected);
    expect(consoleOutput).toEqual([expectedLog]);
  });

  it("CPU goes first", () => {
    const store = new Store();
    const order = 0.8;

    const expected = "cpu";
    const expectedLog = "CPU goes first.";

    setPlayOrder(store, order);
    const result = store.nextPlayer;

    expect(result).toEqual(expected);
    expect(consoleOutput).toEqual([expectedLog]);
  });
});
