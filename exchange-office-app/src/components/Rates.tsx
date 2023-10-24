import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { CurrencyDataObj } from "../utils/stringToObjectParser";
import { styled } from "@mui/material/styles";

interface RatesProps {
  data: CurrencyDataObj[];
}

const Rates: React.FC<RatesProps> = ({ data }) => {
  return (
    <>
    <Typography variant='h5' component='h1'>Exchange rates</Typography>
    <TableContainer component={RatesWindow}>
      
      <Table aria-label="rates">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ country, currency, code, rate }) => (
            <TableRow
              key={country}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {country}
              </TableCell>
              <TableCell align="right">{currency}</TableCell>
              <TableCell align="right">{code}</TableCell>
              <TableCell align="right">{rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Rates;

const RatesWindow = styled(Paper)`
  height: auto;
  margin: 30px;
  padding: 50px;
  width: 100%;
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
