import { takeLatest, call, cancel, take, put } from 'redux-saga/effects';
import { get } from 'lodash';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';
export function* view(action) {
  try {
    const { id } = action;
    const response = yield call(api.viewPostApi, id);
    yield put(a.setPost(response.data));
  } catch (error) {
    yield put(a.setPost(error.response.data));
  }
}

export function* comment(action) {
  try {
    const response = yield call(api.comment, action.payload);
  } catch (e) {
    console.log(e.response);
  }
}

export function* fetchComments(action) {
  try {
    const response = yield call(api.commentsApi, action.payload);
    yield put(a.setPostComments(response.data));
  } catch (e) {
    throw e;
    // yield put(a.setPostComments(e.response.data));
  }
}

export function* update(action) {
  try {
    const { payload } = action;
    console.log(payload);
    const data = {
      main_sentence: 'main_sentence',
      sentence2: 'sentence2',
      sentence3: 'sentence3',
      sentence4: 'sentence4',
    };
    yield call(api.updatePostApi, payload, data);
  } catch (error) {}
}

export function* setPostReaction(action) {
  try {
    const response = yield call(api.setPostReaction, action.payload);
  } catch (error) {
    console.log(error.message);
  }
}

export function* getPostReactions(action) {
  try {
    const response = yield call(api.getPostReactions, action.payload);
    // run filterPostReactions to filter at the same time!
    const postReactions = get(response, 'data', []);
    if (postReactions instanceof Array) {
      yield put(a.savePostReactions(postReactions));
    }
  } catch (error) {
    console.log(error.message);
  }
}
export function* saveAsSavedPost(action) {
  try {
    const response = yield call(api.saveAsSavedPost,action.payload)
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
}

// Individual exports for testing
export default function* viewNewsSaga() {
  // See example in containers/HomePage/saga.js
  const post = yield takeLatest(c.VIEW_POST, view);
  const post_comment = yield takeLatest(c.COMMENT_ON_POST, comment);
  const fetch_post = yield takeLatest(c.FETCH_POST_COMMENTS, fetchComments);
  yield takeLatest(c.UPDATE_POST, update);
  yield takeLatest(c.UPDATE_POST, update);
  yield takeLatest(c.SET_POST_REACTION, setPostReaction);
  yield takeLatest(c.GET_POST_REACTIONS, getPostReactions);
  yield takeLatest(c.SAVE_AS_SAVED_POST, saveAsSavedPost);

  yield take(c.UNMOUNT_REDUX);
  yield cancel(post);
  yield cancel(post_comment);
  yield cancel(fetch_post);
}
