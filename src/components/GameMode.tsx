import React, { SyntheticEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State, store } from "../../public/store";

const GameModeWrapper = styled.div``;
const RadioWrapper = styled.section``;

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = styled.input<InputProps>``;

interface GameModeProps {
  ws: WebSocket;
}

const GameMode: React.FC<GameModeProps> = ({ ws }) => {
  const [selectedOption, setSelectedOption] = useState("cpu");
  const [disabled, setDisabled] = useState(false);
  const gameStage = useSelector((state: State) => state.stage);
  const setDisabledToTrue = () => {
    setDisabled(true);
  };
  const setDisabledToFalse = () => {
    setDisabled(false);
  };

  const startOnClickHandler = () => {
    console.log("Start button clicked");
    console.log(store.getState());
    const modeObj = {
      type: "mode",
      mode: selectedOption,
    };
    ws.send(JSON.stringify(modeObj));
  };

  const onChangeHandler = (changeEvent: SyntheticEvent) => {
    const target = changeEvent.target as HTMLInputElement;
    setSelectedOption(target.value);
  };

  useEffect(() => {
    gameStage === "initial" ? setDisabledToFalse() : setDisabledToTrue();
  });

  return (
    <GameModeWrapper>
      <RadioWrapper>
        <label htmlFor="cpu">CPU</label>
        <Input
          name="mode"
          type="radio"
          value="cpu"
          checked={selectedOption === "cpu"}
          onChange={onChangeHandler}
          disabled={disabled}
        />

        <label htmlFor="local">Local 2-Player</label>
        <Input
          name="mode"
          type="radio"
          value="local"
          checked={selectedOption === "local"}
          onChange={onChangeHandler}
          disabled={disabled}
        />

        <label htmlFor="online">Online 2-Player</label>
        <Input
          name="mode"
          type="radio"
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
