/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  LD Khanhs
 * @license MIT
 *
 */

import axios from 'axios';
import { TokenService } from '../../services/TokenService';

const constants = {
  api: {
    url: `http://localhost:8000/api/v1`,
  },
};

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: constants.api.url,
});

const onSetup = (config) => {
  const token = TokenService.getToken();

  if (token) {
    config.headers = {
      ...config.headers,
      authorization: 'Bearer ' + token,
    };
  }
  // you can also do other modification in config
  return config;
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
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

const onErrorRequest = function (error) {
  return Promise.reject(error);
};

client.interceptors.request.use(onSetup, onErrorRequest);

/**
 * Request Wrapper with default success/error actions
 */
const onSuccess = function (response) {
  // console.debug('Request Successful!', response);
  return response.data;
};

const api = function (url, { data, ...customConfig }) {
  const config = {
    url,
    ...customConfig,
  };
  if (data) {
    config.data = data;
  }
  return client(config).then(onSuccess).catch(onError);
};

api.get = function (endpoint, customConfig = {}) {
  return api(endpoint, { ...customConfig, method: 'GET' });
};

api.post = function (endpoint, data, customConfig = {}) {
  return api(endpoint, {
    ...customConfig,
    data,
    method: 'POST',
  });
};

api.patch = function (endpoint, data, customConfig = {}) {
  return api(endpoint, { ...customConfig, data, method: 'PATCH' });
};

api.delete = function (endpoint, customConfig = {}) {
  return api(endpoint, { ...customConfig, method: 'DELETE' });
};

export default api;
