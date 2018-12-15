/**
 *
 * AddNews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Form, Select, Input, Button, Alert } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable react/prefer-stateless-function */
export class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail_image: '',
      embedded_image: '',
    };
  }
componentDidMount(){
  this.props.reset()
}
  getBase64 = (file, attribute) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const a = this;
    reader.onload = function() {
      a.setState({
        [attribute]: reader.result,
      });
    };
    reader.onerror = function(error) {};
  };

  handleFileUpload(e, attribute) {
    e.persist();
    this.getBase64(e.target.files[0], attribute);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.embedded_image = this.state.embedded_image;
      values.thumbnail_image = this.state.thumbnail_image;
      values.user = 1;
      if (!err) {
        this.props.addPost(values);
      }
    });
    setTimeout(() => {
      const { response } = this.props.addNews;
      if (response && response.status && response.status === 201) {
        this.props.history.push(`/view/${response.message.id}`);
      }
    }, 1500);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const {response} = this.props.addNews
    return (
      <div>
        <Helmet>
          <title>AddNews</title>
          <meta name="description" content="Description of AddNews" />
        </Helmet>
        <Header history={this.props.history}/>
        <div className="container">
          <div className="bg-white">
            <Row>
              <Col span={18} offset={3}>
                <Form onSubmit={this.handleSubmit} hideRequiredMark={false}>
                  <FormItem label="Title" {...formItemLayout}>
                    {getFieldDecorator('title', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your title!',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter your title"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Thumbnail image" {...formItemLayout}>
                    {getFieldDecorator('thumbnail_image', {})(
                      <div>
                        <input
                          style={{ display: 'none' }}
                          className="one-upload-thumbnail"
                          onChange={e =>
                            this.handleFileUpload(e, 'thumbnail_image')
                          }
                          type="file"
                        />
                        <Button
                          onClick={() =>
                            document
                              .querySelector('.one-upload-thumbnail')
                              .click()
                          }
                        >
                          Upload
                        </Button>
                      </div>,
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Category" hasFeedback>
                    {getFieldDecorator('category', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your category',
                        },
                      ],
                    })(
                      <Select placeholder="Select category">
                        <Option value="Economy">Economy</Option>
                        <Option value="Politics">Politics</Option>
                        <Option value="Tech">Tech</Option>
                        <Option value="Life">Life</Option>
                        <Option value="Entertainment">Entertainment</Option>
                        <Option value="Opinion">Opinion</Option>
                      </Select>,
                    )}
                  </FormItem>
                  <FormItem label="Author" {...formItemLayout}>
                    {getFieldDecorator('author', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter author name',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter author name"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Author description" {...formItemLayout}>
                    {getFieldDecorator('author_description', {})(
                      <TextArea
                        type="text"
                        placeholder="Please enter author description"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Source" {...formItemLayout}>
                    {getFieldDecorator('source', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter source',
                        },
                      ],
                    })(<Input type="text" placeholder="Please enter source" />)}
                  </FormItem>
                  <FormItem label="Main Sentence" {...formItemLayout}>
                    {getFieldDecorator('main_sentence', {
                      rules: [
                        {
                          required: true,
                          message: 'Please write something here',
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence2', {
                      rules: [],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence3', {
                      rules: [],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence4', {
                      rules: [],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence5', {
                      rules: [],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people1', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people2', {
                      rules: [
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people3', {
                      rules: [
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people4', {
                      rules: [
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Embedded image" {...formItemLayout}>
                    {getFieldDecorator('embedded_image', {})(
                      <div>
                        <input
                          style={{ display: 'none' }}
                          className="one-upload"
                          onChange={e =>
                            this.handleFileUpload(e, 'embedded_image')
                          }
                          type="file"
                        />
                        <Button
                          onClick={() =>
                            document.querySelector('.one-upload').click()
                          }
                        >
                          Upload
                        </Button>
                      </div>,
                    )}
                  </FormItem>
                  {response &&
                    response.status &&
                    response.status !== 201 && (
                      <Alert
                        message="Something went wrong with server please try again!"
                        type="error"
                        showIcon
                        style={{ marginTop: "20px", marginBottom: "0" }}
                      />
                    )}
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      Publish
                    </Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
const NewForm = Form.create()(AddNews);
AddNews.propTypes = {};

const mapStateToProps = createStructuredSelector({
  addNews: makeSelectAddNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addPost: payload => dispatch(a.addPost(payload)),
    reset: () => dispatch(a.resetResponse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addNews', reducer });
const withSaga = injectSaga({ key: 'addNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewForm);
