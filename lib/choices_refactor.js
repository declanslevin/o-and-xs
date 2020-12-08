const rl = require("./rl");
const logGrid = require("./logGrid");
const checkWin = require("./checkWin");

// const getTeamChoice = () => {
//   return new Promise((resolve) => {
//     rl.question("Pick your team. O or X? = ", (choice) => {
//       let val = choice.toUpperCase();
//       if (val !== "O" || val !== "X") {
//         console.log("Please enter only the letter O or X to choose your team");
//         return resolve(getTeamChoice());
//       } else {
//         return resolve(val);
//       }
//     });
//   });
// };

const getTeamChoice = () => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

// return true or false
// getValidTeamChoice
const validateTeamChoice = (choice) => {
  if (choice !== "O" || val !== "X") {
    console.log("Please enter only the letter O or X to choose your team");
    return getTeamChoice();
  } else {
    return choice;
  }
};

// const getTeamChoice = () => {
//   rl.question("Pick team", (choice) => {
//     let val = choice.toUpperCase();
//     if (val !== "O" || val !== "X") {
//       console.log("Please enter only the letter O or X to choose your team");
//       return getTeamChoice();
//     } else {
//       return val;
//     }
//   });
// };

const setTeam = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};

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
      // decompose and test
      // return true or false
      if (isNaN(val) || val < 1 || val > 9 || store.choices.includes(val)) {
        console.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return resolve(chooseUserGrid(store));
      } else {
        // updateStore(store, val)
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

// const exportFunctions = {
//   getTeamChoice,
//   question: rl.question,
// };

exports.getTeamChoice = getTeamChoice;
exports.setTeam = setTeam;
exports.validateTeamChoice = validateTeamChoice;

exports.chooseUserGrid = chooseUserGrid;
exports.chooseCpuGrid = chooseCpuGrid;
// exports.exportFunctions = exportFunctions;
