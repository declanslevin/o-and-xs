import { Player } from "./player";

const recievePlayAgainChoice = (player: Player): Promise<string> => {
  return new Promise((resolve) => {
    if (player.ws) {
      player.ws.on("message", (message: any) => {
        const msg = JSON.parse(message);
        if (msg.type === "playAgain") {
          return resolve(msg.val);
        }
      });
    }
  });
};

const isValidPlayAgainAnswer = (player: Player, answer: any) => {
  if (answer === "y" || answer === "yes" || answer === "n" || answer === "no") {
    return true;
  } else {
    player.log("Please enter one of the following: 'y', 'yes', 'n' or 'no'");
    return false;
  }
};

const playAgain = async (player: Player): Promise<boolean> => {
  while (true) {
    const answer = await recievePlayAgainChoice(player);
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
