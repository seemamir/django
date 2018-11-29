import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signup state domain
 */

const selectSignupDomain = state => state.get('signup', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Signup
 */

const makeSelectSignup = () =>
  createSelector(selectSignupDomain, substate => substate.toJS());

export default makeSelectSignup;
export { selectSignupDomain };
