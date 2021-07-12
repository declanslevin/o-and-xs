import React from "react";
import styled from "styled-components";
import { Player, State } from "../../public/store";
import { useSelector } from "react-redux";

const PlayerIndicatorContainer = styled.div``;
const PlayerContainer = styled.div``;

const PlayerIndicator: React.FC = () => {
  const thisPlayer: Player = useSelector((state: State) => state.thisPlayer);
  const currentPlayer: Player = useSelector(
    (state: State) => state.currentPlayer
  );
  return (
    <PlayerIndicatorContainer>
      <PlayerContainer>
        <h2>Your name: {thisPlayer.name}</h2>
        <h2>Your team: {thisPlayer.team}</h2>
      </PlayerContainer>
      <PlayerContainer>
        <h2>Turn: {currentPlayer.name}</h2>
        <h2>Team: {currentPlayer.team}</h2>
      </PlayerContainer>
    </PlayerIndicatorContainer>
  );
};

export default PlayerIndicator;
