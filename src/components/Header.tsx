import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 20px 0;
  background-color: lightgrey;
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const Heading = styled.h1``;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Container>
        <Heading>Tic-tac-toe</Heading>
      </Container>
    </StyledHeader>
  );
};

export default Header;
