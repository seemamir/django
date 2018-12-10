import axios from '../../utils/http';

export const loginApi = payload => axios.post('/rest-auth/login/', payload);
export const userWithEmail = email => axios.get(`/api/user/?email=${email}`);
