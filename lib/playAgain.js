const rl = require("./rl");

const playAgain = (store) => {
  // This import is a hack to avoid a circular import
  const play = require("./play");
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      let val = answer.toLowerCase();
      if (val === "y" || val === "yes") {
        store = {
          grid: {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
          },
          userTeam: null,
          cpuTeam: null,
          firstPlayer: null,
          choices: [],
          winner: false,
        };
        return resolve(play(store));
      } else if (val === "n" || val === "no") {
        process.exit();
      } else {
        console.log(
          "Please enter one of the following 'y', 'yes', 'n' or 'no'"
        );
        return resolve(playAgain(store));
      }
    });
  });
};

module.exports = playAgain;
