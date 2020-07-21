import axios from 'axios';
import eventHub from './eventhub';

const service = axios.create({
  baseURL: '/right-royal/api',
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    eventHub.$emit('before-request');
    return config;
  },
  (error) => {
    eventHub.$emit('request-error');
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    eventHub.$emit('after-response');
    return response;
  },
  (error) => {
    eventHub.$emit('response-error');
    return Promise.reject(error);
  },
);

export default service;
