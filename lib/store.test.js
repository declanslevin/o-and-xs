const {
  setTeamChoice,
  setUserGridChoice,
  setCpuGridChoice,
  resetStore,
} = require("./store");

describe("Store methods can set values", () => {
  it("setTeamChoice stores team choice of 'X'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    setTeamChoice(store, "X");
    expect(store).toEqual(expected);
  });

  it("setTeamChoice stores team choice of 'O'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "O",
      cpuTeam: "X",
    };
    setTeamChoice(store, "O");
    expect(store).toEqual(expected);
  });

  it("setUserGridChoice stores grid choice of 5", () => {
    const store = {
      grid: {
        5: 5,
      },
      userTeam: "X",
      choices: [],
    };
    const input = 5;

    const expected = {
      grid: {
        5: "X",
      },
      userTeam: "X",
      choices: [5],
    };
    setUserGridChoice(store, input);
    expect(store).toEqual(expected);
  });

  it("setCpuGridChoice stores grid choice of 5", () => {
    const store = {
      grid: {
        5: 5,
      },
      cpuTeam: "X",
      choices: [],
    };
    const input = 5;

    const expected = {
      grid: {
        5: "X",
      },
      cpuTeam: "X",
      choices: [5],
    };
    setCpuGridChoice(store, input);
    expect(store).toEqual(expected);
  });

  it("resetStore resets the store", () => {
    const store = {
      grid: {
        1: "X",
        2: "X",
        3: "O",
        4: "O",
        5: "X",
        6: "X",
        7: "O",
        8: "O",
        9: "X",
      },
      userTeam: "X",
      cpuTeam: "O",
      nextPlayer: "X",
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      winner: "X",
    };
    const expected = {
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
      userTeam: null,
      cpuTeam: null,
      nextPlayer: null,
      choices: [],
      winner: false,
    };
    resetStore(store);
    expect(store).toEqual(expected);
  });
});
