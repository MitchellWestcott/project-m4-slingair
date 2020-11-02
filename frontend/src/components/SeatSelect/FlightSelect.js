import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";
import Input from "./Input";

const FlightSelect = ({ handleFlightSelect, flightNumber }) => {
  const [flights, setFlights] = useState(["Select a flight"]);

  useEffect(() => {
    // TODO: fetch the flight numbers
    fetch("/flights")
      .then((res) => res.json())
      .then((json) => {
        const data = Object.keys(json.data);
        // console.log("json data", json.data);
        setFlights(data);
      });
  }, []);

  return (
    <Wrapper>
      <Label htmlFor="flight">Flight Number :</Label>
      {/* <SelectWrapper> */}

      <Select
        defaultValue="Default"
        value={flightNumber}
        onChange={(ev) => {
          // console.log(ev.target.value);
          handleFlightSelect(ev);
        }}
      >
        <option value="Default">Select a flight</option>
        {flights.map((flight) => {
          return <option value={flight}>{flight}</option>;
        })}
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Select = styled.select`
  margin-left: 10px;
  height: 20px;
  border-radius: 8px;
  width: 160px;
  text-decoration: none;
  border: none;
  outline: none;
`;

export default FlightSelect;
