// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

export const createApi = async (baseUrl: string) => {
  const session = await getSession();

  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "*",
    },
  });

  instance.interceptors.request.use((config) => {
    if (session?.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  });

  return instance;
};
