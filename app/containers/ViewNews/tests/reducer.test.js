import { fromJS } from 'immutable';
import viewNewsReducer from '../reducer';

describe('viewNewsReducer', () => {
  it('returns the initial state', () => {
    expect(viewNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
