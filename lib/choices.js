const rl = require("./rl.js");
const logGrid = require("./logGrid.js");
const checkWin = require("./checkWin.js");

const chooseOX = (store) => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      let val = choice.toUpperCase();
      if (val === "O" || val === "X") {
        store.userTeam = val;
        if (val === "O") {
          store.cpuTeam = "X";
        } else {
          store.cpuTeam = "O";
        }
        return resolve();
      } else {
        console.log("Please enter only the letter O or X to choose your team");
        return resolve(chooseOX(store));
      }
    });
  });
};

const chooseUserGrid = (store) => {
  return new Promise((resolve) => {
    logGrid(store);
    rl.question("Enter your choice of grid number = ", (grid) => {
      let val = Number(grid);
      if (isNaN(val) || val < 1 || val > 9 || store.choices.includes(val)) {
        console.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return resolve(chooseUserGrid(store));
      } else {
        store.grid[val] = store.userTeam;
        store.choices.push(val);
        console.log(`You chose ${val}!`);
        checkWin(store);
        return resolve();
      }
    });
  });
};

const chooseCpuGrid = (store) => {
  logGrid(store);
  let x = false;
  while (x === false) {
    let choice = Math.floor(Math.random() * 8 + 1);
    if (store.choices.includes(choice)) {
      choice = Math.floor(Math.random() * 8 + 1);
    } else {
      store.grid[choice] = store.cpuTeam;
      store.choices.push(choice);
      console.log(`CPU chose ${choice}!`);
      x = true;
    }
  }
  checkWin(store);
};

exports.chooseOX = chooseOX;
exports.chooseUserGrid = chooseUserGrid;
exports.chooseCpuGrid = chooseCpuGrid;
