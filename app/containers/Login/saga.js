import { take, takeLatest, call, put, cancel } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';
import { createAccountApi } from '../Signup/api';
export function* login(action) {
  try {
    const { payload } = action;
    const response = yield call(api.loginApi, payload);
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
export function* create(action) {
  try {
    const { payload } = action;
    const data = {
      username: payload.email,
      ...payload,
    };
    const response = yield call(createAccountApi, data);
    yield put(
      a.setResponse({ message: response.data, status: response.status }),
    );
  } catch (error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 400
    ) {
      const response = yield call(api.loginApi, action.payload);
      yield put(
        a.setResponse({ message: response.data, status: response.status }),
      );
    } else {
      yield put(a.setResponse(error.response.data));
    }
  }
}
// Individual exports for testing
export default function* loginSaga() {
  // See example in containers/HomePage/saga.js

  const loginAcc = yield takeLatest(c.LOGIN_ACTION, login);
  yield takeLatest(c.CREATE_ACCOUNT, create);
  // yield take(c.UNMOUNT_REDUX);
  // yield cancel(loginAcc);
}
