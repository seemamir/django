/*
 *
 * ForgetPassword actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function forgetPassword(payload) {
  return {
    type: c.FORGET_PASSWORD,
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
