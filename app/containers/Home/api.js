import get from 'lodash';
import axios from '../../utils/http';

export const fetchPosts = payload =>
  axios.get(`api/post/?category=${get(payload, 'category', '')}`);

export const fetchUser = email => axios.get(`api/user/?email=${email}`);
