const rl = require("./rl");

const generateCpuGridChoice = () => {
  return Math.floor(Math.random() * 8 + 1);
};

const isValidCpuGridChoice = (store, choice) => {
  if (store.choices.includes(choice)) {
    return false;
  } else {
    return true;
  }
};

const getCpuGridChoice = (store) => {
  let x = false;
  while (x === false) {
    let grid = generateCpuGridChoice();
    if (isValidCpuGridChoice(grid) === true) {
      x = true;
      console.log(`CPU chose ${choice}!`);
      return grid;
    }
  }
};

// const chooseCpuGrid = (store) => {
//   logGrid(store);
//   let x = false;
//   while (x === false) {
//     let choice = Math.floor(Math.random() * 8 + 1);
//     if (store.choices.includes(choice)) {
//       choice = Math.floor(Math.random() * 8 + 1);
//     } else {
//       store.grid[choice] = store.cpuTeam;
//       store.choices.push(choice);
//       console.log(`CPU chose ${choice}!`);
//       x = true;
//     }
//   }
//   checkWin(store);
// };

exports.generateCpuGridChoice = generateCpuGridChoice;
exports.isValidCpuGridChoice = isValidCpuGridChoice;
exports.getCpuGridChoice = getCpuGridChoice;
