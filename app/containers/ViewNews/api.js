import axios from '../../utils/http';

export const viewPostApi = id => axios.get(`/api/post/${id}/`);
export const updatePostApi = (id, payload) =>
  axios.post(`/api/post/${id}/`, payload);
export const comment = data => axios.post(`/api/comment/`, data);
export const commentsApi = id => axios.get(`/api/comment/?post=${id}`);
export const setPostReaction = data => axios.post(`/api/post-reaction/`, data);
export const getPostReactions = postID =>
  axios.get(`/api/post-reaction/?post=${postID}`);
export const saveAsSavedPost = data => axios.post(`/api/saved-post/`, data);
export const fetchUser = userid => axios.get(`/api/user/${userid}`);
export const fetchProfile = userid =>
  axios.get(`/api/user-profile/?user=${userid}`);
export const fetchCommentReplies = commentID =>
  axios.get(`/api/comment-reply/?comment=${commentID}`);
export const postCommentReply = data => axios.post(`/api/comment-reply/`, data);
export const postCommentVote = data => axios.post(`/api/comment-vote/`, data);
export const postReplyVote = data => axios.post(`/api/reply-vote/`, data);
export const fetchCommentVotes = commentID =>
  axios.get(`/api/comment-vote/?comment=${commentID}`);
export const fetchReplyVotes = replyID =>
  axios.get(`/api/reply-vote/?reply=${replyID}`);
