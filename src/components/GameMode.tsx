import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import {
  disableRadioButtons,
  enableRadioButtons,
  getElementById,
  getRadios,
} from "../../public/helpers";

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // isDisabled: boolean;
}

const GameModeWrapper = styled.div``;
const RadioWrapper = styled.section``;
const Input = styled.input<InputProps>``;

interface GameModeProps {
  ws: WebSocket;
}

const GameMode: React.FC<GameModeProps> = ({ ws }) => {
  const [selectedOption, setSelectedOption] = useState("cpu");
  const [disabled, setDisabled] = useState(false);
  const toggle = (previous: boolean) => !previous;

  const startOnClickHandler = () => {
    console.log("Start button clicked");
    const modeObj = {
      type: "mode",
      mode: selectedOption,
    };
    ws.send(JSON.stringify(modeObj));
    setDisabled(toggle);
  };

  const onChangeHandler = (changeEvent: SyntheticEvent) => {
    const target = changeEvent.target as HTMLInputElement;
    setSelectedOption(target.value);
  };

  return (
    <GameModeWrapper>
      <RadioWrapper>
        <label htmlFor="cpu">CPU</label>
        <Input
          name="mode"
          className="mode-radio"
          type="radio"
          id="mode-cpu"
          value="cpu"
          checked={selectedOption === "cpu"}
          onChange={onChangeHandler}
          disabled={disabled}
        />

        <label htmlFor="local">Local 2-Player</label>
        <Input
          name="mode"
          className="mode-radio"
          type="radio"
          id="mode-local"
          value="local"
          checked={selectedOption === "local"}
          onChange={onChangeHandler}
          disabled={disabled}
        />

        <label htmlFor="online">Online 2-Player</label>
        <Input
          name="mode"
          className="mode-radio"
          type="radio"
          id="mode-online"
          value="online"
          checked={selectedOption === "online"}
          onChange={onChangeHandler}
          disabled={disabled}
        />
      </RadioWrapper>
      <button type="button" onClick={startOnClickHandler} disabled={disabled}>
        Start Game
      </button>
    </GameModeWrapper>
  );
};

export default GameMode;
