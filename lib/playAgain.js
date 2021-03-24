const rl = require("./rl");

const promptForPlayAgain = () => {
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      return resolve(answer.toLowerCase());
    });
  });
};

const recievePlayAgainChoice = (player) => {
  return new Promise((resolve) => {
    player.ws.on("message", (message) => {
      let msg = JSON.parse(message);
      if (msg.type === "playAgain") {
        return resolve(msg.val);
      }
    });
  });
};

const isValidPlayAgainAnswer = (player, answer) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    player.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async (player) => {
  while (true) {
    let answer = player.ws
      ? await recievePlayAgainChoice(player)
      : await promptForPlayAgain();
    if (isValidPlayAgainAnswer(player, answer)) {
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
