const pickOrder = () => Math.random();

const setPlayOrder = async (store, order) => {
  const player = order < 0.5 ? "player1" : "player2";
  store.nextPlayer = player;
  const name = store.nextPlayerName();
  const log =
    name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
  store.log(log);
  if (store.ws) {
    await store.sendNextPlayerToBrowser();
    await store.sendNextPlayerTeamToBrowser();
  }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
