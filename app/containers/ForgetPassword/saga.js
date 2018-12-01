import { takeLatest, call, put, select } from 'redux-saga/effects';
import { forgetApi } from './api';
import { setResponse } from './actions';
import * as c from './constants';

export function* forget(action) {
  try {
    const { payload } = action;
    const response = yield call(forgetApi, payload);
    yield put(setResponse({ message: response.data, status: response.status }));
  } catch (error) {
    yield put(setResponse({ message: error.response.data, status: error.response.status }));

  }
}
// Individual exports for testing
export default function* forgetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FORGET_PASSWORD, forget);
}
