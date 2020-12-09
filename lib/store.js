const setTeam = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};

const setUserGridChoice = (store, val) => {
  store.grid[val] = store.userTeam;
  store.choices.push(val);
};

exports.setTeam = setTeam;
exports.setUserGridChoice = setUserGridChoice;
