import axios from '../../utils/http';

export const fectSavedPosts = id => axios.get(`/api/saved-post/?user=${id}`);
export const fetchPostsApi = () => axios.get(`/api/post/`);
export const fetchSinglePost = id => axios.get(`/api/post/${id}`);

export const deletePostApi = id => axios.delete(`/api/post/${id}/`);
export const deleteSavedPost = id => axios.delete(`/api/saved-post/${id}/`);
export const updateProfile = data =>
  axios.patch(`/api/user-profile/${data.id}/`, data);
export const fetchProfile = userID =>
  axios.get(`/api/user-profile?user=${userID}&limit=1`);
