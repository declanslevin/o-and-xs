// TODO
// --------
/// / 1. Add 'play again?' option - DONE
// 2. Randomise turn order / add option to decide
// 3. Add ability to play 2 player
// 4. Make CPU smarter? Add difficulty levels (Impossible/Normal/Stupid)?

const { runPlayLoop } = require("../lib/play");
const { HumanPlayer } = require("../lib/player");
const { Lobby } = require("../lib/lobby");

const lobby = new Lobby();
const player = new HumanPlayer();

runPlayLoop(lobby, player);

// Launched from Console
// Prompt for vs CPU / Local 2 Player / Online 2 Player
// vs CPU:
// No websocket
// Local 2 Player:
// No websocket
// Online 2 Player:
// Create WebSocket
// Connect to Server

// Launched from Browser
// Options for vs CPU / Local 2 Player / Online 2 Player
// vs CPU:
// Create WebSocket
// Connect to Server
// Local 2 Player:
// Create WebSocket
// Connect to Server
// Online 2 Player:
// Create WebSocket

// Online 2 Player:
// Start Server, create Game
// Create HumanPlayer with WebSocket
// Set name to Player 1, add to Game
// Create HumanPlayer with WebSocket
// Set name to Player 2, add to Game
// Server communicates back that both players have connected
// Whoever got Player 1 gets to pick team
// Player 2 gets message "waiting for player 1 to choose their team"
// Player 1 makes team choice
// Player 1 clicks ready to play
// Player 2 gets message "Player 1 chose team"
// Player 2 clicks ready to play
// Game starts
// PlayOrder determined
// nextPlayer takes turn
