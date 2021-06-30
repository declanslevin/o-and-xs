import React from "react";

const ModeDialog = () => {
  return (
    <div className="react-prompts" id="prompts">
      <form className="react-prompts-form">
        <div className="react-prompts-wrapper">
          <section className="react-prompts-mode">
            <h2 className="react-prompts-mode-header">Game mode</h2>
            <div className="react-prompts-wrapper-inner">
              <label htmlFor="cpu" className="react-prompts-radio-label">
                CPU
              </label>
              <input
                name="mode"
                type="radio"
                className="react-prompts-radio mode"
                id="mode-cpu"
                value="mode-cpu"
                checked
              />

              <label htmlFor="local" className="react-prompts-radio-label">
                Local 2-Player
              </label>
              <input
                name="mode"
                type="radio"
                className="react-prompts-radio mode"
                id="mode-local"
                value="mode-local"
              />

              <label htmlFor="online" className="react-prompts-radio-label">
                Online 2-Player
              </label>
              <input
                name="mode"
                type="radio"
                className="react-prompts-radio mode"
                id="mode-online"
                value="mode-online"
              />
            </div>
          </section>
        </div>
        <div className="react-prompts-submit">
          <button
            type="button"
            className="react-prompts-form-submit"
            id="js-start"
          >
            Start Game!
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModeDialog;
