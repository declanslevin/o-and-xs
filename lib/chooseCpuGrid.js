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

// TODO: Should I add checkWin()?
const getCpuGridChoice = (store) => {
  let x = false;
  while (x === false) {
    let choice = generateCpuGridChoice();
    if (isValidCpuGridChoice(store, choice) === true) {
      x = true;
      console.log(`CPU chose ${choice}!`);
      return choice;
    }
  }
};

exports.generateCpuGridChoice = generateCpuGridChoice;
exports.isValidCpuGridChoice = isValidCpuGridChoice;
exports.getCpuGridChoice = getCpuGridChoice;
