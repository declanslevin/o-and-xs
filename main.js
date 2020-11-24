const { StringDecoder } = require("string_decoder");

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

const play = async () => {
  logGrid();
  await chooseOX();
  await acceptUserGrid();
  rl.close();
  chooseCpuGrid();
};

play();
