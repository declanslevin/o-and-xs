const addStoreMethods = (store) => {
  store.setTeamChoice = (choice) => {
    this.userTeam = choice;
    if (choice === "O") {
      this.cpuTeam = "X";
    } else {
      this.cpuTeam = "O";
    }
  };
  store.setUserGridChoice = (choice) => {
    this.grid[choice] = this.userTeam;
    this.choices.push(choice);
  };
  store.setCpuGridChoice = (choice) => {
    this.grid[choice] = this.cpuTeam;
    this.choices.push(choice);
  };
  store.setWinner = (player) => {
    this.winner = player;
  };
  store.reset = () => {
    this.grid = {
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
    this.userTeam = null;
    this.cpuTeam = null;
    this.nextPlayer = null;
    this.choices = [];
    this.winner = false;
  };
};

module.exports = addStoreMethods;
