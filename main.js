// TODO
//--------
//// 1. Add 'play again?' option - DONE
// 2. Randomise turn order / add option to decide
// 3. Add ability to play 2 player
// 4. Make CPU smarter? Add difficulty levels (Impossible/Normal/Stupid)?

let store = {
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

const logGrid = () => {
  console.log(
    `
     --- --- ---
    | ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |
     --- --- ---
    | ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |
     --- --- ---
    | ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |
     --- --- ---
    `
  );
};

const playOrder = () => {
  let order = Math.random();
  if (order < 0.5) {
    store.firstPlayer = "user";
    console.log("You get to go first!");
  } else {
    store.firstPlayer = "cpu";
    console.log("CPU goes first.");
  }
};

const playAgain = () => {
  return new Promise((resolve) => {
    rl.question("Play again? (y/n) = ", (answer) => {
      let val = answer.toLowerCase();
      if (val === "y" || val === "yes") {
        store = {
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
        return resolve(play());
      } else if (val === "n" || val === "no") {
        process.exit();
      } else {
        console.log(
          "Please enter one of the following 'y', 'yes', 'n' or 'no'"
        );
        return resolve(playAgain());
      }
    });
  });
};

const checkWin = () => {
  return new Promise((resolve) => {
    let gridArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    gridArray.map((array) => {
      let result = array
        .map((ref) => {
          return store.grid[ref];
        })
        .join("");
      if (result === "XXX" || result === "OOO") {
        store.winner = true;
        if (result.split("")[0] === store.userTeam) {
          logGrid();
          console.log("You won!");
          return resolve(playAgain());
        } else {
          logGrid();
          console.log("CPU won!");
          return resolve(playAgain());
        }
      }
      if (store.choices.length === 9) {
        store.winner = true;
        logGrid();
        console.log("You drew!");
        return resolve(playAgain());
      }
    });
  });
};

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chooseOX = () => {
  return new Promise((resolve) => {
    rl.question("Pick your team. O or X? = ", (choice) => {
      let val = choice.toUpperCase();
      if (val === "O" || val === "X") {
        store.userTeam = val;
        if (val === "O") {
          store.cpuTeam = "X";
        } else {
          store.cpuTeam = "O";
        }
        return resolve();
      } else {
        console.log("Please enter only the letter O or X to choose your team");
        return resolve(chooseOX());
      }
    });
  });
};

const chooseUserGrid = () => {
  return new Promise((resolve) => {
    logGrid();
    rl.question("Enter your choice of grid number = ", (grid) => {
      let val = Number(grid);
      if (isNaN(val) || val < 1 || val > 9 || store.choices.includes(val)) {
        console.log(
          "Please enter a valid grid number. Make sure it hasn't already been picked!"
        );
        return resolve(chooseUserGrid());
      } else {
        store.grid[val] = store.userTeam;
        store.choices.push(val);
        console.log(`You chose ${val}!`);
        checkWin();
        return resolve();
      }
    });
  });
};

const chooseCpuGrid = () => {
  logGrid();
  let x = false;
  while (x === false) {
    let choice = Math.floor(Math.random() * 8 + 1);
    if (store.choices.includes(choice)) {
      choice = Math.floor(Math.random() * 8 + 1);
    } else {
      store.grid[choice] = store.cpuTeam;
      store.choices.push(choice);

      console.log(`CPU chose ${choice}!`);

      x = true;
    }
  }
  checkWin();
};

const play = async () => {
  await chooseOX();
  playOrder();
  while (store.winner === false) {
    if (store.firstPlayer === "user") {
      await chooseUserGrid();
      if (store.winner === false) {
        chooseCpuGrid();
      }
    } else {
      chooseCpuGrid();
      if (store.winner === false) {
        await chooseUserGrid();
      }
    }
  }
};

play();
