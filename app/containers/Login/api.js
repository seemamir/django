import axios from '../../utils/http';

export const loginApi = payload => axios.post('/rest-auth/login/', payload);
