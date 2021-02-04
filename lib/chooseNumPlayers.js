const rl = require("./rl");

const promptForNumPlayersChoice = () => {
  return new Promise((resolve) => {
    rl.question("Set the number of human players. 1 or 2? = ", (choice) => {
      return resolve(Number(choice));
    });
  });
};

const isValidNumPlayersChoice = (store, choice) => {
  if (choice === 1 || choice === 2) {
    return true;
  } else {
    store.log(
      "Please enter 1 to play against CPU or 2 to play against another person"
    );
    return false;
  }
};

const getNumPlayersChoice = async (store) => {
  while (true) {
    let num = await promptForNumPlayersChoice();
    if (isValidNumPlayersChoice(store, num)) {
      return num === 1 ? true : false;
    }
  }
};

const isSinglePlayer = (store) => {
  console.log(store);
  return !store.players.O.isHuman || !store.players.X.isHuman ? true : false;
};

exports.promptForNumPlayersChoice = promptForNumPlayersChoice;
exports.isValidNumPlayersChoice = isValidNumPlayersChoice;
exports.getNumPlayersChoice = getNumPlayersChoice;
exports.isSinglePlayer = isSinglePlayer;
