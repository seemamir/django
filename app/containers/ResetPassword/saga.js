import { takeLatest, call, put, select } from 'redux-saga/effects';

import * as api from './api';
import * as a from './actions';
import * as c from './constants';


export function* reset(action) {
  try {
    const { payload } = action;
    const response = yield call(api.resetPassword, payload);
    // yield put(setResponse({ message: response.data, status: response.status }));
  } catch (error) {
    // yield put(setResponse({ message: error.response.data, status: error.response.status }));

  }
}

// Individual exports for testing
export default function* resetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.RESET_PASSWORD, reset)
}
