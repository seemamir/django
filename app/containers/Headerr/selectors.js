import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerr state domain
 */


const selectHeaderrDomain = state => state.get('headerr', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Headerr
 */

const makeSelectHeaderr = () =>
  createSelector(selectHeaderrDomain, substate => substate.toJS());

export default makeSelectHeaderr;
export { selectHeaderrDomain };
