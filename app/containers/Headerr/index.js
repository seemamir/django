/**
 *
 * Headerr
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Layout, Avatar } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { get } from 'lodash';
import makeSelectHeaderr from './selectors';
import { selectGlobal } from '../App/selectors';
import Logo from '../../images/logo.png';
import reducer from './reducer';
import saga from './saga';
const { Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class Headerr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleRedirect = () => {
    this.props.history.push('/news-page');
  };

  // this.props.history.push('/add-news');
  componentDidMount() {
    setInterval(() => {
      let a = localStorage.getItem('user');
      if (a) {
        a = JSON.parse(a);
        const u = get(a, 'username', '');
        const username = u.indexOf('@') > -1 ? u.split('@')[0] : '';
        this.setState({
          username,
        });
      }
    }, 1500);
  }

  render() {
    let avatar = <span />;
    setTimeout(() => {
      let a = localStorage.getItem('profile');
      if (a) {
        a = JSON.parse(a);
        if (a) {
          const image = get(a, 'avatar', '');
          if (image) {
            avatar = <Avatar src={image} size="large" />;
          }
        }
      }
    }, 1000);
    return (
      <div>
        <Helmet>
          <title>Headerr</title>
          <meta name="description" content="Description of Headerr" />
        </Helmet>
        <Header
          style={{ background: '#fff', padding: '0 20px', textAlign: 'right' }}
        >
          <Link to="/home" className="logo-header">
            Home
          </Link>
          <div onClick={this.handleRedirect}>
            <strong>{this.state.username}</strong>
          </div>
        </Header>
      </div>
    );
  }
}

Headerr.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  headerr: makeSelectHeaderr(),
  // global: selectGlobal()
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

const withReducer = injectReducer({ key: 'headerr', reducer });
const withSaga = injectSaga({ key: 'headerr', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Headerr);
