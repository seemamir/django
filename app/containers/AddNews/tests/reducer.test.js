import { fromJS } from 'immutable';
import addNewsReducer from '../reducer';

describe('addNewsReducer', () => {
  it('returns the initial state', () => {
    expect(addNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
