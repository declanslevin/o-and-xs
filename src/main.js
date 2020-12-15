// TODO
//--------
//// 1. Add 'play again?' option - DONE
// 2. Randomise turn order / add option to decide
// 3. Add ability to play 2 player
// 4. Make CPU smarter? Add difficulty levels (Impossible/Normal/Stupid)?

const play = require("../lib/play.js");

const store = {
  grid: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  },
  userTeam: null,
  cpuTeam: null,
  firstPlayer: null,
  choices: [],
  winner: false,
};

const storeTest = {
  grid: {
    1: "X",
    2: "O",
    3: "X",
    4: "O",
    5: 5,
    6: "O",
    7: "X",
    8: "O",
    9: "X",
  },
  userTeam: null,
  cpuTeam: null,
  firstPlayer: null,
  choices: [],
  winner: false,
};

play(store);
// play(storeTest);
