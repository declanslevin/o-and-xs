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

exports.promptForUserGridChoice = promptForUserGridChoice;
exports.isValidUserGridChoice = isValidUserGridChoice;
exports.getUserGridChoice = getUserGridChoice;
