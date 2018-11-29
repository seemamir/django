import axios from 'axios';
import history from '../history';
import { accessToken, loadState, clearState } from './persistState';

const ip = 'http://localhost:8000';

const api = axios.create({
  baseURL: ip,
  timeout: 60000,
});

const access = accessToken();
// api.defaults.headers.common['Authorization'] = "8afcd569-ff07-4463-9cda-d2824bcbc2fb";

// if (access) {
//     api.defaults.headers.common['Authorization'] = access;
// }

api.interceptors.request.use(
  req =>
    // store.dispatch('loading');
    // req.body = null;
    req,
);

api.interceptors.response.use(
  response =>
    // store.dispatch('loading', false);
    response,
  error => {
    if (error.response && error.response.status === 401) {
      clearState();
      history.push('/login');
    }

    throw error;
  },
);

// export const setToken = (token) => {
//     api.defaults.headers.common['Authorization'] =  token;
// }

const state = loadState();

// on refresh or browser load.
// if (state != null && state.data) {
//     api.defaults.headers.common['Authorization'] = state.data.token;
// }

// window.
// loging:

export default api;
