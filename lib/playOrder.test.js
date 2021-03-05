const { setPlayOrder } = require("./playOrder");
const { Game } = require("./game");

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
    const game = new Game();
    game.players = {
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

    setPlayOrder(game, order);
    const resultNext = game.nextPlayer;
    const resultName = game.players[resultNext].name;

    expect(resultNext).toEqual(expectedNext);
    expect(resultName).toEqual(expectedName);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });

  it("CPU goes first", () => {
    const game = new Game();
    game.players = {
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

    setPlayOrder(game, order);
    const resultNext = game.nextPlayer;
    const resultName = game.players[resultNext].name;

    expect(resultNext).toEqual(expectedNext);
    expect(resultName).toEqual(expectedName);
    expect(consoleOutput[0]).toEqual(expectedLog);
  });
});
