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
import { Link } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import { get } from 'lodash';
import createHistory from 'history/createBrowserHistory';

import injectReducer from 'utils/injectReducer';
import {
  Row,
  Col,
  Icon,
  Button,
  Form,
  List,
  Avatar,
  Input,
  Modal,
  message,
} from 'antd';
import { Spin } from 'antd';
import styled from 'styled-components';
import { empty } from 'rxjs';
import moment from 'moment';
import {
  fetchUser,
  postCommentReply,
  fetchCommentReplies,
  fetchProfile,
  fetchCommentVotes,
  patchCommentReply,
  postCommentVote,
  postReplyVote,
  fetchReplyVotes,
  deleteCommentReply,
  patchReplyVote,
  patchComment,
  deleteReplyVote,
  deletecomment,
  patchCommentVote,
  patchPostReaction,
  deletePostReaction,
  deleteComment,
  commentWrite,
  commentsApi,
  deleteCommentVote,
} from './api';
import makeSelectGlobalState from '../App/selectors';
import makeSelectViewNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const loader = <Spin indicator={antIcon} />;
const Wrapper = styled.div`
  margin: 100px auto auto auto;
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

const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

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

class Replyform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyField: '',
    };
  }

  publishReply = async () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    const userID = get(user, 'id', null);
    const commentID = get(this, 'props.comment.id');
    const reply = this.state.replyField;
    const object = { user: userID, comment: commentID, reply };
    await postCommentReply(object);
    this.setState({ replyField: '' });
    this.props.fetchReplies();
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={1}/>
          <Col span={10}>
            <textarea
              name="comment"
              rows="3"
              style={{ height: '52px', marginTop: '20px'}}
              value={this.state.replyField}
              onChange={e => this.setState({ replyField: e.target.value })}
              placeholder="Write ur reply here"
            />
          </Col>
          <Col span={4}>
            <Button
              style={{ marginTop: '20px', marginLeft: '20px' }}
              onClick={() => this.publishReply()}
              type="primary"
            >
              Publish
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const emptyDiv = () => <div />;

class CommentReplyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      deleteDialog: false,
      editDialog: false,
      totalUpvotes: 0,
      loading: false,
      votes: [],
      totalDownvotes: 0,
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchVotes(this.props.item.id);
  }

  checkVote = async type => {
    const replyId = get(this, 'props.item.id', null);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    const filter = this.state.votes.filter(c => c.user == userID);
    const totalFiltered = get(filter, 'length', 0);
    const currentVote = get(filter, '[0]', {});
    if (totalFiltered > 0) {
      const currentVoteType = get(currentVote, 'vote_type', '');
      if (currentVoteType == type) {
        await deleteReplyVote(currentVote.id);
      } else {
        // updatePost
        currentVote.vote_type = type;
        await patchReplyVote(currentVote);
      }
    } else {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const userID = get(user, 'id', null);

      if (replyId > 0 && userID > 0) {
        await postReplyVote({
          reply: replyId,
          vote_type: type,
          user: userID,
        });
      }
    }
    this.fetchVotes(replyId);
  };

  async vote(type) {
    this.checkVote(type);
  }

  handleRedirect = () => {
    const { history } = this.props;
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    const replyUserID = get(this, 'props.item.user');
    if (userID == replyUserID) {
      history.push('/news-page');
    } else {
      history.push(`/profile/${replyUserID}`);
    }
  };

  fetchVotes = async replyId => {
    if (replyId > 0) {
      try {
        const response = await fetchReplyVotes(replyId);
        const votes = get(response, 'data.results', []);
        const upvotes = votes.filter(c => c.vote_type == 'UP_VOTE');
        const downvotes = votes.filter(c => c.vote_type == 'DOWN_VOTE');
        this.setState({ totalUpvotes: upvotes.length });
        this.setState({ totalDownvotes: downvotes.length });
        this.setState({ votes });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  fetchUser = async () => {
    try {
      const id = get(this, 'props.item.user', null);
      if (id > 0) {
        const response = await fetchProfile(id);
        const user = get(response, 'data.results[0]', {});
        this.setState({
          user,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  async editReply() {
    this.setState({ loading: true });
    const item = get(this, 'props.item', null);
    if (item) {
      item.reply = get(this, 'state.editValue', '');
      try {
        await patchCommentReply(item);
        this.setState({ loading: false, editValue: '', editDialog: false });
        message.success('Comment reply edited');
        this.props.refetch();
      } catch (e) {
        message.error('Something went wrong while editing reply.');
      }
    }
  }

  async deleteNow() {
    this.setState({ loading: true });
    const id = get(this, 'props.item.id', null);
    if (id) {
      try {
        await deleteCommentReply(id);
        this.setState({
          loading: false,
          editValue: '',
          editDialog: false,
          deleteDialog: false,
        });
        message.success('Comment reply deleted');
        this.props.refetch();
      } catch (e) {
        message.error('Something went wrong while deleting reply.');
      }
    }
  }

  getUser = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    return userID;
  };

  render() {
    const loading = this.state.loading ? loader : <div />;
    return (
      <div>
        <Modal
          title="Edit Reply"
          visible={this.state.editDialog}
          onOk={() => this.editReply()}
          onCancel={() => this.setState({ editDialog: false })}
        >
          <Input
            value={this.state.editValue}
            onChange={e => this.setState({ editValue: e.target.value })}
          />
          {loading}
        </Modal>
        <Modal
          title="Delete Reply"
          visible={this.state.deleteDialog}
          onOk={() => this.deleteNow()}
          onCancel={() => this.setState({ deleteDialog: false })}
          okText="Delete Now"
          cancelText="cancel"
        >
          <p>Are you sure you want to delete the dialog?</p>
          {loading}
        </Modal>

        <List.Item
          actions={[
            <IconText
              onClick={() => this.vote('UP_VOTE')}
              type="like-o"
              text={this.state.totalUpvotes}
            />,
            <IconText
              onClick={() => this.vote('DOWN_VOTE')}
              type="dislike-o"
              text={this.state.totalDownvotes}
            />,
            <div
              style={{
                display:
                  this.getUser() === this.props.item.user ? 'block' : 'none',
              }}
            >
              <IconText
                onClick={() =>
                  this.setState({
                    editDialog: true,
                    editValue: get(this, 'props.item.reply', ''),
                  })
                }
                type="edit"
              />

              <IconText
                onClick={() => this.setState({ deleteDialog: true })}
                type="delete"
              />
            </div>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <a onClick={this.handleRedirect}>
                <Avatar src={get(this, 'state.user.image', '')} />
              </a>
            }
            title={
              <div className="title">
                <a onClick={this.handleRedirect}>
                  {get(this, 'state.user.name', '')}
                </a>
                <p style={{ display: 'inline-block', fontSize: '12px' }}>
                  {moment(+new Date(this.props.item.created_at)).fromNow()}
                </p>
              </div>
            }
            description={get(this, 'props.item.reply', '')}
          />
        </List.Item>
      </div>
    );
  }
}

class CommentReplies extends React.Component {
  renderReplies = () => {
    const replies = get(this, 'props.replies', []);

    if (replies.length == 0) {
      return <div />;
    }
    return (
      <div style={{ paddingLeft: '50px' }}>
        <List
          itemLayout="horizontal"
          dataSource={replies}
          pagination={false}
          renderItem={item => (
            <CommentReplyItem
              refetch={() => this.props.refetch()}
              history={this.props.history}
              item={item}
            />
          )}
        />
      </div>
    );
  };

  render() {
    return <div>{this.renderReplies()}</div>;
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { email: '' },
      currendUser: this.getName(),
      replyFormShow: false,
      replies: [],
      repliesPage: 1,
      repliesCount: null,
      loading: false,
      editDialog: false,
      editValue: '',
      deleteDialog: false,
      totalUpvotes: 0,
      totalDownvotes: 0,
      votes: [],
    };
  }

  fetchVotes = async commentID => {
    if (commentID > 0) {
      try {
        const response = await fetchCommentVotes(commentID);
        const votes = get(response, 'data.results', []);
        const upvotes = votes.filter(c => c.vote_type == 'UP_VOTE');
        const downvotes = votes.filter(c => c.vote_type == 'DOWN_VOTE');
        this.setState({ totalUpvotes: upvotes.length });
        this.setState({ totalDownvotes: downvotes.length });
        this.setState({ votes });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  handleRedirect = () => {
    const { history } = this.props;
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    const commentUserID = get(this, 'props.comment.user');

    if (userID == commentUserID) {
      history.push('/news-page');
    } else {
      history.push(`/profile/${commentUserID}`);
    }
  };

  getName = () => {
    const name = get(this, 'state.user.username', '');
    const index = name.indexOf('@');
    if (index > 0) {
      return name.split('@')[0];
    }
    return name;
  };

  fetchUser = async uid => {
    try {
      const response1 = await fetchProfile(uid);
      const user = get(response1, 'data.results[0]', {});
      this.setState({
        user,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  componentDidMount() {
    const comment = get(this, 'props.comment', { comment: '' });
    this.fetchUser(comment.user);
    this.fetchVotes(comment.id);
    this.fetchReplies();
  }

  fetchReplies = async () => {
    const commentID = get(this, 'props.comment.id', null);
    if (commentID) {
      let response = await fetchCommentReplies(commentID,this.state.repliesPage);
      const {data:{results,count}} = response;
      let oldReplies = this.state.replies;
      if (count <= 10) {
        this.setState({replies: results,repliesCount: count});
      }else {
        console.log(1);
        this.setState({replies: [...oldReplies,...results],repliesCount: count});;
      }
    }
  };

  check = async type => {
    const commentID = get(this, 'props.comment.id', null);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    const filter = this.state.votes.filter(c => c.user == userID);
    const totalFiltered = get(filter, 'length', 0);
    const currentVote = get(filter, '[0]', {});
    if (totalFiltered > 0) {
      const currentVoteType = get(currentVote, 'vote_type', '');
      if (currentVoteType == type) {
        await deleteCommentVote(currentVote.id);
      } else {
        // updatePost
        currentVote.vote_type = type;
        await patchCommentVote(currentVote);
      }
    } else {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const userID = get(user, 'id', null);
      console.log(commentID,userID);
      if (commentID > 0 && userID > 0) {
        await postCommentVote({
          comment: commentID,
          vote_type: type,
          user: userID,
        });
      }
    }
    this.fetchVotes(commentID);
  };

  vote = async type => {
    this.check(type);
  };

  async deleteNow() {
    this.setState({ loading: false });
    const id = get(this, 'props.comment.id', null);
    if (id) {
      try {
        await deleteComment(id);
        this.setState({
          loading: false,
          editValue: '',
          editDialog: false,
          deleteDialog: false,
        });
        message.success('Comment deleted');
        this.props.refetch();
      } catch (e) {
        console.log(e.message);
        message.error('Something went wrong while deleting comment.');
      }
    }
  }

  async editComment() {
    this.setState({ loading: true });
    const item = get(this, 'props.comment', null);
    if (item) {
      item.comment = get(this, 'state.editValue', '');
      try {
        await patchComment(item);
        this.setState({ loading: false, editValue: '', editDialog: false });
        message.success('Comment edited');
        this.props.refetch();
      } catch (e) {
        message.error('Something went wrong while editing comment.');
      }
    }
  }

  getUser = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userID = get(user, 'id', null);
    return userID;
  };

  loadNext() {
    let page = 1 + this.state.repliesPage;
    this.setState({
      repliesPage: page
    });
    setTimeout(() => {
      this.fetchReplies();
    }, 10);
  }

  render() {
    const loading = this.state.loading ? loader : <div />;
    const comment = get(this, 'props.comment', { comment: '' });
    let loadMoreButton = <a className="load_more" style={{ marginLeft: "50px", marginTop: "15px" }} onClick={() => this.loadNext()} >View {this.state.replies.length} replies </a>;
    if (this.state.replies.length >= this.state.repliesCount) {
      loadMoreButton = <div></div>
    }
    let ReplyContent = Replyform;
    if (!this.state.replyFormShow) {
      ReplyContent = emptyDiv;
    }
    return (
      <div style={{ width: '80%'}}>
        <Modal
          title="Edit Comment"
          visible={this.state.editDialog}
          onOk={() => this.editComment()}
          onCancel={() => this.setState({ editDialog: false })}
        >
          <Input
            value={this.state.editValue}
            onChange={e => this.setState({ editValue: e.target.value })}
          />
          {loading}
        </Modal>
        <Modal
          title="Delete Comment"
          visible={this.state.deleteDialog}
          onOk={() => this.deleteNow()}
          onCancel={() => this.setState({ deleteDialog: false })}
          okText="Delete Now"
          cancelText="cancel"
        >
          <p>Are you sure you want to delete the dialog?</p>
          {loading}
        </Modal>
        <List.Item
          actions={[
            <IconText
              onClick={() => this.vote('UP_VOTE')}
              type="like-o"
              text={this.state.totalUpvotes}
            />,
            <IconText
              onClick={() => this.vote('DOWN_VOTE')}
              type="dislike-o"
              text={this.state.totalDownvotes}
            />,
            <Icon
              type="aliwangwang"
              onClick={() =>
                this.setState({ replyFormShow: !this.state.replyFormShow })
              }
            />,
            <div
              style={{
                display:
                  this.getUser() === this.props.comment.user ? 'block' : 'none',
              }}
            >
              <IconText
                onClick={() =>
                  this.setState({
                    editDialog: true,
                    editValue: get(this, 'props.comment.comment', ''),
                  })
                }
                type="edit"
              />
              <IconText
                onClick={() => this.setState({ deleteDialog: true })}
                type="delete"
              />
            </div>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <a onClick={this.handleRedirect}>
                <Avatar src={get(this, 'state.user.image', '')} />
              </a>
            }
            title={
              <div className="title">
                <a onClick={this.handleRedirect}>
                  {get(this, 'state.user.name', '')}
                </a>
                <p style={{ display: 'inline-block', fontSize: '12px' }}>
                  {moment(+new Date(this.props.comment.created_at)).fromNow()}
                </p>
              </div>
            }
            description={comment.comment}
          />
        </List.Item>
        <ReplyContent 
          comment={comment}
          fetchReplies={() => this.fetchReplies()}
        />
        <CommentReplies
          history={this.props.history}
          replies={this.state.replies}
          refetch={this.fetchReplies}
          comment={comment}
        />
        {loadMoreButton}
      </div>
    );
  }
}

/* eslint-disable react/prefer-stateless-function */
export class ViewNews extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props.viewNews;
    this.state = {
      commentsListCount: 0,
      commentsList: [],
      commentsPage: 1,
      commentField: '',
      commentsEmpty: false,
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

  async fetchComments() {
    const { id } = this.props.match.params;
    try {
      let response = await commentsApi(id,this.state.commentsPage);
      const {data:{results,count}} = response;
      let oldComments = this.state.commentsList;
      if (count <= 10) {
        this.setState({commentsList: results,commentsListCount: count});
      }else {
        console.log(1);
        this.setState({commentsList: [...oldComments,...results],commentsListCount: count});;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async postComment(data) {
    try {
      let response = await commentWrite(data);
      let comment = response.data;
      let commentsList = [...this.state.commentsList];
      commentsList.push(comment);
      console.log(commentsList.length);
      this.setState({commentsList: commentsList});
      console.log(commentsList.length);
    } catch (e) {
      alert(`Seomthing went wrong: ${e.message}`);
    }
  }

  postReaction = async type => {
    const allReactions = get(this, 'props.viewNews.postReactions', []);
    const { id } = this.props.globalState.user;
    const userId = id;
    const postId = parseInt(get(this, 'props.match.params.id', null));
    const filter = allReactions.filter(c => c.user == userId);
    const length = get(filter, 'length', 0);
    if (length > 0) {
      const currentReaction = get(filter, '[0]', null);
      if (type == currentReaction.reaction_type) {
        await deletePostReaction(currentReaction.id);
      } else {
        currentReaction.reaction_type = type;
        await patchPostReaction(currentReaction);
      }
      console.log(currentReaction, type);
      setTimeout(() => {
        this.props.getPostReactions(postId);
      }, 500);
      setTimeout(() => {
        this.filterPostReactions();
      }, 1000);
    } else {
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
    }
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
    this.props.getPostReactions(id);
    this.fetchComments();
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
      this.postComment({
        comment: this.state.commentField,
        post: parseInt(get(this, 'props.match.params.id', null)),
        user: get(this, 'props.globalState.user.id', null),
      });
      this.setState({
        commentField: '',
      });
    }
  };

  loadNext() {
    let page = this.state.commentsPage;
    this.setState({
      commentsPage: page + 1
    });
    setTimeout(() => {
      this.fetchComments();
    },50)
  }

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

  fetchagain() {
    this.setState({
      commentsEmpty: true,
    });
    setTimeout(() => {
      this.setState({
        commentsEmpty: false,
      });
      this.props.fetchPostComments(this.props.match.params.id);
    }, 30);
  }

  renderComments = () => {
    if (this.state.commentsEmpty) {
      return <div />;
    }
    const writeReply = () => {
      const { TextArea } = Input;
      return <TextArea rows={4} />;
    };
    const comments = this.state.commentsList;
    if (comments instanceof Array) {
      if (comments.length == 0) {
        return <div>No Comments</div>;
      }
      const commentsA = comments.map(c => (
        <Comment
          history={this.props.history}
          comment={c}
          refetch={() => {
            this.fetchagain();
          }}
        />
      ));
      return (
        <div>
          <List
            itemLayout="vertical"
            pagination={false}
            size="large"
            dataSource={commentsA}
            renderItem={a => <div>{a}</div>}
          />
        </div>
      );
    }
  };

  render() {
    const { post } = this.props.viewNews;
    let loadMoreButton = <a className="load_more" onClick={() => this.loadNext()} >Load more comments</a>;
    if (this.state.commentsList.length >= this.state.commentsListCount) {
      loadMoreButton = <div></div>
    }
    return (
      <div>
        <Helmet>
          <title>View Post</title>
          <meta name="description" content="Description of ViewNews" />
        </Helmet>
        <Header history={this.props.history} />
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
                    <Col span={18} offset={3}>
                      <p className="view-sentences">{post.main_sentence}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={18} offset={3}>
                      <div className="main-sentence">
                        <p className="view-sentences">{post.sentence2}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={18} offset={3}>
                      <p className="view-sentences">{post.sentence3}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={18} offset={3}>
                      <div className="main-sentence">
                        <p className="view-sentences">{post.sentence4}</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={18} offset={3}>
                      <p className="view-sentences">{post.sentence5}</p>
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
                        height="auto"
                        width="100%"
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
                <Row>
                  <Col span={24} style={{ textAlign: 'left' }}>
                    {this.renderComments()}
                    <br />
                    <div style={{textAlign: 'left',padding: "20px 20px 20px 0",paddingTop: 0}} >
                      {loadMoreButton}
                    </div>
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
