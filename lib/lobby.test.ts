import Game from "./game";
import Lobby from "./lobby";
import { HumanPlayer, CpuPlayer } from "./player";

describe(Lobby, () => {
  let consoleOutput: string[] = [];
  const mockedLog = (output: string) => consoleOutput.push(output);
  beforeEach(() => (console.log = mockedLog));
  const originalLog = console.log;
  afterEach(() => {
    console.log = originalLog;
    consoleOutput = [];
  });

  describe("addAsWaitingPlayer", () => {
    it("adds player to array when not included", () => {
      const lobby = new Lobby();
      const player = new HumanPlayer("Player 1");
      const expectedLog = "Adding you to the lobby";

      lobby.addAsWaitingPlayer(player);

      expect(consoleOutput[0]).toEqual(expectedLog);
      expect(lobby.waitingPlayers).toEqual([player]);
    });

    it("doesn't add player to array when already included", () => {
      const player = new HumanPlayer("Player 1");
      const lobby = new Lobby([player]);

      lobby.addAsWaitingPlayer(player);

      expect(consoleOutput.length).toEqual(0);
      expect(lobby.waitingPlayers).toEqual([player]);
    });
  });

  describe("getGameFromPlayer", () => {
    it("returns game that player belongs too", () => {
      const lobby = new Lobby();
      const game1 = new Game();
      const game2 = new Game();
      const player = new HumanPlayer("Player 2");
      game1.players = {
        O: new HumanPlayer("Player 1"),
        X: new HumanPlayer("Player 2"),
      };
      game2.players = {
        O: player,
        X: new HumanPlayer("Player 4"),
      };
      lobby.addGame(game1);
      lobby.addGame(game2);

      const result = lobby.getGameFromPlayer(player);

      expect(result).toEqual(game2);
    });
  });

  describe("matchPlayers", () => {
    it("matches players and returns them in an array", () => {
      const lobby = new Lobby();
      const player1 = new HumanPlayer("Player 1");
      const player2 = new HumanPlayer("Player 2");
      const player3 = new HumanPlayer("Player 3");
      lobby.waitingPlayers = [player1, player2, player3];

      const result = lobby.matchPlayers();
      expect(result).toEqual([player3, player2]);
    });

    it("returns false and logs when awaiting an opponent to match with", () => {
      const lobby = new Lobby();
      const player1 = new HumanPlayer("Player 1");
      lobby.waitingPlayers = [player1];

      const result = lobby.matchPlayers();
      expect(result).toEqual(null);
    });
  });

  describe("waitForOpponent", () => {
    it("waits for an opponent player to join", async () => {
      const lobby = new Lobby();
      const player1 = new HumanPlayer("Player 1");
      player1.log = jest.fn();
      const player2 = new HumanPlayer("Player 2");
      lobby.waitingPlayers = [player1];

      const promise = lobby.waitForOpponent(player1);
      lobby.addAsWaitingPlayer(player2);
      const result = await promise;

      const expected = [player2, player1];
      expect(result).toEqual(expected);
      expect(player1.log).toHaveBeenCalledWith(
        "Waiting for an opponent to join lobby"
      );
      expect(player1.log).toHaveBeenCalledWith(
        "Opponent player has joined your game"
      );
    });
  });
});
