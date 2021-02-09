// const { userTurn, cpuTurn, makeTurn } = require("./play");
const { playerTurn } = require("./play");
const rl = require("./rl");
const { Store, HumanPlayer, CpuPlayer } = require("./store");

jest.mock("./rl");

describe("play functions work correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));
  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("playerTurn stores HumanPlayer choice", async () => {
    const store = new Store();
    store.players = {
      O: new HumanPlayer("You"),
      X: new CpuPlayer("CPU"),
    };
    store.nextPlayer = "O";
    const expectedGridChoice = "O";
    const expectedChoices = [5];
    const expectedLog = "You chose 5!";
    const input = 5;
    rl.question = (question, cb) => {
      cb(input);
    };
    await playerTurn(store);
    const resultChoice = store.grid[5];
    const resultChoices = store.choices;
    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(resultChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });
});
