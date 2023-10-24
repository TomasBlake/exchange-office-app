import React, { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";
import {
  CurrencyDataObj,
  stringToObjectParser,
} from "./utils/stringToObjectParser";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import { useGetLatestCurrencyExchangeRates } from "./hooks/useGetLatestCurrencyExchangeRates";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./appRoutes";
import { Typography } from "@mui/material";

const CurrencyForm = lazy(() => import("./components/CurrencyForm"));
const Rates = lazy(() => import("./components/Rates"));

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
    <>
      <CssBaseline enableColorScheme />
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <Layout>
          <Routes>
            <Route
              path={APP_ROUTES.rates}
              element={
                <Suspense
                  fallback={<Typography variant="body1">Loading</Typography>}
                >
                  <Rates data={currenciesData} />
                </Suspense>
              }
            />
            <Route
              path={APP_ROUTES.exchange}
              element={
                <Suspense
                  fallback={<Typography variant="body1">Loading</Typography>}
                >
                  <CurrencyForm data={currenciesData} />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </StyleSheetManager>
    </>
  );
};

export default App;
