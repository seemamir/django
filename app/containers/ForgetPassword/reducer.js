/*
 *
 * ForgetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  response: {},
});

function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.SET_RESPONSE:
      return state.set('response', action.payload);
    case c.RESET_RESPONSE:
      return state.set('response', {});
    default:
      return state;
  }
}

export default forgetPasswordReducer;
