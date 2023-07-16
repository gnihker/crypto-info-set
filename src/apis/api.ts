import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const baseURL = "https://api.coingecko.com/api/v3";

export const coinGecko = {
  coinList: () => Axios.get(`${baseURL}/coins/list?include_platform=true`),
  coinHistory: (id: string, date: string) =>
    Axios.get(`${baseURL}/coins/${id}/history?date=${date}`),
};
