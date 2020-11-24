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
  choices: [],
};

console.log(store);

const logGrid = () => {
  console.log("");
  console.log(" --- --- ---");
  console.log(`| ${store.grid[1]} | ${store.grid[2]} | ${store.grid[3]} |`);
  console.log(" --- --- ---");
  console.log(`| ${store.grid[4]} | ${store.grid[5]} | ${store.grid[6]} |`);
  console.log(" --- --- ---");
  console.log(`| ${store.grid[7]} | ${store.grid[8]} | ${store.grid[9]} |`);
  console.log(" --- --- ---");
  console.log("");
};

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Validate choice is a string of "O" or "X"
const chooseOX = () => {
  return new Promise((resolve, reject) => {
    rl.question("Choose O or X = ", (choice) => {
      store.userTeam = choice;
      if (choice === "O") {
        store.cpuTeam = "X";
      } else {
        store.cpuTeam = "O";
      }
      console.log(store);
      resolve();
    });
  });
};

// Validate user isn't choosing an existing choice
const acceptUserGrid = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter grid choice = ", (grid) => {
      store.grid[grid] = store.userTeam;
      store.choices.push(grid);
      console.log(`You chose ${grid}!`);
      logGrid();
      resolve();
    });
  });
};

// Need to check that it correctly doesn't overwrite user choice
// Else arg can overwrite currently
const chooseCpuGrid = () => {
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
  logGrid();
};

const checkWin = () => {
  let win = false;
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
      win = true;
      if (result.split("")[0] === store.userTeam) {
        console.log("You won!");
      } else {
        console.log("CPU won!");
      }
    }
  });
  return win;
};

const play = async () => {
  logGrid();
  await chooseOX();
  rl.pause();
  while (checkWin() === false) {
    rl.resume();
    await acceptUserGrid();
    rl.pause();
    checkWin();
    chooseCpuGrid();
  }
  rl.close();
};

play();
