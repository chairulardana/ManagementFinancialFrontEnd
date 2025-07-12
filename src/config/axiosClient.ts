// src/clients/axiosClient.ts

import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'; // Import InternalAxiosRequestConfig

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Sesuaikan dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menambahkan interceptor untuk request
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('token');  // Token utama
    const accessGoogleToken = sessionStorage.getItem('Access_Google');  // Token Google

    let authorizationHeader = '';

    // Gabungkan token jika keduanya ada
    if (token) {
      authorizationHeader = `Bearer ${token}`;
    }
    
    if (accessGoogleToken) {
      authorizationHeader = `Bearer ${accessGoogleToken}`;
    }

    if (authorizationHeader) {
      config.headers.Authorization = authorizationHeader;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;
