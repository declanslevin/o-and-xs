const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  const player = order < 0.5 ? "player1" : "player2";
  store.nextPlayer = player;
  const name = store.nextPlayerName();
  const log =
    name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
  console.log(log);
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
