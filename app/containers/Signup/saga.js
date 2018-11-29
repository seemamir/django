import { takeLatest, call, put } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* create(action) {
  try {
    const { payload } = action;
    const data = {
      username: payload.email,
      ...payload,
    };
    const response = yield call(api.createAccountApi, data);
    yield put(
      a.setResponse({ message: response.data, status: response.status }),
    );
  } catch (error) {
    yield put(
      a.setResponse({
        message: error.response.data,
        status: error.response.status,
      }),
    );
  }
}
// Individual exports for testing
export default function* signupSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.CREATE_ACCOUNT, create);
}
