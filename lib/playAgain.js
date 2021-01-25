const rl = require("./rl");

const promptForPlayAgain = () => {
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      return resolve(answer.toLowerCase());
    });
  });
};

const isValidPlayAgainAnswer = (store, answer) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    store.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async (store) => {
  while (true) {
    let answer = await promptForPlayAgain();
    if (isValidPlayAgainAnswer(store, answer)) {
      if (answer === "y" || answer === "yes") {
        return true;
      } else {
        return false;
      }
    }
  }
};

exports.promptForPlayAgain = promptForPlayAgain;
exports.isValidPlayAgainAnswer = isValidPlayAgainAnswer;
exports.playAgain = playAgain;
