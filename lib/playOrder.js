const playOrder = (store) => {
  let order = Math.random();
  if (order < 0.5) {
    store.firstPlayer = "user";
    console.log("You get to go first!");
  } else {
    store.firstPlayer = "cpu";
    console.log("CPU goes first.");
  }
};

module.exports = playOrder;
