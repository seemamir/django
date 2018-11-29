/**
 *
 * SocialLoginDone
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSocialLoginDone from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SocialLoginDone extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>SocialLoginDone</title>
          <meta name="description" content="Description of SocialLoginDone" />
        </Helmet>
        <div style={{height: '100vh',paddingTop: '25vh',textAlign: 'center',cursor: 'default'}} >
          <h1 style={{fontWeight: 'bold'}} >Loading please wait</h1>
        </div>
      </div>
    );
  }
}

SocialLoginDone.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  socialLoginDone: makeSelectSocialLoginDone(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'socialLoginDone', reducer });
const withSaga = injectSaga({ key: 'socialLoginDone', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SocialLoginDone);
