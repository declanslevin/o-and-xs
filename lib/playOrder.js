const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  if (store.numPlayers === 1) {
    if (order < 0.5) {
      store.setNextPlayer("user");
      console.log("You get to go first!");
    } else {
      store.setNextPlayer("cpu");
      console.log("CPU goes first.");
    }
  } else {
    if (order < 0.5) {
      store.setNextPlayer("player1");
      console.log("Player 1 gets to go first!");
    } else {
      store.setNextPlayer("player2");
      console.log("Player 2 gets to go first!");
    }
  }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
