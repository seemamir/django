import axios from '../../utils/http';

export const viewPostApi = id => axios.get(`/api/post/${id}/`);
export const updatePostApi = (id, payload) => {
  console.log(id, payload);
  return axios.post(`/api/post/${id}/`, payload);
};
export const comment = data => axios.post(`/api/comment/`, data);
export const commentsApi = id => axios.get(`/api/comment/?post=${id}`);
export const setPostReaction = data => axios.post(`/api/post-reaction/`, data);
export const getPostReactions = postID => axios.get(`/api/post-reaction/?post=${postID}`);
export const saveAsSavedPost = data => axios.post(`/api/saved-post/`, data);
export const fetchUser = userid => axios.get(`/api/user/${userid}`)
export const fetchCommentReplies = commentID => axios.get(`/api/comment-reply/?comment=${commentID}`)
export const postCommeentReply = data => axios.post(`/api/comment-reply/`,data)
