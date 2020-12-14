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
  while (true) {
    let choice = generateCpuGridChoice();
    if (isValidCpuGridChoice(store, choice) === true) {
      console.log(`CPU chose ${choice}!`);
      return choice;
    }
  }
};

exports.generateCpuGridChoice = generateCpuGridChoice;
exports.isValidCpuGridChoice = isValidCpuGridChoice;
exports.getCpuGridChoice = getCpuGridChoice;
