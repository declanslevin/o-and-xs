const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  const player = order < 0.5 ? "X" : "O";
  store.setNextPlayer(player);
  const name = store.getPlayerName(player);
  const log =
    name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
  store.log(log);
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
