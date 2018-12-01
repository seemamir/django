import axios from '../../utils/http';
export const resetPassword = data => axios.post(`/api/reset-password/`, data);
