import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response) ||
        (error.request && error.request) ||
        "Something went wrong"
    )
);

export default axiosInstance;

export const getFetcher = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...(config as any) });

  return res.data;
};

export const postFetcher = async (
  args: string | [string, AxiosRequestConfig, any]
) => {
  const [url, config, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, data, { ...(config as any) });

  return res.data;
};

export const patchFetcher = async (
  args: string | [string, AxiosRequestConfig, any]
) => {
  const [url, config, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.patch(url, data, { ...(config as any) });

  return res.data;
};

export const putFetcher = async (
  args: string | [string, AxiosRequestConfig, any]
) => {
  const [url, config, data] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.put(url, data, { ...(config as any) });

  return res.data;
};

export const deleteFetcher = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  // with delete, any data is part of config
  // as axios's configuration is different for delete
  const res = await axiosInstance.delete(url, { ...(config as any) });

  return res.data;
};

export const endpoints = {
  admin: {
    users: {
      all: `${BASE_URL}/firebase/document?collection=users`,
      user: (id: string) =>
        `${BASE_URL}/firebase/document?collection=users&document=${id}`,
    },
    tests: {
      nr: {
        all: `${BASE_URL}/firebase/document?collection=nr-consulting`,
        test: (id: string) =>
          `${BASE_URL}/firebase/document?collection=nr-consulting&document=${id}`,
      },
      sjt: {
        all: `${BASE_URL}/firebase/document?collection=sjt-consulting`,
        test: (id: string) =>
          `${BASE_URL}/firebase/document?collection=sjt-consulting&document=${id}`,
      },
      lr: {},
    },
    courses: {},
  },
};
