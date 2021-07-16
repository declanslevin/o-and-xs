import { createStore } from "redux";
import { GridObj, Team } from "../lib/game";
import { MessageToFrontEnd } from "../lib/message";

export interface Player {
  name: string | null;
  team: Team | null;
}

export interface State {
  grid: GridObj;
  logs: string[];
  thisPlayer: Player;
  currentPlayer: Player;
  winner: string | null;
}

const initialState: State = {
  grid: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  },
  logs: [],
  thisPlayer: {
    name: null,
    team: null,
  },
  currentPlayer: {
    name: null,
    team: null,
  },
  winner: null,
};
const reducer = (state = initialState, action: MessageToFrontEnd): State => {
  switch (action.type) {
    case "prompt": {
      const { prompt } = action;
      return { ...state, logs: [...state.logs, prompt] };
    }
    case "log": {
      const { log } = action;
      return { ...state, logs: [...state.logs, log] };
    }
    case "thisPlayer": {
      const { team, name } = action;
      return { ...state, thisPlayer: { team, name } };
    }
    case "currentPlayer": {
      const { team, name } = action;
      return { ...state, currentPlayer: { team, name } };
    }
    case "playerChoice": {
      const { choice, team } = action;
      return {
        ...state,
        grid: { ...state.grid, [choice]: team },
      };
    }
    case "draw": {
      return { ...state, winner: "draw" };
    }
    case "win": {
      const { winner } = action;
      return { ...state, winner: winner };
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(reducer);
