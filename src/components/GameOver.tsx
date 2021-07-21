import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { State, store } from "../../public/store";

interface ModalProps {
  isOpen: boolean;
}
const GameOverModal = styled(Modal)<ModalProps>``;
const Heading = styled.h2``;
const Winner = styled.h3``;
const StyledButton = styled.button``;

interface GameOverProps {
  ws: WebSocket;
}

const GameOver: React.FC<GameOverProps> = ({ ws }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const winner = useSelector((state: State) => state.winner);
  const dispatch = useDispatch();
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  GameOverModal.setAppElement("body");

  useEffect(() => {
    if (winner) {
      setModalIsOpenToTrue();
    }
  });

  const onClickHandler = () => {
    console.log("PlayAgain clicked");
    const playAgainObj = {
      type: "playAgain",
      val: "y",
    };
    ws.send(JSON.stringify(playAgainObj));
    setModalIsOpenToFalse();
    dispatch({ type: "reset" });
    console.log(store.getState());
  };
  return (
    <GameOverModal isOpen={modalIsOpen}>
      <Heading>GAME OVER</Heading>
      <Winner>{winner === "draw" ? "You drew!" : `${winner} won!`}</Winner>
      <StyledButton onClick={onClickHandler}>Play Again?</StyledButton>
    </GameOverModal>
  );
};

export default GameOver;
