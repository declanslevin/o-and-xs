const rl = require("./rl");

const promptForTeamChoice = () => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

const isValidTeamChoice = (choice) => {
  if (choice === "O" || choice === "X") {
    return true;
  } else {
    console.log("Please enter only the letter O or X to choose your team");
    return false;
  }
};

const getTeamChoice = async () => {
  while (true) {
    let team = await promptForTeamChoice();
    if (isValidTeamChoice(team) === true) {
      return team;
    }
  }
};

exports.promptForTeamChoice = promptForTeamChoice;
exports.isValidTeamChoice = isValidTeamChoice;
exports.getTeamChoice = getTeamChoice;
