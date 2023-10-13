import { useQuery } from "@tanstack/react-query";
import { ApiFetchMethod, apiFetch } from "../api/apiFetch";

export const QUERY_KEY_GET_LATEST_CURRENCY_ECHANGE_RATES =
  "getLatestCurrencyExchangeRates";

export const useGetLatestCurrencyExchangeRates = () =>
  useQuery({
    queryKey: [QUERY_KEY_GET_LATEST_CURRENCY_ECHANGE_RATES],
    queryFn: () =>
      apiFetch({
        path: `${process.env.REACT_APP_API_ROOT}/exchange-rates` || "",
        method: ApiFetchMethod.GET,
        headers: {/*'Access-Control-Allow-Origin': `${process.env.REACT_APP_DOMAIN}`,*/ 'Content-Type': 'text/plain' }
      }),
  });
