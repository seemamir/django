import axios from '../../utils/http';
export const forgetApi = data => axios.post(`/api/forget-password/?email=${data.email}`, data);
