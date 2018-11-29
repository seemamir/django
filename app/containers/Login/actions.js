/*
 *
 * Login actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}

export function loginAction(payload) {
  return {
    type: c.LOGIN_ACTION,
    payload,
  };
}
export function setResponse(payload) {
  return {
    type: c.SET_RESPONSE,
    payload,
  };
}
export function resetResponse() {
  return {
    type: c.RESET_RESPONSE,
  };
}
export function createAccount(payload) {
  return {
    type: c.CREATE_ACCOUNT,
    payload,
  };
}

export function unmountRedux(payload) {
  return {
    type: c.UNMOUNT_REDUX,
    payload,
  };
}

export function SOCIAL_INFO(payload) {
  return {
    type: c.SOCIAL_INFO,
    payload,
  };
}
export function emailAction(payload) {
  return {
    type: c.EMAIL_ACTION,
    payload,
  };
}
