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
export const patchCommentVote = data => axios.patch(`/api/comment-vote/${data.id}/`, data);
export const patchPostReaction = data => axios.patch(`/api/post-reaction/${data.id}/`, data);
export const deleteCommentVote = id => axios.delete(`/api/comment-vote/${id}`);
export const postReplyVote = data => axios.post(`/api/reply-vote/`, data);
export const patchReplyVote = data => axios.patch(`/api/reply-vote/${data.id}/`, data);
export const deleteReplyVote = id => axios.delete(`/api/reply-vote/${id}/`);
export const deletePostReaction = id => axios.delete(`/api/post-reaction/${id}/`);
export const fetchCommentVotes = commentID =>
  axios.get(`/api/comment-vote/?comment=${commentID}`);
export const fetchReplyVotes = replyID =>
  axios.get(`/api/reply-vote/?reply=${replyID}`);
