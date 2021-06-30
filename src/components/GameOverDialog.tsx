import React from "react";

const GameOverDialog = () => {
  return (
    <div className="game-over hidden" id="game-over">
      <h2 className="game-over-header">GAME OVER</h2>
      <h3 className="game-over-winner" id="game-winner">
        Someone won!
      </h3>
      <button type="button" id="js-play-again">
        Play Again?
      </button>
    </div>
  );
};

export default GameOverDialog;
