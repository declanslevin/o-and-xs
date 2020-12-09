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


const getUserGridChoice = () => {
  return new Promise((resolve) => {
    rl.question("Enter your choice of grid number = ", (choice) => {
      return resolve(Number(choice));
    })
  })
}

const getValidUserGridChoice = store, choice => {
  if (isNaN(choice) || choice < 1 || choice > 9 || )
}

const chooseUserGrid = (store) => {
  return new Promise((resolve) => {
    logGrid(store);
    rl.question("Enter your choice of grid number = ", (grid) => {
      let val = Number(grid);
      // decompose and test
      // return true or false
      if (isNaN(val) || val < 1 || val > 9 || store.choices.includes(val)) {
        console.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return resolve(chooseUserGrid(store));
      } else {
        // updateStore(store, val)
        store.grid[val] = store.userTeam;
        store.choices.push(val);
        console.log(`You chose ${val}!`);
        checkWin(store);
        return resolve();
      }
    });
  });
};

const chooseCpuGrid = (store) => {
  logGrid(store);
  let x = false;
  while (x === false) {
    let choice = Math.floor(Math.random() * 8 + 1);
    if (store.choices.includes(choice)) {
      choice = Math.floor(Math.random() * 8 + 1);
    } else {
      store.grid[choice] = store.cpuTeam;
      store.choices.push(choice);
      console.log(`CPU chose ${choice}!`);
      x = true;
    }
  }
  checkWin(store);
};

exports.getTeamChoice = getTeamChoice;
exports.getValidTeamChoice = getValidTeamChoice;
exports.setTeam = setTeam;
exports.storeTeamChoice = storeTeamChoice;

exports.chooseUserGrid = chooseUserGrid;
exports.chooseCpuGrid = chooseCpuGrid;
