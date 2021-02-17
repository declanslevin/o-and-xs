// const promptForPlayerOptions = () => {
//   return new Promise((resolve) => {
//     rl.question(
//       "How would you like to play? \n1) Local vs CPU \n2) Local 2-player \n3) Online vs CPU \n4) Online 2-player",
//       (choice) => {
//         return resolve(Number(choice));
//       }
//     );
//   });
// };

// const isValidPlayerOptionsChoice = (store, choice) => {
//   if (choice === 1 || choice === 2 || choice === 3) {
//     return true;
//   } else {
//     store.log("Please enter 1, 2 or 3");
//     return false;
//   }
// };

// const getPlayerOptionsChoice = async () => {
//   while (true) {
//     let choice = await promptForPlayerOptions();
//     if (isValidPlayerOptionsChoice(store, choice)) {
//       return choice;
//     }
//   }
// };

// const playerSetup = async () => {
//   const playerChoice = await getPlayerOptionsChoice()
//   if (playerChoice === 1) {
//     return [new HumanPlayer("You"), new CpuPlayer()];
//   } else if (playerChoice === 2) {
//     return [new HumanPlayer("Player 1"), new HumanPlayer("Player 2")];
//   } else if (playerChoice === 3) {
//     return [new HumanPlayer("Player 1", ws), new HumanPlayer("Player 2", ws)];
//   }
// };
