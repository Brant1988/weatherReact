import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const conf: AxiosRequestConfig = {
  baseURL: "https://www.universal-tutorial.com/api",
};

export const HOST: AxiosInstance = axios.create(conf);
export const AUTHHOST: AxiosInstance = axios.create(conf);

AUTHHOST.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Accept: "application/json",
    "api-token":
      "WlP5-NKJqxB9gLarzsIbdZCOOeH4a47xZRzvCtrZjcgrqfxVV6TGFn0rk7v_9nXojvA",
    "user-email": "Snvspbshop@gmail.com",
  };
  return config;
});
