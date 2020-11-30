const { chooseOX, chooseUserGrid, chooseCpuGrid } = require("./choices.js");
const playOrder = require("./playOrder.js");

const play = async (store) => {
  await chooseOX(store);
  playOrder(store);
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
