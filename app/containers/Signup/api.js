import axios from '../../utils/http';

export const createAccountApi = payload =>
  axios.post('rest-auth/signup', payload);

export const sendVerificationEmail = email => axios.post(`/api/send-verification-email/`,{email: email});