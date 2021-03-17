const { getTeamChoice, isValidTeamChoice } = require("./chooseTeam");
const { Game } = require("./game");

describe.skip("Team choices are returned correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  it("isValidTeamChoice returns true", () => {
    const game = new Game();
    const expected = true;
    const input1 = "X";
    const input2 = "O";

    const result1 = isValidTeamChoice(game, input1);
    const result2 = isValidTeamChoice(game, input2);
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected);
  });

  it("isValidTeamChoice returns false", () => {
    const game = new Game();
    const expected = false;
    const expectedLog =
      "Please enter only the letter O or X to choose your team";

    const input = "foo";

    const result = isValidTeamChoice(game, input);
    expect(result).toEqual(expected);
    expect(consoleOutput).toEqual([expectedLog]);
  });

  it.skip("getTeamChoice returns a valid team choice", async () => {
    const game = new Game();
    game.singlePlayer = true;
    const expected = "X";
    const input = "X";

    rl.question = (question, cb) => {
      cb(input);
    };

    const result = await getTeamChoice(game);
    expect(result).toEqual(expected);
  });

  it.skip("getTeamChoice rejects until given a valid team choice", async () => {
    const game = new Game();
    game.singlePlayer = true;
    const expected = "X";
    const expectedLog =
      "Please enter only the letter O or X to choose your team";

    rl.question = jest
      .fn()
      .mockImplementationOnce((question, cb) => {
        cb("foo");
      })
      .mockImplementationOnce((question, cb) => {
        cb("X");
      })
      .mockImplementationOnce((question, cb) => {
        cb("bar");
      });

    const result = await getTeamChoice(game);

    expect(result).toEqual(expected);
    expect(rl.question).toHaveBeenCalledTimes(2);
    expect(consoleOutput).toEqual([expectedLog]);
  });
});
