/*
 *
 * Home actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}

export function fetchPosts(payload) {
  return {
    type: c.FETCH_POSTS,
    payload,
  };
}

export function fetchUser(payload) {
  return {
    type: c.FETCH_USER,
    payload,
  };
}

export function setPosts(payload) {
  return {
    type: c.SET_POSTS,
    payload,
  };
}

export function setResponse(payload) {
  return {
    type: c.SET_RESPONSE,
    payload,
  };
}
export function userInfo(payload) {
  return {
    type: c.USER_INFO,
    payload,
  };
}
