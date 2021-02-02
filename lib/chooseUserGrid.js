const rl = require("./rl");

const promptForUserGridChoice = () => {
  return new Promise((resolve) => {
    rl.question("Enter your choice of grid number = ", (choice) => {
      return resolve(Number(choice));
    });
  });
};

const recieveUserGridChoice = async (store) => {
  let promptObj = {
    type: "prompt",
    prompt: "Choose a grid number:",
  };
  store.ws.send(JSON.stringify(promptObj));
  return new Promise((resolve) => {
    store.ws.on("message", (message) => {
      let gridObj = JSON.parse(message);
      if (gridObj.type === "grid") {
        return resolve(gridObj.grid);
      }
    });
  });
};

const isValidUserGridChoice = (store, choice) => {
  if (
    isNaN(choice) ||
    choice < 1 ||
    choice > 9 ||
    store.choices.includes(choice)
  ) {
    store.log(
      "Please enter a valid grid number. Make sure it hasn't already been picked!"
    );
    return false;
  } else {
    return true;
  }
};

const getUserGridChoice = async (store) => {
  const player = store.nextPlayerName();
  if (!store.singlePlayer) {
    store.log(`${player}'s turn:`);
  }
  while (true) {
    let grid = store.ws
      ? await recieveUserGridChoice(store)
      : await promptForUserGridChoice();
    if (isValidUserGridChoice(store, grid) === true) {
      const log = store.singlePlayer
        ? `You chose ${grid}!`
        : `${player} chose ${grid}!`;
      store.log(log);
      return grid;
    }
  }
};

exports.promptForUserGridChoice = promptForUserGridChoice;
exports.isValidUserGridChoice = isValidUserGridChoice;
exports.getUserGridChoice = getUserGridChoice;
