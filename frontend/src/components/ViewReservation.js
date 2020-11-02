import React, { useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Reservation = ({ userReservation, setUserReservation }) => {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState(false);
  const { id, flightNumber, seat, givenName, surname, email } = userReservation;
  return (
    <Wrapper>
      <TextWrapper>
        <Title>Flight information:</Title>
        {error ? (
          "Couldn't find reservation"
        ) : (
          <>
            <Text>
              <Bold>Reservation #: </Bold>
              {id}
            </Text>
            <Text>
              <Bold>Flight #: </Bold>
              {flightNumber}
            </Text>
            <Title>Your information:</Title>
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
          </>
        )}
      </TextWrapper>

      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          fetch(`/reservations/${reservationId}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                setError(false);
                setUserReservation(data.data);
                // console.log(error);
              } else {
                // console.log(error);
                setError(true);
              }
            });
        }}
      >
        <Input
          type="text"
          name="reservationId"
          placeholder="Enter reservation ID"
          value={reservationId}
          onChange={(ev) => {
            setReservationId(ev.target.value);
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
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
  /* margin: 50px; */
`;

const Title = styled.h3`
  color: white;
  padding: 10px;
  border-bottom: 2px solid ${themeVars.alabamaCrimson};
  margin: 30px;
`;

const Text = styled.p`
  font-size: 18px;
  margin-top: 15px;
  margin-left: 30px;
  color: black;
`;

const Bold = styled.span`
  font-weight: bold;
  font-family: ${themeVars.contentFont};
  color: ${themeVars.alabamaCrimson};
`;

const Form = styled.form`
  /* padding: 20px; */
`;

const Input = styled.input`
  font-size: 18px;
  margin: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: ${themeVars.alabamaCrimson};
  text-decoration: none;
  border: none;
  padding: 7px 30px;
  border-radius: 10px;
  margin-left: 20px;
`;

export default Reservation;
