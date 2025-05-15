// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOCUMENT_PROCESSING_SERVICE,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

// Interceptor untuk menambahkan access_token ke setiap request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  console.log(session);
  if (session?.user.access_token) {
    config.headers.Authorization = `Bearer ${session.user.access_token}`;
  }

  return config;
});

export default api;
