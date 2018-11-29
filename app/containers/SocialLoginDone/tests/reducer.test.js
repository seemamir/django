import { fromJS } from 'immutable';
import socialLoginDoneReducer from '../reducer';

describe('socialLoginDoneReducer', () => {
  it('returns the initial state', () => {
    expect(socialLoginDoneReducer(undefined, {})).toEqual(fromJS({}));
  });
});
