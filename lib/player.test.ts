import Game from "./game";
import { Player, HumanPlayer, CpuPlayer } from "./player";

describe("Player methods work correctly", () => {
  let consoleOutput: string[] = [];
  const mockedLog = (output: string) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  describe("Base Player class methods", () => {
    it("getTeam returns player team", () => {
      const player = new Player();
      const cpu = new CpuPlayer();
      const game = new Game();
      game.players = {
        O: player,
        X: cpu,
      };

      const expected1 = "O";
      const expected2 = "X";
      const result1 = player.getTeam(game);
      const result2 = cpu.getTeam(game);
      expect(result1).toEqual(expected1);
      expect(result2).toEqual(expected2);
    });
    it("getOtherPlayerTeam returns the other player's team", () => {
      const player = new Player();
      const cpu = new CpuPlayer();
      const game = new Game();
      game.players = {
        O: player,
        X: cpu,
      };
      const expected = "X";
      const result = player.getOtherPlayerTeam(game);
      expect(result).toEqual(expected);
    });
    it("_isValidGridChoice returns true", () => {
      const player = new Player();
      const game = new Game();
      const expected = true;
      const input1 = 1;
      const input2 = 9;

      const result1 = player._isValidGridChoice(game, input1);
      const result2 = player._isValidGridChoice(game, input2);

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
    });

    it("_isValidGridChoice returns false", () => {
      const game = new Game();
      const player = new HumanPlayer("Player 1");
      game.players = {
        O: player,
        X: new CpuPlayer("CPU"),
      };
      game.choices = [5];
      const expected = false;
      const expectedLog =
        "Please enter a valid grid number. Make sure it hasn't already been picked!";
      const input1 = 0;
      const input2 = 10;
      const input3 = 5;

      const result1 = player._isValidGridChoice(game, input1);
      const result2 = player._isValidGridChoice(game, input2);
      const result3 = player._isValidGridChoice(game, input3);

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
      expect(result3).toEqual(expected);

      // TODO: Fix this
      // expect(consoleOutput.length).toEqual(4);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });
  });

  describe("HumanPlayer class methods", () => {
    it.skip("getGridChoice returns a valid grid choice", async () => {
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        X: new CpuPlayer("CPU"),
      };
      game.nextPlayer = "O";
      const input = 5;
      const expected = 5;
      const expectedLog = `You chose ${input}!`;

      // rl.question = (question, cb) => {
      //   cb(input);
      // };

      const result = await game.players.O.getGridChoice(game);
      expect(result).toEqual(expected);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });

    it.skip("getGridChoice rejects until given a valid grid choice", async () => {
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        X: new CpuPlayer("CPU"),
      };
      game.nextPlayer = "O";
      game.choices = [5];
      const expected = 1;
      const expectedLog =
        "Please enter a valid grid number. Make sure it hasn't already been picked!";

      // rl.question = jest
      //   .fn()
      //   .mockImplementationOnce((question, cb) => {
      //     cb("foo");
      //   })
      //   .mockImplementationOnce((question, cb) => {
      //     cb(5);
      //   })
      //   .mockImplementationOnce((question, cb) => {
      //     cb(1);
      //   })
      //   .mockImplementationOnce((question, cb) => {
      //     cb("bar");
      //   });

      const result = await game.players.O.getGridChoice(game);
      expect(result).toEqual(expected);
      // expect(rl.question).toHaveBeenCalledTimes(3);
      expect(consoleOutput[1]).toEqual(expectedLog);
    });

    it("setGridChoice sets grid choice", async () => {
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        X: new CpuPlayer("CPU"),
      };
      const gridExpected = "O";
      const choiceExpected = [5];
      await game.players.O.setGridChoice(game, 5);
      const gridResult = game.grid[5];
      const choiceResult = game.choices;
      expect(gridResult).toEqual(gridExpected);
      expect(choiceResult).toEqual(choiceExpected);
    });
  });

  describe("CpuPlayer class methods", () => {
    it("_generateCpuGridChoice returns a number between 1 and 9", () => {
      const player = new CpuPlayer();
      const expected = true;
      let result = true;

      const check = (input: number) => {
        if (input >= 1 && input <= 9 && typeof input === "number") {
          return true;
        } else {
          return false;
        }
      };

      for (let i = 0; i < 100; i++) {
        const grid = player._generateCpuGridChoice();
        if (check(grid) === false) {
          result = false;
        }
      }

      expect(result).toEqual(expected);
    });

    it("getGridChoice returns a grid choice", async () => {
      const game = new Game();
      game.players = {
        O: new HumanPlayer("You"),
        X: new CpuPlayer("CPU"),
      };
      const expected = true;

      const check = (input: number) => {
        if (input >= 1 && input <= 9 && typeof input === "number") {
          return true;
        } else {
          return false;
        }
      };

      const choice = await game.players.X.getGridChoice(game);
      const result = check(choice);

      const expectedLog = `CPU chose ${choice}!`;
      expect(result).toEqual(expected);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });

    it("setGridChoice sets grid choice", async () => {
      const game = new Game();
      const cpu = new CpuPlayer();
      const player = new HumanPlayer();

      game.players = {
        O: cpu,
        X: player,
      };
      const gridExpected = "O";
      const choiceExpected = [5];
      await cpu.setGridChoice(game, 5);
      const gridResult = game.grid[5];
      const choiceResult = game.choices;
      expect(gridResult).toEqual(gridExpected);
      expect(choiceResult).toEqual(choiceExpected);
    });
  });
});
