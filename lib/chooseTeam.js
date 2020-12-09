const rl = require("./rl");
const logGrid = require("./logGrid");
const checkWin = require("./checkWin");

const getTeamChoice = () => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      return resolve(choice.toUpperCase());
    });
  });
};

const getValidTeamChoice = (choice) => {
  if (choice === "O" || choice === "X") {
    return true;
  } else {
    return false;
  }
};

const setTeam = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};

const storeTeamChoice = async (store) => {
  let choice = await getTeamChoice();
  if (getValidTeamChoice(choice) === true) {
    setTeam(store, choice);
  } else {
    console.log("Please enter only the letter O or X to choose your team");
    return storeTeamChoice(store);
  }
};

exports.getTeamChoice = getTeamChoice;
exports.getValidTeamChoice = getValidTeamChoice;
exports.setTeam = setTeam;
exports.storeTeamChoice = storeTeamChoice;
