const recievePlayAgainChoice = (player: any) => {
  return new Promise((resolve) => {
    player.ws.on("message", (message: any) => {
      let msg = JSON.parse(message);
      if (msg.type === "playAgain") {
        return resolve(msg.val);
      }
    });
  });
};

const isValidPlayAgainAnswer = (player: any, answer: any) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    player.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async (player: any) => {
  while (true) {
    let answer = await recievePlayAgainChoice(player);
    if (isValidPlayAgainAnswer(player, answer)) {
      if (answer === "y" || answer === "yes") {
        return true;
      } else {
        return false;
      }
    }
  }
};

export { isValidPlayAgainAnswer, playAgain };
