import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Card, Alert, message, Button, Input } from 'antd';
import { get } from 'lodash';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import thumbnail from 'images/download.png';
import makeSelectNewsPage from './selectors';
import makeSelectGlobalState from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
import { fetchSinglePost, fetchProfile, fectSavedPosts } from './api';

/* eslint-disable react/prefer-stateless-function */
class SavedPostView extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPost(this.props.item.post);
    this.state = {
      post: {},
      loaded: false,
    };
  }

  fetchPost = async id => {
    try {
      const response = await fetchSinglePost(id);
      this.setState({
        loaded: true,
        post: response.data,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  handleViewRedirect = id => {
    this.props.history.push(`/view/${id}`);
  };

  render() {
    const item = this.props.item;
    const title = get(this, 'state.post.title', '');
    const image = get(this, 'state.post.thumbnail_image', '');
    return (
      <Card
        className="news-box"
        cover={
          <img
            alt="example"
            src={image === undefined || image === '' ? thumbnail : image}
          />
        }
      >
        <h3>{title}</h3>

        <Link to={`/view/${item.post}`} className="primary-btn">
          View
        </Link>
      </Card>
    );
  }
}
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
      name: '',
      bio: '',
      renderedPosts: [],
      savedPosts: [],
    };
  }

  async fetchSavedPosts() {
    try {
      const response = await fectSavedPosts(this.props.match.params.id);
      const posts = get(response, 'data', []);
      this.setState({
        savedPosts: posts,
      });
    } catch (e) {
      console.log(e);
    }
  }

  fetch = async userID => {
    try {
      const res = await fetchProfile(userID);
      const data = get(res, 'data[0]', {});
      this.setState({
        user: data,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  componentDidMount() {
    this.props.reset();
    const userID = get(this, 'props.match.params.id', null);
    this.fetch(userID);
    this.fetchSavedPosts();
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  renderPosts = () => {
    const posts = get(this, 'state.savedPosts', []);
    if (posts.length > 0) {
      return posts.map((item, i) => (
        <Col span={6} key={i}>
          <SavedPostView
            reload={() => {
              const userID = get(this, 'props.global.user.id', null);
              // const { user } = this.props.global;
              this.props.fetchPost(userID);
            }}
            item={item}
          />
        </Col>
      ));
    }

    return (
      <Col>
        <Card>No saved posts found</Card>
      </Col>
    );
  };

  render() {
    const image = (
      <img
        style={{
          height: '120px',
          width: '120px',
          display: 'block',
          margin: 'auto',
          marginBottom: '20px',
          borderRadius: '50%',
        }}
        src={get(this, 'state.user.image', '')}
      />
    );
    return (
      <div>
        <Helmet>
          <title>NewsPage</title>
          <meta name="description" content="Description of NewsPage" />
        </Helmet>
        <Header history={this.props.history} />

        <div className="container" style={{ marginTop: '100px' }}>
          <Row>
            <Col span={6}>
              <Card style={{ marginRight: '20px', textAlign: 'center' }}>
                <div>{image}</div>
              </Card>
            </Col>
            <Col span={14}>
              <Card>
                <h3>{get(this, 'state.user.name', '')}</h3>
                <p>{get(this, 'state.user.bio', '')}</p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>{this.renderPosts()}</Row>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {};

const mapStateToProps = createStructuredSelector({
  newsPage: makeSelectNewsPage(),
  global: makeSelectGlobalState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchPost: id => dispatch(a.fetchPosts(id)),
    updateProfile: data => dispatch(a.updateProfile(data)),
    fetchProfile: data => dispatch(a.fetchProfile(data)),
    reset: () => dispatch(a.resetResponse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newsPage', reducer });
const withSaga = injectSaga({ key: 'newsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profile);
