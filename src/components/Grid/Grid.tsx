import React, { ReactNode, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import WebSocket from "ws";
import { GridType, Team } from "../../../lib/game";
import { State } from "../../../public/store";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  background-color: darkgray;
  width: fit-content;
  margin: 0 auto;
`;

const Square = styled.div`
  border: 1px solid black;
  height: 95px;
  width: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
  font-size: 40px;

  &:hover {
    background-color: lightgrey;
  }
`;
const Label = styled.p``;

interface GridProps {
  ws: WebSocket;
}

const Grid: React.FC<GridProps> = ({ ws }) => {
  const labels: GridType[] = Object.values(
    useSelector((state: State) => state.grid)
  );
  const getCurrentPlayerTeam = () =>
    useSelector((state: State) => state.currentPlayer.team);
  const currentTeam = getCurrentPlayerTeam();
  const dispatch = useDispatch();
  useEffect;
  const onClickHandler = (label: number | Team, ws: WebSocket) => {
    console.log(label, "CLICKED");
    const gridObj = {
      grid: Number(label),
      type: "grid",
    };
    ws.send(JSON.stringify(gridObj));
    dispatch({
      type: "playerChoice",
      payload: { choice: label, team: currentTeam },
    });
  };
  return (
    <GridContainer>
      {labels.map((label, i) => (
        <Square key={i} onClick={(e) => onClickHandler(label, ws)}>
          <Label>{label}</Label>
        </Square>
      ))}
    </GridContainer>
  );
};

export default Grid;

// const handleOnClickAddSkill = (event: React.MouseEvent) => {
//   const { currentTarget } = event;
//   const skillUri = currentTarget.getAttribute('data-skill-uri');
//   if (skillUri) {
//     dispatch(addSkill(skillUri));
//   }
// };
