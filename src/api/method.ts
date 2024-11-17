import Config from 'react-native-config';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Endpoints } from './endpoints';

const serverConfig: AxiosRequestConfig = {
  baseURL: Config.BASE_URL,
  headers: {
    'x-api-key': Config.API_KEY,
  },
};

const createAxiosInstance = () => axios.create(serverConfig);
export const apiRequest: AxiosInstance = createAxiosInstance();

const API = {
  getOCRResult: async (imageBase64: string) => {
    const response = await apiRequest.post(Endpoints.OCR, imageBase64, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
    return response.data;
  },
};

export default API;
