/*
 *
 * Signup actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}

export function createAccount(payload) {
  return {
    type: c.CREATE_ACCOUNT,
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
