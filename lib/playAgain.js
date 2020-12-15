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
    console.log("Please enter one of the following 'y', 'yes', 'n' or 'no'");
  }
};

// TODO: Move this to store.js
// const resetStore = (store) => {
//   return (store = {
//     grid: {
//       1: 1,
//       2: 2,
//       3: 3,
//       4: 4,
//       5: 5,
//       6: 6,
//       7: 7,
//       8: 8,
//       9: 9,
//     },
//     userTeam: null,
//     cpuTeam: null,
//     firstPlayer: null,
//     choices: [],
//     winner: false,
//   });
// };

const resetStore = (store) => {
  store.grid = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };
  store.userTeam = null;
  store.cpuTeam = null;
  store.firstPlayer = null;
  store.choices = [];
  store.winner = false;
};

const playAgain = async (store) => {
  const play = require("./play");
  while (true) {
    let prompt = await promptForPlayAgain();
    if (isValidPlayAgainAnswer(prompt)) {
      if (prompt === "y" || prompt === "yes") {
        resetStore(store);
        return await play(store);
      } else {
        console.log("Thank you for playing!");
        process.exit();
      }
    }
  }
};

exports.promptForPlayAgain = promptForPlayAgain;
exports.isValidPlayAgainAnswer = isValidPlayAgainAnswer;
exports.resetStore = resetStore;
exports.playAgain = playAgain;
