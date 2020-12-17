// TODO
//--------
//// 1. Add 'play again?' option - DONE
// 2. Randomise turn order / add option to decide
// 3. Add ability to play 2 player
// 4. Make CPU smarter? Add difficulty levels (Impossible/Normal/Stupid)?

const { store } = require("../lib/store");
const { play } = require("../lib/play");

// const store = {
//   grid: {
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5,
//     6: 6,
//     7: 7,
//     8: 8,
//     9: 9,
//   },
//   userTeam: null,
//   cpuTeam: null,
//   nextPlayer: null,
//   choices: [],
//   winner: false,
// };

play(store);
