const rl = require("./rl");

const promptForPlayAgain = () => {
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      return resolve(answer.toLowerCase());
    });
  });
};

const recievePlayAgainChoice = (game) => {
  return new Promise((resolve) => {
    game.ws.on("message", (message) => {
      let msg = JSON.parse(message);
      if (msg.type === "playAgain") {
        return resolve(msg.val);
      }
    });
  });
};

const isValidPlayAgainAnswer = (game, answer) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    game.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async (game) => {
  while (true) {
    let answer = game.ws
      ? await recievePlayAgainChoice(game)
      : await promptForPlayAgain();
    if (isValidPlayAgainAnswer(game, answer)) {
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
