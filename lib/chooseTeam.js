const rl = require("./rl");

const promptForTeamChoice = (game) => {
  const question = game.singlePlayer
    ? "Pick your team. O or X? = "
    : "Player 1, pick your team. O or X? = ";
  return new Promise((resolve) => {
    rl.question(question, (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

const isValidTeamChoice = (game, choice) => {
  if (choice === "O" || choice === "X") {
    return true;
  } else {
    game.log("Please enter only the letter O or X to choose your team");
    return false;
  }
};

const getTeamChoice = async (game) => {
  while (true) {
    let team = await promptForTeamChoice(game);
    if (isValidTeamChoice(game, team)) {
      return team;
    }
  }
};

exports.promptForTeamChoice = promptForTeamChoice;
exports.isValidTeamChoice = isValidTeamChoice;
exports.getTeamChoice = getTeamChoice;
