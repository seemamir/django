import { fromJS } from 'immutable';
import { loadState, clearState } from '../../utils/persistState';

import * as c from './constants';

// const user = loadState();

// The initial state of the App
const initialState = fromJS({
  loggedInInfo: {},
  userId: '',
  email: '',
  user: {},
  profile: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case c.LOGGED_IN_USER:
      return state.set('loggedInInfo', action.payload);
    case c.SET_USER_ID:
      return state.set('userId', action.id);
    case c.SET_EMAIL:
      return state.set('email', action.payload);
    case c.SET_USER:
      localStorage.setItem('user',JSON.stringify(action.payload))
      return state.set('user', action.payload);
    case c.SET_PROFILE:
      localStorage.setItem('profile',JSON.stringify(action.payload))
      return state.set('profile', action.payload);
    case c.LOGOUT_USER:
      clearState();
      return state.set('loggedInInfo', null);

    default:
      return state;
  }
}

export default appReducer;
