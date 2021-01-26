import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getToken = () => {
  return localStorage.getItem('chatify-token') || null;
};

const getHeaders = () => {
  const token = getToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ApiRequest = axios.create({
  baseURL: API_URL,
  headers: getHeaders(),
  responseType: 'json',
});

const ApiRequestWithoutToken = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});

// export const refreshInstance = () =>
//   (ApiRequest = axios.create({
//     baseURL: API_URL,
//     headers: getHeaders(),
//     responseType: 'json',
//   }));

export const APIRequest = {
  postWithoutToken(url, data) {
    return ApiRequestWithoutToken.post(url, data, {
      responseType: 'json',
    });
  },
};
