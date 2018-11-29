import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPassword state domain
 */

const selectResetPasswordDomain = state =>
  state.get('resetPassword', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResetPassword
 */

const makeSelectResetPassword = () =>
  createSelector(selectResetPasswordDomain, substate => substate.toJS());

export default makeSelectResetPassword;
export { selectResetPasswordDomain };
