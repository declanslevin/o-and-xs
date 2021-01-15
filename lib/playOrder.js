const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  if (store.numPlayers === 1) {
    store.nextPlayer = order < 0.5 ? "user" : "cpu";
    const message =
      store.nextPlayer === "user" ? "You get to go first!" : "CPU goes first.";
    console.log(message);
  } else {
    store.nextPlayer = order < 0.5 ? "player1" : "player2";
    const player = store.nextPlayer === "player1" ? "Player 1" : "Player 2";
    console.log(`${player} gets to go first!`);
  }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
