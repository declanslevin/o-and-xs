const logGrid = require("./logGrid");
const playAgain = require("./playAgain");

const mapGridValues = (store) => {
  let gridArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  return gridArray.map((array) => {
    let result = array
      .map((ref) => {
        return store.grid[ref];
      })
      .join("");
    return result;
  });
};

const checkMappedGridForWin = (array) => {
  let winner = false;
  array.map((result) => {
    if (result === "XXX" || result === "OOO") {
      winner = result.split("")[0];
    }
  });
  return winner;
};

console.log(checkMappedGridForWin(["XXX"]));

const checkWin = (store) => {
  return new Promise((resolve) => {
    let gridArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    gridArray.map((array) => {
      let result = array
        .map((ref) => {
          return store.grid[ref];
        })
        .join("");
      if (result === "XXX" || result === "OOO") {
        store.winner = true;
        if (result.split("")[0] === store.userTeam) {
          logGrid(store);
          console.log("You won!");
          return resolve(playAgain(store));
        } else {
          logGrid(store);
          console.log("CPU won!");
          return resolve(playAgain(store));
        }
      }
      if (store.choices.length === 9) {
        store.winner = true;
        logGrid(store);
        console.log("You drew!");
        return resolve(playAgain(store));
      }
    });
  });
};

exports.checkWin = checkWin;
exports.mapGridValues = mapGridValues;
exports.checkMappedGridForWin = checkMappedGridForWin;
