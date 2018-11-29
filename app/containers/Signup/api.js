import axios from '../../utils/http';

export const createAccountApi = payload =>
  axios.post('rest-auth/signup', payload);
