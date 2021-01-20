const rl = require("./rl");

const promptForTeamChoice = (store) => {
  const question = store.singlePlayer
    ? "Pick your team. O or X? = "
    : "Player 1, pick your team. O or X? = ";
  return new Promise((resolve) => {
    rl.question(question, (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

const isValidTeamChoice = (store, choice) => {
  if (choice === "O" || choice === "X") {
    return true;
  } else {
    store.log("Please enter only the letter O or X to choose your team");
    return false;
  }
};

const getTeamChoice = async (store) => {
  while (true) {
    let team = await promptForTeamChoice(store);
    if (isValidTeamChoice(store, team)) {
      return team;
    }
  }
};

exports.promptForTeamChoice = promptForTeamChoice;
exports.isValidTeamChoice = isValidTeamChoice;
exports.getTeamChoice = getTeamChoice;
