/*
 *
 * ForgetPassword actions
 *
 */

import { DEFAULT_ACTION, FORGET_PASSWORD, SET_RESPONSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function forgetPassword() {
  return {
    type: FORGET_PASSWORD,
  };
}
export function setResponse() {
  return {
    type: SET_RESPONSE,
  };
}
