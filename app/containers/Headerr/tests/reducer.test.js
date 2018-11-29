import { fromJS } from 'immutable';
import headerrReducer from '../reducer';

describe('headerrReducer', () => {
  it('returns the initial state', () => {
    expect(headerrReducer(undefined, {})).toEqual(fromJS({}));
  });
});
