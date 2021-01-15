const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  const player = order < 0.5 ? "player1" : "player2";
  store.nextPlayer = player;
  // const name = eval("store." + player + ".name"); // Apparently this is a bad idea security wise?
  const name = player === "player1" ? store.player1.name : store.player2.name;
  const log =
    store.player1.name === "You"
      ? `${name} get to go first!`
      : `${name} gets to go first!`;
  console.log(log);
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
