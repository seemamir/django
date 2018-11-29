import axios from '../../utils/http';

export const addPost = payload => axios.post('api/post/', payload);
