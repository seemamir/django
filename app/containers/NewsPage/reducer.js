/*
 *
 * NewsPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  posts: [],
  profile: {},
});

function newsPageReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.SET_POSTS:
      return state.set('posts', action.payload);
    case c.SET_PROFILE:
      return state.set('profile', action.payload);
    default:
      return state;
  }
}

export default newsPageReducer;
