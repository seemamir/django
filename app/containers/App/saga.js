import { takeLatest, call, put, select } from 'redux-saga/effects';
import { get } from 'lodash';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* fetchUser(action) {
  try {
    const email = localStorage.getItem('email');
    if (email) {
      // const { email } = yield select(makeSelectNewsPage());
      const response = yield call(api.fetchUser, action.payload);
      const data = get(response.data, 'results', []);
      // yield put(a.loggedInAction(response.data));
      if (data.length > 0) {
        const user = data[0];
        delete user.password;
        yield put(a.setUser(user));
        // fetch profile
        let userProfile = {};
        const profile = yield call(api.fetchProfile, user.id);
        const profileData = get(profile, 'data.results', []);
        if (profileData.length == 0) {
          // Create
          const create = yield call(api.createProfile, {
            user: user.id,
            image: '',
            bio: '',
            name: email,
          });
          userProfile = create.data;
          yield put(a.setProfile(userProfile));
        } else {
          userProfile = profileData[0];
          yield put(a.setProfile(userProfile));
        }
      }
    }
  } catch (error) {}
}

// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.FETCH_USER, fetchUser);
}
