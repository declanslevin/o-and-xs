const rl = require("./rl");

const promptForUserGridChoice = () => {
  return new Promise((resolve) => {
    rl.question("Enter your choice of grid number = ", (choice) => {
      return resolve(Number(choice));
    });
  });
};

// TODO: Should I replace store with getStoreChoices()?
const isValidUserGridChoice = (store, choice) => {
  if (
    isNaN(choice) ||
    choice < 1 ||
    choice > 9 ||
    store.choices.includes(choice)
  ) {
    console.log(
      "Please enter a valid grid number. Make sure it hasn't already been picked!"
    );
    return false;
  } else {
    return true;
  }
};

// TODO: Add in a win check somewhere?
// TODO: Add in grid logging?
const getUserGridChoice = async (store) => {
  let x = false;
  while (x === false) {
    let grid = await promptForUserGridChoice();
    if (isValidUserGridChoice(store, grid) === true) {
      x = true;
      console.log(`You chose ${grid}!`);
      return grid;
    }
  }
};

// const chooseUserGrid = (store) => {
//   return new Promise((resolve) => {
//     logGrid(store);
//     rl.question("Enter your choice of grid number = ", (grid) => {
//       let val = Number(grid);
//       // decompose and test
//       // return true or false
//       if (isNaN(val) || val < 1 || val > 9 || store.choices.includes(val)) {
//         console.log(
//           "Please enter a valid grid number. Make sure it hasn't already been picked!"
//         );
//         return resolve(chooseUserGrid(store));
//       } else {
//         // updateStore(store, val)
//         store.grid[val] = store.userTeam;
//         store.choices.push(val);
//         console.log(`You chose ${val}!`);
//         checkWin(store);
//         return resolve();
//       }
//     });
//   });
// };

exports.promptForUserGridChoice = promptForUserGridChoice;
exports.isValidUserGridChoice = isValidUserGridChoice;
exports.getUserGridChoice = getUserGridChoice;
