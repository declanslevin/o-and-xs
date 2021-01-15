const rl = require("./rl");

const promptForNumPlayersChoice = () => {
  return new Promise((resolve) => {
    rl.question("Set the number of human players. 1 or 2? = ", (choice) => {
      return resolve(Number(choice));
    });
  });
};

const isValidNumPlayersChoice = (choice) => {
  if (choice === 1 || choice === 2) {
    return true;
  } else {
    console.log(
      "Please enter 1 to play against CPU or 2 to play against another person"
    );
    return false;
  }
};

const getNumPlayersChoice = async () => {
  while (true) {
    let num = await promptForNumPlayersChoice();
    if (isValidNumPlayersChoice(num)) {
      return num;
    }
  }
};

exports.promptForNumPlayersChoice = promptForNumPlayersChoice;
exports.isValidNumPlayersChoice = isValidNumPlayersChoice;
exports.getNumPlayersChoice = getNumPlayersChoice;
