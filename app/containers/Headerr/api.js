import axios from '../../utils/http';
export const fetchProfileByUsername = username =>
  axios.get(`/api/user-profile?username=${username}`);