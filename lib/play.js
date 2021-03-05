const { checkForGameOver } = require("./checkWin");
const { pickOrder, setPlayOrder } = require("./playOrder");
const { playAgain } = require("./playAgain");
const { Game } = require("./game");
const { HumanPlayer, CpuPlayer } = require("./player");
const rl = require("./rl");
// const { newWebSocket } = require("../server/newPlayer");

const playerTurn = async (game, player) => {
  const choice = await player.getGridChoice(game);
  player.setGridChoice(game, choice);
};

const makeTurn = async (game) => {
  const player = game.players[game.nextPlayer];
  player.log({ type: "test", foo: "foo" });
  player.logGrid(game);
  await playerTurn(game, player);
  player.setNextPlayer(game);
};

const randomTeams = () => {
  const player1 = Math.random() < 0.5 ? "O" : "X";
  const player2 = player1 === "O" ? "X" : "O";
  return [player1, player2];
};

// // Add validation later
// const promptForPlayerName = () => {
//   return new Promise((resolve) => {
//     rl.question("What's your name?", (name) => {
//       return resolve(name.toUpperCase());
//     });
//   });
// };

// const recievePlayerName = async (player) => {
//   return new Promise((resolve) => {
//     player.ws.on("message", (message) => {
//       let msg = JSON.parse(message);
//       if (msg.type === "name") {
//         return resolve(msg.name);
//       }
//     });
//   });
// };

// const getPlayerName = async (player) => {
//   return player.ws
//     ? await recievePlayerName(player)
//     : await promptForPlayerName();
// };

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
    // Change this to a player/game log, if possible?
    console.log("Please enter 1, 2 or 3");
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

// const setGameMode = async (game, player) => {
//   let mode;
//   if (player.ws) {
//     mode = await receiveGameModeChoice(player);
//   } else {
//     mode = await getGameModeChoice();
//   }
//   game.setMode(mode);
// };

const getGameMode = async (player) => {
  return player.ws
    ? await receiveGameModeChoice(player)
    : await getGameModeChoice();
};

const createPlayerArray = async (lobby, mode, player) => {
  if (mode === "cpu") {
    player.setName("You");
    return [player, new CpuPlayer()];
  } else if (mode === "local") {
    player.setName("Player 1");
    return [player, new HumanPlayer("Player 2")];
  } else if (mode === "online") {
    return await lobby.matchWithWaitingPlayer(player);
  }
};

const assignPlayers = async (game, players) => {
  const teams = randomTeams();
  game.setPlayer(players[0], teams[0]);
  game.setPlayer(players[1], teams[1]);
};

const play = async (game, players, lobby) => {
  // await setGameMode(game, player);
  await assignPlayers(game, players);
  setPlayOrder(game, pickOrder());
  console.log(lobby);
  while (!game.winner) {
    const check = await checkForGameOver(game);
    if (!check) {
      await makeTurn(game);
      console.log(game);
    }
  }
};

const runPlayLoop = async (lobby, player) => {
  console.log("Starting runPlayLoop");
  let playAgainResult = true;
  while (playAgainResult) {
    const mode = await getGameMode(player);
    console.log("mode = " + mode);
    let players;
    if (mode === "online") {
      // const name = await getPlayerName(player);
      // player.setName(name);
      // await newWebSocket(player);
      // console.log("1 --------------");
      // console.log(lobby);
      lobby.addAsWaitingPlayer(player);
      // console.log("2 --------------");
      // console.log(lobby);
      players = await lobby.waitForOpponent(player);
      // console.log("3 --------------");
      // console.log(lobby);
    }
    // const players = await createPlayerArray(lobby, mode, player);
    // console.log("4 --------------");
    // console.log(lobby);
    // console.log(players);
    const game = new Game();
    lobby.addGame(game);
    console.log("5 --------------");
    console.log(lobby);
    console.log("players = ");
    console.log(players);
    await play(game, players, lobby);

    playAgainResult = await playAgain(game, player);
    if (!playAgainResult) {
      game.log("Thank you for playing!");
      return null;
      // process.exit(0);
    }
  }
};

// const runPlayLoop = async (player) => {
//   let playAgainResult = true;
//   while (playAgainResult) {
//     const game = new Game();
//     await play(game, player);

//     playAgainResult = await playAgain(game, player);
//     if (!playAgainResult) {
//       game.log("Thank you for playing!");
//       return null;
//       // process.exit(0);
//     }
//   }
// };

exports.playerTurn = playerTurn;
exports.play = play;
exports.runPlayLoop = runPlayLoop;
