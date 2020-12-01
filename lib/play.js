const { chooseOX, chooseUserGrid, chooseCpuGrid } = require("./choices");
const { pickOrder, playOrder } = require("./playOrder");

const play = async (store) => {
  await chooseOX(store);
  playOrder(store, pickOrder());
  while (store.winner === false) {
    if (store.firstPlayer === "user") {
      await chooseUserGrid(store);
      if (store.winner === false) {
        chooseCpuGrid(store);
      }
    } else {
      chooseCpuGrid(store);
      if (store.winner === false) {
        await chooseUserGrid(store);
      }
    }
  }
};

module.exports = play;
