const setTeam = require("./store");

describe("Store methods can set values", () => {
  it("setTeam stores team choice of 'X'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "X",
      cpuTeam: "O",
    };
    setTeam(store, "X");
    expect(store).toEqual(expected);
  });

  it("setTeam stores team choice of 'O'", () => {
    const store = {
      userTeam: null,
      cpuTeam: null,
    };
    const expected = {
      userTeam: "O",
      cpuTeam: "X",
    };
    setTeam(store, "O");
    expect(store).toEqual(expected);
  });
});
