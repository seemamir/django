import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Row, Col, Alert, notification } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as a from './actions';
import {sendVerificationEmail} from './api';
const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
export class Signup extends React.Component {
  componentDidMount(){
    this.props.reset();
  }
  handleLogin = () => {
    this.props.history.push(`/`);
  };
  
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createAccount(values);
        setTimeout(() => {
          const { response } = this.props.signup;
          if (response && response.status && response.status === 201) {
              notification["success"]({
                message: 'Account created',
                description: 'Your account has been created successfuly. ',
              });
              this.props.history.push('/');
          }
        }, 3000);
      }
    });
  };

  handleErrors = () => {
    const { response } = this.props.signup;
    if (response && response.message && response.message.non_field_errors) {
      return response.message.non_field_errors;
    }
    if (response && response.message && response.message.email) {
      return response.message.email;
    }
    if (response && response.message && response.message.password1) {
      return response.message.password1;
    }
    return 'Something went wrong';
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { response } = this.props.signup;

    return (
      <div>
        <Helmet>
          <title>Signup</title>
          <meta name="description" content="Description of Signup" />
        </Helmet>
        <Row justify="center">
          <Col span={8} offset={8}>
            <div className="wrapper">
              <Icon type="smile" className="logo" theme="outlined" />
              <h3>Setup your new account</h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Email"
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password1', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your Password!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password2', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm password!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Confirm Password"
                    />,
                  )}
                </FormItem>
                {response &&
                  response.status &&
                  response.status !== 201 && (
                    <Alert
                      message={
                        this.handleErrors()
                      }
                      type="error"
                      showIcon
                    />
                  )}
                
                <FormItem>
                  <Button
                    type="primary"
                    className="login-form-button"
                    htmlType="submit"
                  >
                    Register <Icon type="arrow-right" />
                  </Button>

                  <div className="content-divider signup">
                    <span>Already have an account?</span>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="btn-success signup-btn"
                    onClick={this.handleLogin}
                  >
                    Login
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
const SignupForm = Form.create()(Signup);

Signup.propTypes = {};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createAccount: payload => dispatch(a.createAccount(payload)),
    reset: () => dispatch(a.resetResponse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signup', reducer });
const withSaga = injectSaga({ key: 'signup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupForm);
