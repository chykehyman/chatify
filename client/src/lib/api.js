import axios from 'axios';
import { API_URL, CHATIFY_TOKEN } from '../constants';

export const getToken = () => {
  return localStorage.getItem(CHATIFY_TOKEN) || null;
};

const getHeaders = () => {
  const token = getToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ApiRequestWithToken = axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
  responseType: 'json',
});

const ApiRequestWithoutToken = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

export const APIRequest = {
  postWithoutToken(url, data) {
    return ApiRequestWithoutToken.post(url, data);
  },
  getWithToken(url) {
    return ApiRequestWithToken.get(url);
  },
};
