const rl = require("./rl");

const promptForPlayAgain = () => {
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      return resolve(answer.toLowerCase());
    });
  });
};

const isValidPlayAgainAnswer = (answer) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    console.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async () => {
  while (true) {
    let prompt = await promptForPlayAgain();
    if (isValidPlayAgainAnswer(prompt)) {
      if (prompt === "y" || prompt === "yes") {
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
