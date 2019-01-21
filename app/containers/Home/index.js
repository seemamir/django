import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Layout, List, Avatar, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import isLogin from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import Sidebar from '../../components/Sidebar/Loadable';
import * as a from './actions';
import thumbnail from 'images/download.png';
const { Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logginUser: '',
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchUser();
  }

  filter = category => {
    this.props.fetchPosts(category);
  };

  viewPost = id => {
    this.props.history.push(`/view/${id}`);
  };

  handleRedirect = () => {
    this.props.history.push('/add-news');
  };

  render() {
    const { user } = this.props.userInfo;
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <Header history={this.props.history} />

        <Layout>
          <Layout style={{ marginTop: '60px' }}>
            <Content className="content">
              <div className="filters">
                <Button onClick={() => this.filter('')} size="small">
                  All
                </Button>
                <Button onClick={() => this.filter('Economy')} size="small">
                  Economy
                </Button>
                <Button onClick={() => this.filter('Politics')} size="small">
                  Politics
                </Button>
                <Button onClick={() => this.filter('Tech')} size="small">
                  Tech
                </Button>
                <Button onClick={() => this.filter('Life')} size="small">
                  Life
                </Button>
                <Button
                  onClick={() => this.filter('Entertainment')}
                  size="small"
                >
                  Entertainment
                </Button>
                <Button onClick={() => this.filter('Opinion')} size="small">
                  Opinion
                </Button>
              </div>

              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  pageSize: 3,
                }}
                dataSource={this.props.home.posts}
                renderItem={item => (
                  <List.Item
                    onClick={() => this.viewPost(item.id)}
                    key={item.title}
                    extra={
                      <img
                        width={272}
                        style={{ maxHeight: 250, maxWidth: 250 }}
                        alt="No image logo"
                        src={
                          item.thumbnail_image === undefined ||
                          item.thumbnail_image === ''
                            ? thumbnail
                            : item.thumbnail_image
                        }
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.main_sentence}
                    />
                    {item.content}
                  </List.Item>
                )}
              />

              {user &&
                user.is_superuser && (
                  <Button onClick={this.handleRedirect} type="primary">
                    Add new post
                  </Button>
                )}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  userInfo: isLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchPosts: (category = '') => dispatch(a.fetchPosts(category)),
    fetchUser: () => dispatch(a.fetchUser(localStorage.getItem('email'))),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
