import React, { useState } from "react";
import { CurrencyDataObj } from "../utils/stringToObjectParser";
import { useForm } from "react-hook-form";
import {
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { NumberInput } from "./NumberInput";
import { Select } from "./Select";
import { formValidation } from "../validation";

export type FormData = {
  amountOfCzk: number;
  selectedCurrency: string;
};

interface Props {
  data: CurrencyDataObj[];
}

const CurrencyForm: React.FC<Props> = ({ data }) => {
  const [convertedAmounth, setConvertedAmounth] = useState<number>();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onChange",
    defaultValues: {
      amountOfCzk: 0,
      selectedCurrency: ""
    },
    resolver: yupResolver(formValidation),
  });

  const amountOfCzk = watch("amountOfCzk");
  const selectedCurrency = watch("selectedCurrency");

  const handleConvertCurrency = (formData: FormData) => {
    const currency = data.find(curr => curr.code === formData.selectedCurrency)
    if (!currency) return;
    const converted = formData.amountOfCzk * Number(currency?.rate);
    setConvertedAmounth(converted);
    setSelectedCurrencyCode(currency?.code);
  };

  const onSubmit = handleSubmit(handleConvertCurrency);

  return (
    <>
    <Typography variant='h5' component='h1' gutterBottom>
        Currency convertor
      </Typography>
    <StyledPaper elevation={2}>
      
      <StyledBox>
        <FormWindow onSubmit={onSubmit}>
          <NumberInput<FormData>
            control={control}
            name="amountOfCzk"
            label="Amount of CZK"
            fullWidth
            errors={errors}
          />
          <Select<FormData, CurrencyDataObj>
            control={control}
            name="selectedCurrency"
            label="Select Currency"
            mapProp="code"
            fullWidth
            errors={errors}
            items={data}
          />

          <Button
            variant="contained"
            type="submit"
            value="Submit"
            disabled={
              typeof amountOfCzk === "undefined" ||
              amountOfCzk <= 0 ||
              !selectedCurrency
            }
          >
            Submit
          </Button>
        </FormWindow>
        <ConvertedCurrencyPaper elevation={1}>
          <Typography variant="body1">
            {`Amount entered in CZK converted into ${
              selectedCurrencyCode
                ? selectedCurrencyCode
                : "the selected currency"
            }:`}
          </Typography>
          {convertedAmounth && selectedCurrencyCode && (
            <Typography variant="h3" gutterBottom>
              {`${convertedAmounth.toFixed(2)} ${selectedCurrencyCode}`}
            </Typography>
          )}
        </ConvertedCurrencyPaper>
      </StyledBox>
    </StyledPaper>
    </>
  );
};

export default CurrencyForm;


const ConvertedCurrencyPaper = styled(Paper)`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
padding: 20px;
margin-left: 20px;
background-color: papayawhip;
hight: 100%;
width: 100%;
`;

const StyledPaper = styled(Paper)`
  height: auto;
  margin: 30px;
  padding: 50px;
  width: 100%;
  background-color: papayawhip;
  font-size: 1em;
  gap: 50px;
  color: #bf4f74;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1200px) {
    margin: 10px;
    padding: 10px;
    align-items: center;
  }
`;

const StyledBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    margin: 10px;
    padding: 10px;
    align-items: center;
  }
`;

const FormWindow = styled("form")`
  height: auto;
  width: auto;
  background-color: papayawhip;
  text-align: center;
  display: flex;
  gap: 2em;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1200px) {
    padding: 10px;
    margin: 10px;
  }
`;
