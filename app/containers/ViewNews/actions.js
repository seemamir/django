/*
 *
 * ViewNews actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function viewPost(id) {
  return {
    type: c.VIEW_POST,
    id,
  };
}

export function comment(payload) {
  return {
    type: c.COMMENT_ON_POST,
    payload,
  };
}

export function fetchPostComments(payload) {
  return {
    type: c.FETCH_POST_COMMENTS,
    payload,
  };
}

export function setPostReaction(payload) {
  return {
    type: c.SET_POST_REACTION,
    payload,
  };
}

export function getPostReactions(payload) {
  return {
    type: c.GET_POST_REACTIONS,
    payload,
  };
}

export function saveAsSavedPost(payload) {
  console.log(payload);
  return {
    type: c.SAVE_AS_SAVED_POST,
    payload,
  };
}

export function savePostReactions(payload) {
  return {
    type: c.SAVE_POST_REACTIONS,
    payload,
  };
}

export function setPost(payload) {
  return {
    type: c.SET_POST,
    payload,
  };
}

export function setPostComments(payload) {
  return {
    type: c.SET_POST_COMMENTS,
    payload,
  };
}

export function updatePost(payload) {
  return {
    type: c.UPDATE_POST,
    payload,
  };
}

export function unmountRedux() {
  return {
    type: c.UNMOUNT_REDUX,
  };
}
