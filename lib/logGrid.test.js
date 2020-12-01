const logGrid = require("./logGrid");

let consoleOutput = [];
const mockedLog = (output) => consoleOutput.push(output);
beforeEach(() => (console.log = mockedLog));

const originalLog = console.log;
afterEach(() => {
  console.log = originalLog;
  consoleOutput = [];
});

test("Console logs correct grid", () => {
  store = {
    grid: {
      1: "X",
      2: 2,
      3: 3,
      4: 4,
      5: "X",
      6: 6,
      7: 7,
      8: 8,
      9: "O",
    },
  };

  logGrid(store);

  const expected = `
     --- --- ---
    | X | 2 | 3 |
     --- --- ---
    | 4 | X | 6 |
     --- --- ---
    | 7 | 8 | O |
     --- --- ---
    `;
  expect(consoleOutput).toEqual([expected]);
});
