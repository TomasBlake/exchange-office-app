import React, { ChangeEvent, FormEvent, useState } from "react";
import { CurrencyDataObj } from "../utils/stringToObjectParser";
import styled from "styled-components";

interface Props {
  data: CurrencyDataObj[];
}

export const CurrencyForm: React.FC<Props> = ({ data }) => {
  const [amountOfCzk, setAmountOfCzk] = useState<number | undefined>();
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyDataObj | null>(null);
  const [convertedAmounth, setConvertedAmounth] = useState<number | undefined>();

  const handleChangeOfCzkAmounth = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = Number(event.target.value);
    setAmountOfCzk(newValue === 0 ? undefined : newValue);
  };

  const handleChangeCurrency = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedCurr = data.find((curr) => curr.code === event.target.value);
    if (selectedCurr) {
      setSelectedCurrency(selectedCurr);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (amountOfCzk && selectedCurrency) {
      const converted = amountOfCzk * Number(selectedCurrency.rate);
      setConvertedAmounth(converted);
    }
  };

  return (
    <Box>
      <h2>Currency convertor</h2>
      <FormWindow onSubmit={handleSubmit}>
        <Label>Amount in CZK:</Label>
        <Input
          type="number"
          min="0"
          required
          value={amountOfCzk}
          onChange={handleChangeOfCzkAmounth}
        />

        <Label>Select Currency:</Label>
        <Select value={selectedCurrency?.code} onChange={handleChangeCurrency}>
          {data.map((currencyData) => (
            <Option key={currencyData.code} value={currencyData.code}>
              {currencyData.code}
            </Option>
          ))}
          <Option key="none" defaultValue={undefined}>
            None
          </Option>
        </Select>

        <Label>
          Amount entered in CZK converted into the selected currency:
        </Label>
        <Input type="number" readOnly value={convertedAmounth} />

        <Submit
          type="submit"
          value="Submit"
          disabled={typeof amountOfCzk === 'undefined' || amountOfCzk <= 0 || !selectedCurrency}
        />
      </FormWindow>
    </Box>
  );
};

const Submit = styled.input`
  padding: 10px 20px;
  border: none;
  margin-top: 25px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-family: Arial, sans-serif;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
  &:active,
  &:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  &:disabled {
    background-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 15em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  font-family: Arial, sans-serif;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  background-color: #f8f8f8;
  color: #333;
  cursor: text;
  transition: background-color 0.3s ease;
  &:hover,
  &:focus {
    background-color: #e0e0e0;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 16em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: 1em;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover,
  &:focus {
    background-color: #e0e0e0;
  }
`;

const Option = styled.option`
  padding: 10px;
  background-color: #f8f8f8;
  color: #333;
  &:hover,
  &:focus {
    background-color: #c0c0c0;
  }
  &:nth-child(even) {
    background-color: #e0e0e0;
  }
`;

const Label = styled.label`
  font: 1.2em;
  font-weight: bold;
  margin: 15px 0 15px 0;
`;

const Box = styled.div`
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
  align-items: flex-start;
  @media (max-width: 1200px) {
    width: 100%;
    margin: 10px;
    padding: 10px;
    align-items: center;
  }
`;

const FormWindow = styled.form`
  height: auto;
  
  width: auto;
  background-color: papayawhip;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1200px) {
    padding: 10px;
    margin: 10px;
  }
`;
