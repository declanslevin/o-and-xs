const pickOrder = () => Math.random();

const playOrder = (store, order) => {
  if (order < 0.5) {
    store.firstPlayer = "user";
    console.log("You get to go first!");
  } else {
    store.firstPlayer = "cpu";
    console.log("CPU goes first.");
  }
};

exports.pickOrder = pickOrder;
exports.playOrder = playOrder;
