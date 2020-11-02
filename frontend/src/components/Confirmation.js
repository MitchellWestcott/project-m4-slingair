import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({ userData }) => {
  console.log("user data inside confirmation", userData);
  const { id, flightNumber, seat, givenName, surname, email } = userData;
  return (
    <Wrapper>
      <TextWrapper>
        <Title>Your flight is confirmed!</Title>
        <Text>
          <Bold>Reservation #: </Bold>
          {id}
        </Text>
        <Text>
          <Bold>Flight #: </Bold>
          {flightNumber}
        </Text>
        <Text>
          <Bold>Seat: </Bold>
          {seat}
        </Text>
        <Text>
          <Bold>Name: </Bold>
          {surname} {givenName}
        </Text>
        <Text>
          <Bold>Email: </Bold>
          {email}
        </Text>
      </TextWrapper>
      <img src={tombstone} width="200px" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  /* border: 1px solid red; */
  /* height: 30vh; */
  border: 2px solid ${themeVars.alabamaCrimson};
  border-radius: 5px;

  padding: 20px;
  margin: 50px;
`;

const Title = styled.h3`
  /* font-weight: bold; */
  font-family: ${themeVars.contentFont};
  color: ${themeVars.alabamaCrimson};
  padding: 10px;
  border-bottom: 2px solid ${themeVars.alabamaCrimson};
`;

const Text = styled.p`
  font-size: 18px;
  padding-top: 10px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default Confirmation;
