import Lobby from "./lobby";
import { HumanPlayer } from "./player";
import { gameFactory } from "./test-helpers";

describe(Lobby, () => {
  describe("addAsWaitingPlayer", () => {
    it("adds player to array when not included", () => {
      const lobby = new Lobby();
      const player = new HumanPlayer("Player 1");
      player.log = jest.fn();

      lobby.addAsWaitingPlayer(player);

      expect(lobby.waitingPlayers).toEqual([player]);
      expect(player.log).toHaveBeenCalledWith("Adding you to the lobby");
    });

    it("doesn't add player to array when already included", () => {
      const player = new HumanPlayer("Player 1");
      const lobby = new Lobby([player]);
      player.log = jest.fn();

      lobby.addAsWaitingPlayer(player);

      expect(player.log).not.toHaveBeenCalled();
      expect(lobby.waitingPlayers).toEqual([player]);
    });
  });

  describe("getGameFromPlayer", () => {
    it("returns game that player belongs too", () => {
      const lobby = new Lobby();
      const game1 = gameFactory({ vs: "Human" });
      const game2 = gameFactory({ vs: "Human" });
      const player = game2.players.O;

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
