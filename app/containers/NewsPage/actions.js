/*
 *
 * NewsPage actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function fetchPosts(id) {
  return {
    type: c.FETCH_POSTS,
    id,
  };
}

export function updateProfile(payload) {
  return {
    type: c.UPDATE_PROFILE,
    payload,
  };
}
export function fetchProfile(payload) {
  return {
    type: c.FETCH_PROFILE,
    payload,
  };
}
export function setProfile(payload) {
  return {
    type: c.SET_PROFILE,
    payload,
  };
}

export function setPosts(payload) {
  return {
    type: c.SET_POSTS,
    payload,
  };
}
export function deletePost(payload) {
  return {
    type: c.DELETE_POST,
    payload,
  };
}
