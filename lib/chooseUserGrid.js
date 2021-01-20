const rl = require("./rl");

const promptForUserGridChoice = () => {
  return new Promise((resolve) => {
    rl.question("Enter your choice of grid number = ", (choice) => {
      return resolve(Number(choice));
    });
  });
};

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

const getUserGridChoice = async (store) => {
  const player = store.nextPlayerName();
  if (!store.singlePlayer) {
    console.log(`${player}'s turn:`);
  }
  while (true) {
    let grid = await promptForUserGridChoice();
    if (isValidUserGridChoice(store, grid) === true) {
      const log = store.singlePlayer
        ? `You chose ${grid}!`
        : `${player} chose ${grid}!`;
      console.log(log);
      return grid;
    }
  }
};

exports.promptForUserGridChoice = promptForUserGridChoice;
exports.isValidUserGridChoice = isValidUserGridChoice;
exports.getUserGridChoice = getUserGridChoice;
