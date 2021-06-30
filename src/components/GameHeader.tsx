import React from "react";

const GameHeader = () => {
  return (
    <>
      <div className="game-header">
        <h2 className="game-header-your-player" id="your-player">
          Your Player Name
        </h2>
        <h2 className="game-header-your-team" id="your-team">
          Your Team
        </h2>
      </div>
      <div className="game-header">
        <h2 className="game-header-player" id="current-player">
          Current Player
        </h2>
        <h2 className="game-header-team" id="current-team">
          Team
        </h2>
      </div>
      <div className="game-grid-wrapper"></div>
    </>
  );
};

export default GameHeader;
