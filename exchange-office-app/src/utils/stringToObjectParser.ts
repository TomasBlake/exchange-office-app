interface Props {
  data: string;
}

export interface CurrencyDataObj {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

export const stringToObjectParser = ({
  data,
}: Props): Array<CurrencyDataObj> => {
  const parsedDataLines = data.split(/\r?\n/);
  const currenciesData = parsedDataLines.slice(2, parsedDataLines.length - 1);
  const dataArray = currenciesData.map((line) => line.split("|"));
  const currencyRatesObj = dataArray.map((currencyData) => ({
    country: currencyData[0],
    currency: currencyData[1],
    amount: currencyData[2],
    code: currencyData[3],
    rate: currencyData[4],
  }));
  return currencyRatesObj;
};
