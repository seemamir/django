import * as c from './constants';

export function loggedInAction(payload) {
  return {
    type: c.LOGGED_IN_USER,
    payload,
  };
}

export function fetchUser(payload) {
  return {
    type: c.FETCH_USER,
    payload,
  };
}

export function setUser(payload) {
  return {
    type: c.SET_USER,
    payload,
  };
}

export function setProfile(payload) {
  return {
    type: c.SET_PROFILE,
    payload,
  };
}

export function createProfile(payload) {
  return {
    type: c.CREATE_PROFILE,
    payload,
  };
}
export function updateProfile(payload) {
  return {
    type: c.UPDATE_PROFILE,
    payload,
  };
}

export function setUserId(id) {
  return {
    type: c.SET_USER_ID,
    id,
  };
}
export function setEmail(payload) {
  return {
    type: c.SET_EMAIL,
    payload,
  };
}
