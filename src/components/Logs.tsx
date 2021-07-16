import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../../public/store";

const LogContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;
const LogHeader = styled.h2`
  padding-bottom: 10px;
`;
const TextContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  color: limegreen;
  background-color: black;
`;
const Text = styled.p`
  padding: 10px;
  white-space: pre-wrap;
`;

const Logs: React.FC = () => {
  const logArray = useSelector((state: State) => state.logs);

  useEffect(() => {
    const el = document.getElementById("log-text-container");
    if (!el) {
      throw new Error("Unable to return 'log-text-container' element");
    }
    el.scrollTop = el.scrollHeight;
  });
  return (
    <LogContainer>
      <LogHeader>Game Logs</LogHeader>
      <TextContainer id="log-text-container">
        {logArray.length === 0 ? (
          <Text>Logs appear here</Text>
        ) : (
          logArray.map((log, i) => <Text key={i}>{log}</Text>)
        )}
      </TextContainer>
    </LogContainer>
  );
};

export default Logs;
