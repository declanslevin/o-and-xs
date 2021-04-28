import { Team } from "./game";

export type Message =
  | {
      type: "prompt";
      prompt: string;
    }
  | {
      type: "log";
      log: string;
    }
  | {
      type: "thisPlayer";
      team: Team;
      name: string;
    }
  | {
      type: "currentPlayer";
      team: Team;
      player: string;
    }
  | {
      type: "playerChoice";
      choice: number;
      team: Team;
    }
  | {
      type: "draw";
    }
  | {
      type: "win";
      winner: string;
    };
