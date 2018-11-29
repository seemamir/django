import { fromJS } from 'immutable';
import newsPageReducer from '../reducer';

describe('newsPageReducer', () => {
  it('returns the initial state', () => {
    expect(newsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
