const setTeam = (store, choice) => {
  store.userTeam = choice;
  if (choice === "O") {
    store.cpuTeam = "X";
  } else {
    store.cpuTeam = "O";
  }
};
