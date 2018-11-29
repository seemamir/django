/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectEmail = () => {
  const email = globalState => globalState.get('email');
  return email;
};

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());
/**
 * Is login returns whether the user is logged in or not.
 * @return {boolean}
 */
const isLogin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loggedInInfo') !== null,
  );

/**
 * @return {Object} currently logged in user info.
 */

const makeSelectGlobalState = () => 
  createSelector(selectGlobal, globalState => globalState && fromJS(globalState).toJS())

export default makeSelectGlobalState;
export {
  selectGlobal,
  makeSelectEmail,
  makeSelectRepos,
  // makeSelectLocation,
  isLogin,
  // loggedInInfo,
};
