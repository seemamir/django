import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the socialLoginDone state domain
 */

const selectSocialLoginDoneDomain = state =>
  state.get('socialLoginDone', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocialLoginDone
 */

const makeSelectSocialLoginDone = () =>
  createSelector(selectSocialLoginDoneDomain, substate => substate.toJS());

export default makeSelectSocialLoginDone;
export { selectSocialLoginDoneDomain };
