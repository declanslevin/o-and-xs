// const { userTurn, cpuTurn, makeTurn } = require("./play");
const { playerTurn } = require("./play");
const rl = require("./rl");
const { Game } = require("./game");
const { HumanPlayer, CpuPlayer } = require("./player");

jest.mock("./rl");

describe.skip("play functions work correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));
  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("playerTurn stores HumanPlayer choice", async () => {
    const game = new Game();
    game.players = {
      O: new HumanPlayer("You"),
      X: new CpuPlayer("CPU"),
    };
    game.nextPlayer = "O";
    const expectedGridChoice = "O";
    const expectedChoices = [5];
    const expectedLog = "You chose 5!";
    const input = 5;
    rl.question = (question, cb) => {
      cb(input);
    };
    await playerTurn(game);
    const resultChoice = game.grid[5];
    const resultChoices = game.choices;
    expect(consoleOutput[0]).toEqual(expectedLog);
    expect(resultChoice).toEqual(expectedGridChoice);
    expect(resultChoices).toEqual(expectedChoices);
  });
});
