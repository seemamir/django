/*
 *
 * ResetPassword actions
 *
 */

 
import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}



export function resetPassword(payload) {
  return {
    type: c.RESET_PASSWORD,
    payload
  };
}
