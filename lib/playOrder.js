const pickOrder = () => Math.random();

const setPlayOrder = (store, order) => {
  if (order < 0.5) {
    store.setNextPlayer("user");
    console.log("You get to go first!");
  } else {
    store.setNextPlayer("cpu");
    console.log("CPU goes first.");
  }
};

exports.pickOrder = pickOrder;
exports.setPlayOrder = setPlayOrder;
