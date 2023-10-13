import React from "react";
import styled from "styled-components";
import { CurrencyDataObj } from "../utils/stringToObjectParser";

interface RatesProps {
  data: CurrencyDataObj[];
}

export const Rates: React.FC<RatesProps> = ({ data }) => {
  return (
    <RatesWindow>
      <TitleRow>
        <TitleCell>Country</TitleCell>
        <TitleCell>Currency</TitleCell>
        <TitleCell>Code</TitleCell>
        <TitleCell>Rate</TitleCell>
      </TitleRow>
      {data.map(({ country, currency, code, rate }) => {
        return (
          <CurrencyRow key={code}>
            <DataCell>{country}</DataCell>
            <DataCell>{currency}</DataCell>
            <DataCell>{code}</DataCell>
            <DataCell>{rate}</DataCell>
          </CurrencyRow>
        );
      })}
    </RatesWindow>
  );
};

const DataCell = styled.div`
  width: 22%;
  display: flex;
  align-items: center;
  justify-content: left;
  &:nth-child(1) {
    width: 34%;
  }
`;

const TitleCell = styled(DataCell)``;

const CurrencyRow = styled.div`
  display: flex;
  margin: 15px;
  justify-content: space-between;
`;

const TitleRow = styled(CurrencyRow)`
  font-weight: bold;
  font-size: 1.2em;
`;

const RatesWindow = styled.div`
  height: auto;
  margin: 50px;
  padding: 50px;
  width: 50%;
  background-color: papayawhip;
  font-size: 1em;
  text-align: center;
  color: #bf4f74;
  display: flex;
  flex-direction: column;
  @media (max-width: 1300px) {
    padding: 20px;   
  }
  @media (max-width: 1200px) {
    width: 100%;
    padding: 10px;   
    margin: 10px;
  }
`;
