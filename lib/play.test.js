const { userTurn, cpuTurn, makeTurn } = require("./play");
const rl = require("./rl");
const Store = require("./store");

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

  it("userTurn stores user choice", async () => {
    const store = new Store();
    store.singlePlayer = true;
    store.player1.team = "X";
    store.nextPlayer = "player1";

    const expectedGridChoice = "X";
    const expectedChoices = [5];
    const expectedLog = "You chose 5!";

    const input = 5;
    rl.question = (question, cb) => {
      cb(input);
    };
    await userTurn(store);

    const resultGridChoice = store.grid[5];
    const resultChoices = store.choices;

    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(resultGridChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });

  // it("cpuTurn stores cpu choice", async () => {
  //   const store = new Store();
  //   store.cpuTeam = "X";

  //   const expectedGridChoice = "X";
  //   const expectedChoices = [5];
  //   const expectedLog = "CPU chose 5!";

  //   getCpuGridChoice.mockReturnValue(5);

  //   await cpuTurn(store);

  //   const resultGridChoice = store.grid[5];
  //   const resultChoices = store.choices;

  //   expect(consoleOutput[0]).toEqual(expectedLog);
  //   expect(resultGridChoice).toEqual(expectedGridChoice);
  //   expect(resultChoices).toEqual(expectedChoices);
  // });
});
