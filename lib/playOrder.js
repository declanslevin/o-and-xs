const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  const player = order < 0.5 ? "player1" : "player2";
  store.setNextPlayer(player);
  const name = store.nextPlayerName();
  const log =
    name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
  store.log(log);
  // await store.setNextPlayer()
  // if (store.ws) {
  //   await store.sendNextPlayerToBrowser();
  //   await store.sendNextPlayerTeamToBrowser();
  // }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
