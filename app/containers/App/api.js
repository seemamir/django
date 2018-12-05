import axios from '../../utils/http';

export const fetchProfile = userID =>
  axios.get(`/api/user-profile?user=${userID}`);
export const fetchUser = email => axios.get(`/api/user?username=${email}`);
export const createProfile = data => axios.post(`/api/user-profile/`, data);
export const updateProfile = data => axios.patch(`/api/user-profile/`, data);
