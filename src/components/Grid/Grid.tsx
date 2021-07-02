import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GridType } from "../../../lib/game";
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

const Grid: React.FC = () => {
  const labels: GridType[] = Object.values(
    useSelector((state: State) => state.grid)
  );
  return (
    <GridContainer>
      {labels.map((label, i) => (
        <Square key={i}>
          <Label>{label}</Label>
        </Square>
      ))}
    </GridContainer>
  );
};

export default Grid;
