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

exports.isValidTeamChoice = isValidTeamChoice;
exports.getTeamChoice = getTeamChoice;
