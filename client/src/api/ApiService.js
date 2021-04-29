import axios from 'axios';
import { TokenService } from '../services/TokenService';

const onSuccess = function (response) {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = function (error) {
  console.error('Request Failed:', error.config);

  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

export const ApiService = axios.create({
  baseURL: 'https://localhost:8000/api/v1',
  timeout: 1000,
});

ApiService.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      authorization: 'Bearer ' + TokenService.getToken(),
    };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      // your failure logic
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
