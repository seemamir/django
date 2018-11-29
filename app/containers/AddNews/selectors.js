import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addNews state domain
 */

const selectAddNewsDomain = state => state.get('addNews', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddNews
 */

const makeSelectAddNews = () =>
  createSelector(selectAddNewsDomain, substate => substate.toJS());

export default makeSelectAddNews;
export { selectAddNewsDomain };
