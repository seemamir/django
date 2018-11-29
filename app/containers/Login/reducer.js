/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  socialInfo: {},
  response: {},
  email: {},
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.EMAIL_ACTION:
      return state.set('email', action.payload);
    case c.SET_RESPONSE:
      return state.set('response', action.payload);
    case c.RESET_RESPONSE:
      return state.set('response', {});
    case c.SOCIAL_INFO:
      return state.set('socialInfo', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
