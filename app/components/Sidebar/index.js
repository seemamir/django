import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Logo from '../../images/logo.png';
// import PropTypes from 'prop-types';
const { Sider } = Layout;
class Sidebar extends React.Component {
  render() {
    return (
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: '100vh', paddingTop: '30px', position: 'fixed' }}
      >
        <div className="logo">
          <Link to="/home">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          <Menu.Item key="0" onClick={() => this.props.filter('')}>
            <Icon type="bars" />
            <span className="nav-text">All</span>
          </Menu.Item>
          <Menu.Item key="1" onClick={() => this.props.filter('Economy')}>
            <Icon type="stock" />
            <span className="nav-text">Economy</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.props.filter('Politics')}>
            <Icon type="team" />
            <span className="nav-text">Politics</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => this.props.filter('Tech')}>
            <Icon type="mobile" />
            <span className="nav-text">Tech</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={() => this.props.filter('Life')}>
            <Icon type="user" />
            <span className="nav-text">Life</span>
          </Menu.Item>
          <Menu.Item key="5" onClick={() => this.props.filter('Entertainment')}>
            <Icon type="customer-service" />
            <span className="nav-text">Entertainment</span>
          </Menu.Item>
          <Menu.Item key="6" onClick={() => this.props.filter('Opinion')}>
            <Icon type="solution" />
            <span className="nav-text">Opinion</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
