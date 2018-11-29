import { takeLatest, call, put, select } from 'redux-saga/effects';
import forgetApi from './api';
import { setResponse } from './actions';
export function* forget(action) {
  try {
    const response = yield call(forgetApi, payload);
    yield put(setResponse(response.data));
  } catch (error) {}
}
// Individual exports for testing
export default function* forgetPasswordSaga() {
  // See example in containers/HomePage/saga.js
}
