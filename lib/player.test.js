const { Player, HumanPlayer, CpuPlayer, Store } = require("./store");
const rl = require("./rl");

jest.mock("./rl");

describe("Player methods work correctly", () => {
  let consoleOutput = [];
  const mockedLog = (output) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));

  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  describe("Base Player class methods", () => {
    it("_isValidGridChoice returns true", () => {
      const player = new Player();
      const store = new Store();
      const expected = true;
      const input1 = 1;
      const input2 = 9;

      const result1 = player._isValidGridChoice(store, input1);
      const result2 = player._isValidGridChoice(store, input2);

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
    });

    it("_isValidGridChoice returns false", () => {
      const player = new Player();
      player.isHuman = true;
      const store = new Store();
      store.choices = [5];
      const expected = false;
      const expectedLog =
        "Please enter a valid grid number. Make sure it hasn't already been picked!";
      const input1 = 0;
      const input2 = 10;
      const input3 = "foo";
      const input4 = 5;

      const result1 = player._isValidGridChoice(store, input1);
      const result2 = player._isValidGridChoice(store, input2);
      const result3 = player._isValidGridChoice(store, input3);
      const result4 = player._isValidGridChoice(store, input4);

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
      expect(result3).toEqual(expected);
      expect(result4).toEqual(expected);
      expect(consoleOutput.length).toEqual(4);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });
  });

  describe("HumanPlayer class methods", () => {
    it("_promptForUserGridChoice returns user input", async () => {
      const player = new HumanPlayer();
      const expected = 5;

      rl.question = (question, cb) => {
        cb(expected);
      };

      const result = await player._promptForUserGridChoice();

      expect(result).toEqual(expected);
    });

    it("_promptForUserGridChoice returns user input as a number", async () => {
      const player = new HumanPlayer();
      const expectedType = "number";
      const input = "5";

      rl.question = (question, cb) => {
        cb(input);
      };

      const result = await player._promptForUserGridChoice();
      const resultType = typeof result;
      expect(resultType).toEqual(expectedType);
    });

    it("getGridChoice returns a valid grid choice", async () => {
      const store = new Store();
      const player = new HumanPlayer("You");
      store.players = {
        O: player,
        X: { name: "CPU" },
      };
      store.nextPlayer = "O";
      const input = 5;
      const expected = 5;
      const expectedLog = `You chose ${input}!`;

      rl.question = (question, cb) => {
        cb(input);
      };

      const result = await store.players.O.getGridChoice(store);
      expect(result).toEqual(expected);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });

    it("getGridChoice rejects until given a valid grid choice", async () => {
      const store = new Store();
      const player = new HumanPlayer("You");
      store.players = {
        O: player,
        X: { name: "CPU" },
      };
      store.nextPlayer = "O";
      store.choices = [5];
      const expected = 1;
      const expectedLog =
        "Please enter a valid grid number. Make sure it hasn't already been picked!";

      rl.question = jest
        .fn()
        .mockImplementationOnce((question, cb) => {
          cb("foo");
        })
        .mockImplementationOnce((question, cb) => {
          cb(5);
        })
        .mockImplementationOnce((question, cb) => {
          cb(1);
        })
        .mockImplementationOnce((question, cb) => {
          cb("bar");
        });

      const result = await store.players.O.getGridChoice(store);
      expect(result).toEqual(expected);
      expect(rl.question).toHaveBeenCalledTimes(3);
      expect(consoleOutput[1]).toEqual(expectedLog);
    });
  });

  describe("CpuPlayer class methods", () => {
    it("_generateCpuGridChoice returns a number between 1 and 9", () => {
      const player = new CpuPlayer();
      const expected = true;
      let result = true;

      const check = (input) => {
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

    it("getCpuGridChoice returns a grid choice", () => {
      const store = new Store();
      const player = new CpuPlayer();
      store.players = {
        O: { name: "You" },
        X: player,
      };
      const expected = true;

      const check = (input) => {
        if (input >= 1 && input <= 9 && typeof input === "number") {
          return true;
        } else {
          return false;
        }
      };

      const choice = store.players.X.getGridChoice(store);
      const result = check(choice);

      const expectedLog = `CPU chose ${choice}!`;
      expect(result).toEqual(expected);
      expect(consoleOutput[0]).toEqual(expectedLog);
    });
  });
});
