import axios from 'axios';
import qs from 'qs';
// import { storage } from 'utils/tools';

import { Toast } from 'antd-mobile';
import store from 'store/index';

const BASE_URL = '/api';
axios.interceptors.request.use(
  (config) => {
    config.baseURL = BASE_URL;
    const state = store.getState();

    const token = state.global.token;
    console.log(token);

    if (token && token.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    console.log(config);
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw Error(response.statusText || '接口请求错误');
    }
  },
  (err) => {
    const is401 = err.toString().includes('401');
    if (is401) {
      console.log(is401);
      Toast.fail('未验证，重新登录。。。');
      store.dispatch({ type: 'LOGOUT' });
    } else {
      return Promise.reject(err);
    }
  }
);

export const getData = (url, params = {}) => {
  return axios.get(url, params);
};
export const getQsData = (url, data = {}) => {
  // const info = qs.stringify(data)
  return axios.get(url, {
    params: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
};
export const postData = (url, params = {}) => {
  return axios.post(url, params);
};
// eslint-disable-next-line
export const postForm = (url, params = {}) => {
  const keys = Object.keys(params);
  const form = new FormData();
  keys.forEach((key) => {
    if (params[key]) {
      form.append(key, params[key]);
    }
  });
  return axios.post(url, form);
};

export const qsData = (url, params = {}) => {
  return axios.post(url, qs.stringify(params), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
};

export const combineData = (url, params = { query: {}, data: {} }) => {
  const { query, data } = params;
  if (query) {
    url += '?' + qs.stringify(query);
  }
  return postData(url, data);
};
