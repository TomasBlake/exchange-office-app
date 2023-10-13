import React from "react";
import { Layout } from "./components/Layout";
import {
  CurrencyDataObj,
  stringToObjectParser,
} from "./utils/stringToObjectParser";
import { useGetLatestCurrencyExchangeRates } from "./hooks/useGetLatestCurrencyExchangeRates";
import { Rates } from "./components/Rates";
import { CurrencyForm } from "./components/CurrencyForm";

const App = () => {
  const { data, error } = useGetLatestCurrencyExchangeRates();

  let currenciesData: Array<CurrencyDataObj> = [];

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  if (data) {
    currenciesData = stringToObjectParser({ data });
  }

  return (
    <Layout>
      <CurrencyForm data={currenciesData} />
      <Rates data={currenciesData} />
    </Layout>
  );
};

export default App;
