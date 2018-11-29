import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewNews state domain
 */

const selectViewNewsDomain = state => state.get('viewNews', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewNews
 */

const makeSelectViewNews = () =>
  createSelector(selectViewNewsDomain, substate => substate.toJS());

export default makeSelectViewNews;
export { selectViewNewsDomain };
