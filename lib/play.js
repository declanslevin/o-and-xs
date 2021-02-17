const { getTeamChoice } = require("./chooseTeam");
const { getNumPlayersChoice } = require("./chooseNumPlayers");
const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const { Store } = require("./store");
const { HumanPlayer, CpuPlayer } = require("./player");
const rl = require("./rl");
// const { CpuPlayer, HumanPlayer } = require("./player");
// const { createWebSocketConnection } = require("../server/webSocket");

const playerTurn = async (store) => {
  const thisPlayer = store.nextPlayer;
  const choice = await store.players[thisPlayer].getGridChoice(store);
  store.setGridChoice(choice);
};

const makeTurn = async (store) => {
  const thisPlayer = store.nextPlayer;
  store.players[thisPlayer].logGrid(store);
  await playerTurn(store);
};

const randomTeams = () => {
  const player1 = Math.random() < 0.5 ? "O" : "X";
  const player2 = player1 === "O" ? "X" : "O";
  return [player1, player2];
};

const promptForGameModeChoice = () => {
  return new Promise((resolve) => {
    rl.question(
      "Select your game mode: \n  1) CPU \n  2) Local 2-Player \n  3) Online 2-Player\n",
      (choice) => {
        return resolve(Number(choice));
      }
    );
  });
};

const isValidGameChoice = (choice) => {
  if (choice === 1 || choice === 2 || choice === 3) {
    return true;
  } else {
    store.log("Please enter 1, 2 or 3");
    return false;
  }
};

const getGameModeChoice = async () => {
  while (true) {
    let choice = await promptForGameModeChoice();
    if (isValidGameChoice(choice)) {
      if (choice === 1) {
        return "cpu";
      } else if (choice === 2) {
        return "local";
      } else if (choice === 3) {
        return "online";
      }
    }
  }
};

const receiveGameModeChoice = async (player) => {
  return new Promise((resolve) => {
    player.ws.on("message", (message) => {
      let msg = JSON.parse(message);
      if (msg.type === "mode") {
        return resolve(msg.mode);
      }
    });
  });
};

const setGameMode = async (store, player) => {
  let mode;
  if (player.ws) {
    mode = await receiveGameModeChoice(player);
  } else {
    mode = await getGameModeChoice();
  }
  store.setMode(mode);
  const teams = randomTeams();
  if (mode === "cpu") {
    store.setPlayer(player, teams[0]);
    store.players[teams[0]].setName("You");
    store.setPlayer(new CpuPlayer(), teams[1]);
  } else if (mode === "local") {
    store.setPlayer(player, teams[0]);
    store.players[teams[0]].setName("Player 1");
    store.setPlayer(new HumanPlayer("Player 2"), teams[1]);
  } else if (mode === "online") {
    store.setPlayer(player, teams[0]);
    store.players[teams[0]].setName("Player 1");
    // await player 2 connection
  }
};

// const receiveGameSetupChoices = async (store) => {
//   return new Promise((resolve) => {
//     store.ws.on("message", (message) => {
//       let msg = JSON.parse(message);
//       if (msg.type === "prompt") {
//         return resolve([msg.players, msg.team]);
//       }
//     });
//   });
// };

// const gameSetup = async (store) => {
//   if (store.ws) {
//     const choices = await receiveGameSetupChoices(store);
//     store.setPlayers(choices[0], choices[1]);
//   } else {
//     const singlePlayer = await getNumPlayersChoice(store);
//     const teamChoice = await getTeamChoice(store);
//     store.setPlayers(singlePlayer, teamChoice);
//   }
// };

const gameSetup = async (store, player) => {
  if (player.ws) {
    const choices = await receiveGameSetupChoices(store);
    store.setPlayers(choices[0], choices[1]);
  } else {
    const singlePlayer = await getNumPlayersChoice(store);
    const teamChoice = await getTeamChoice(store);
    store.setPlayers(singlePlayer, teamChoice);
  }
};

// const play = async (store) => {
//   await gameSetup(store);
//   setPlayOrder(store, pickOrder());
//   while (!store.winner) {
//     const check = await checkForGameOver(store);
//     if (!check) {
//       await makeTurn(store);
//       store.setNextPlayer();
//     }
//   }
// };
const play = async (store, player) => {
  // await await gameSetup(store, player);
  await setGameMode(store, player);
  console.log(store);
  setPlayOrder(store, pickOrder());
  while (!store.winner) {
    const check = await checkForGameOver(store);
    if (!check) {
      await makeTurn(store);
      store.setNextPlayer();
    }
  }
};

// const runPlayLoop = async (ws) => {
//   let playAgainResult = true;
//   while (playAgainResult) {
//     const store = new Store(ws);
//     await play(store);

//     playAgainResult = await playAgain(store);
//     if (!playAgainResult) {
//       store.log("Thank you for playing!");
//       process.exit(0);
//     }
//   }
// };

const runPlayLoop = async (player) => {
  let playAgainResult = true;
  while (playAgainResult) {
    const store = new Store();
    await play(store, player);

    playAgainResult = await playAgain(store, player);
    if (!playAgainResult) {
      store.log("Thank you for playing!");
      return null;
      // process.exit(0);
    }
  }
};

// const store = new Store();
// const human = new HumanPlayer("You");
// const ws = createWebSocketConnection();
// human.setWebSocketUi(ws);
// store.players = {
//   O: human,
//   X: new CpuPlayer(),
// };
// const players = [new HumanPlayer("You").setWebSocketUi(ws)]
// store.

// players = {
//   O: HumanPlayer {
//     name: "You",
//     ui: {
//       type: "WebSocketUi",
//       ws: ws
//     }
//   },
//   X: CpuPlayer {
//     name: "CPU"
//   }
// }
// console.log(store);
// console.log(store.players.O);

exports.playerTurn = playerTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
