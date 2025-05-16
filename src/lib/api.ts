// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor untuk menambahkan access_token ke setiap request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  console.log("INI SESSION API");
  console.log(session);
  if (session?.user.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

export default api;
