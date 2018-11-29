import React from 'react';
import { Layout, Avatar } from 'antd';
import PropTypes from 'prop-types';
const { Header } = Layout;
// import styled from 'styled-components';
class Navbar extends React.Component {
  handleRedirect = () => {
    console.log(this.props);
    this.props.history.push('/add-news');
  };

  render() {
    return (
      <Header
        style={{ background: '#fff', padding: '0 20px', textAlign: 'right' }}
      >
        <div onClick={this.handleRedirect}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="large"
          />
          <strong>John Doe</strong>
        </div>
      </Header>
    );
  }
}

Navbar.propTypes = {};

export default Navbar;
