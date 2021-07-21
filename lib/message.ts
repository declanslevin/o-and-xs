import { GameStage, Team } from "./game";

export type MessageToFrontEnd =
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
      name: string;
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
    }
  | {
      type: "stage";
      stage: GameStage;
  }
  | {
    type: "reset";
  };
