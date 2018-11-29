/*
 *
 * ForgetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_RESPONSE } from './constants';

export const initialState = fromJS({
  response: {},
});

function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_RESPONSE:
      return state.set('response', action.payload);
    default:
      return state;
  }
}

export default forgetPasswordReducer;
