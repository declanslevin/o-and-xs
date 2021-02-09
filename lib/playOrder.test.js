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
    store.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };
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
    const store = new Store();
    store.players = {
      X: {
        name: "You",
        isHuman: true,
      },
      O: {
        name: "CPU",
        isHuman: false,
      },
    };
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
