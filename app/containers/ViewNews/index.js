/**
 *
 * ViewNews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import { get } from 'lodash';

import injectReducer from 'utils/injectReducer';
import { Row, Col, Icon, Button, Form } from 'antd';
import styled from 'styled-components';
import makeSelectGlobalState from '../App/selectors';
import makeSelectViewNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
const Wrapper = styled.div`
  margin: 20px auto;
  text-align: center;
  .main-heading {
    margin-bottom: 30px;
  }
  h3 {
    color: #555;
  }
  p {
    margin: auto 20px;
  }
  .main-sentence {
    margin: 50px auto;
  }
  .save-btn {
    margin-top: 50px;
    margin-right: 10px;
  }
  .comment {
    margin-top: 50px;
  }
`;
const Sidebar = styled.div`
  border-left: 1px solid #eee;
  height: 600px;
  margin-left: 50px;
  i {
    margin-bottom: 5px;
  }
  img {
    margin-top: 50px;
  }
`;
/* eslint-disable react/prefer-stateless-function */
export class ViewNews extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props.viewNews;
    this.state = {
      commentField: '',
      sentence2: post.sentence2,
      sentence3: post.sentence3 ? post.sentence3 : '',
      sentence4: post.sentence4 ? post.sentence4 : '',
      main_sentence: post.main_sentence ? post.main_sentence : '',
      totalLikeReactions: 0,
      totalFunnyReactions: 0,
      totalSadReactions: 0,
      totalAngryReactions: 0,
    };
  }

  postReaction = type => {
    const { id } = this.props.globalState.user;
    const postId = parseInt(get(this, 'props.match.params.id', null));
    const userId = id;
    const data = {
      post: postId,
      user: userId,
      reaction_type: type,
    };
    this.props.setPostReaction(data);
    setTimeout(() => {
      this.props.getPostReactions(postId);
    }, 500);
    setTimeout(() => {
      this.filterPostReactions();
    }, 1000);
  };

  filterPostReactions = () => {
    const allReactions = get(this, 'props.viewNews.postReactions', []);
    const likeReactions = allReactions.filter(c => c.reaction_type == 'like');
    this.setState({ totalLikeReactions: likeReactions.length });
    const funnyReactions = allReactions.filter(c => c.reaction_type == 'funny');
    this.setState({ totalFunnyReactions: funnyReactions.length });
    const sadReactions = allReactions.filter(c => c.reaction_type == 'sad');
    this.setState({ totalSadReactions: sadReactions.length });
    const angryReactions = allReactions.filter(c => c.reaction_type == 'angry');
    this.setState({ totalAngryReactions: angryReactions.length });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.viewPost(id);
    this.props.fetchPostComments(id);
    this.props.getPostReactions(id);

    setTimeout(() => this.filterPostReactions(), 1000);
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  handleRedirect = () => {
    this.props.history.push('/news-page');
  };

  publishComment = () => {
    const { id } = this.props.match.params;
    const {
      state: { commentField },
    } = this;
    if (commentField) {
      this.props.match.params.id;
      this.props.comment({
        comment: this.state.commentField,
        post: parseInt(get(this, 'props.match.params.id', null)),
        user: 1,
      });
      this.setState({
        commentField: '',
      });
      setTimeout(() => {
        this.props.fetchPostComments(id);
      }, 500);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = () => {
    const { id } = this.props.match.params;
    const payload = {
      post: id,
      user: this.props.globalState.user.id,
    };
    this.props.saveAsSavedPost(payload);
  };

  renderComments = () => {
    const { comments } = this.props.viewNews;
    if (comments instanceof Array) {
      const commentsA = comments.map(c => (
        <p key={Math.random() * 10}>{c.comment}</p>
      ));
      return <div className="comments">{commentsA}</div>;
    }
    return <p />;
  };

  render() {
    const { post } = this.props.viewNews;
    console.log(post);
    return (
      <div>
        <Helmet>
          <title>View Post</title>
          <meta name="description" content="Description of ViewNews" />
        </Helmet>
        <Header history={this.props.history}/>
        <Wrapper>
          <div className="bg-white">
            <Row>
              <Col span={24}>
                <h1>{post.title}</h1>
                <h3>Category: {post.category}</h3>
                <p>
                  Author: {post.author} <span>Source: {post.source}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <h2 className="main-heading">Summary</h2>
                <Form onChange={this.handleChange}>
                  <Row>
                    <Col span={1} />
                    <Col span={10}>
                      <p className="view-sentences">{post.sentence2}</p>
                    </Col>
                    <Col span={2} />
                    <Col span={10}>
                      <p className="view-sentences">{post.sentence3}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} offset={6}>
                      <div className="main-sentence">
                        <h2>Main Sentence</h2>
                        <p className="view-sentences">
                          {post.main_sentence}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} offset={6}>
                      <p className="view-sentences">{post.sentence4}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        className="save-btn"
                        onClick={this.handleSave}
                      >
                        Save Post
                      </Button>
                      <Button
                        type="primary"
                        className="save-btn"
                        onClick={this.handleRedirect}
                      >
                        Go to saved Page
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={8}>
                <Sidebar className="reaction-sidebar">
                  <h2>People</h2>
                  <Row>
                    <Col span={4} />
                    <Col span={4}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.postReaction('like')}
                        className="react-box"
                      >
                        <p>{post.people1 ? post.people1 : ''}</p>
                        <Icon
                          type="heart"
                          theme="filled"
                          className="reaction-icons"
                          style={{ color: 'red' }}
                        />
                        <h4>Like</h4>
                        <span>{this.state.totalLikeReactions}</span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.postReaction('funny')}
                        className="react-box"
                      >
                        <p>{post.people2 ? post.people2 : ''}</p>
                        <Icon
                          type="smile"
                          theme="filled"
                          className="reaction-icons"
                          style={{ color: '#faad14' }}
                        />
                        <h4>Funny</h4>
                        <span>{this.state.totalFunnyReactions}</span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.postReaction('sad')}
                        className="react-box"
                      >
                        <p>{post.people3 ? post.people3 : ''}</p>
                        <Icon
                          type="frown"
                          theme="filled"
                          className="reaction-icons"
                          style={{ color: '#faad14' }}
                        />
                        <h4>Sad</h4>

                        <span>{this.state.totalSadReactions}</span>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.postReaction('angry')}
                        className="react-box"
                      >
                        <p>{post.people4 ? post.people4 : ''}</p>
                        <Icon
                          type="meh"
                          theme="filled"
                          className="reaction-icons"
                          style={{ color: '#faad14' }}
                        />
                        <h4>Angry</h4>
                        <span>{this.state.totalAngryReactions}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20} offset={2}>
                      <img
                        height="200"
                        src={post.embedded_image}
                        alt="Embedded image"
                      />
                    </Col>
                  </Row>
                </Sidebar>
              </Col>
            </Row>
            <Row>
              <Col span={16} offset={2}>
                <h2 className="comment">Comments</h2>

                <Row>
                  <Col span={24}>{this.renderComments()}</Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <textarea
                      name="comment"
                      rows="3"
                      value={this.state.commentField}
                      onChange={e =>
                        this.setState({ commentField: e.target.value })
                      }
                      placeholder="Write ur comment here"
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      onClick={() => this.publishComment()}
                      type="primary"
                    >
                      Publish
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Wrapper>
      </div>
    );
  }
}

ViewNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  viewNews: makeSelectViewNews(),
  globalState: makeSelectGlobalState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    viewPost: id => dispatch(a.viewPost(id)),
    comment: data => dispatch(a.comment(data)),
    update: (id, payload) => dispatch(a.updatePost(id, payload)),
    fetchPostComments: id => dispatch(a.fetchPostComments(id)),
    unmount: () => dispatch(a.unmountRedux()),
    setPostReaction: data => dispatch(a.setPostReaction(data)),
    getPostReactions: postID => dispatch(a.getPostReactions(postID)),
    saveAsSavedPost: data => dispatch(a.saveAsSavedPost(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'viewNews', reducer });
const withSaga = injectSaga({ key: 'viewNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewNews);
