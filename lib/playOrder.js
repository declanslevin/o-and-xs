const pickOrder = () => Math.random();

const setPlayOrder = (game, order) => {
  const player = order < 0.5 ? "X" : "O";
  game.setNextPlayer(player);
  // game.players[game.nextPlayer]._sendNextPlayerToBrowser(
  //   game.players[game.nextPlayer].getTeam(game)
  // );
  const name = game.getPlayerName(player);
  const log =
    name === "You" ? `${name} get to go first!` : `${name} gets to go first!`;
  game.log(log);
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
