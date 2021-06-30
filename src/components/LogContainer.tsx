import React from "react";

const LogContainer = () => {
  return (
    <div className="log-wrapper">
      <div className="log">
        <h2 className="log-header">Game Logs</h2>
        <div className="log-text-container" id="log-container">
          <p className="log-text" id="logs">
            Logs appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogContainer;
