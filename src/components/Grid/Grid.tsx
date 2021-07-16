import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { GridType, Team } from "../../../lib/game";
import { MessageToFrontEnd } from "../../../lib/message";
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
  const currentTeam = useSelector((state: State) => state.currentPlayer.team);
  const dispatch = useDispatch();
  const onClickHandler = (label: number | Team) => {
    if (typeof label !== "number") {
      throw new Error("Clicked on a O or X grid");
    }
    if (!currentTeam) {
      throw new Error("Unable to get player team");
    }
    console.log(label, "CLICKED");
    const gridObj = {
      grid: Number(label),
      type: "grid",
    };
    ws.send(JSON.stringify(gridObj));
    // TODO: Create Action creator
    // TODO: THUNK that wraps the body of the onClickHandler
    // TODO: Work out the best typing pattern for dispatch
    dispatch<MessageToFrontEnd>({
      type: "playerChoice",
      choice: label,
      team: currentTeam,
    });
  };

  return (
    <GridContainer>
      {labels.map((label, i) => (
        <Square key={i} onClick={() => onClickHandler(label)}>
          <Label>{label}</Label>
        </Square>
      ))}
    </GridContainer>
  );
};

export default Grid;
