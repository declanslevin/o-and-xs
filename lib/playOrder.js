const { setNextPlayer } = require("./store");
const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  if (order < 0.5) {
    setNextPlayer(store, "user");
    console.log("You get to go first!");
  } else {
    setNextPlayer(store, "cpu");
    console.log("CPU goes first.");
  }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
