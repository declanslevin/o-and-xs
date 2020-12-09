const setTeamChoice = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};

const setUserGridChoice = (store, choice) => {
  store.grid[choice] = store.userTeam;
  store.choices.push(choice);
};

const setCpuGridChoice = (store, choice) => {
  store.grid[choice] = store.cpuTeam;
  store.choices.push(choice);
};

exports.setTeamChoice = setTeamChoice;
exports.setUserGridChoice = setUserGridChoice;
exports.setCpuGridChoice = setCpuGridChoice;
