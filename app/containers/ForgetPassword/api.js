import axios from '../../utils/http';
export const forgetApi = payload =>
  axios.post('/rest-auth/password/reset/', payload);
