import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Form, Icon, Input, Button, Row, Col,Alert } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForgetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as a from './actions';
const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
export class ForgetPassword extends React.Component {
  componentDidMount(){
    this.props.reset()
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.forgetAction({email:values.email});
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {response} = this.props.forgetPassword;
    return (
      <div>
        <Helmet>
          <title>ForgetPassword</title>
          <meta name="description" content="Description of ForgetPassword" />
        </Helmet>
        <Row justify="center">
          <Col span={8} offset={8}>
            <div className="wrapper">
              <Icon type="sync" spin className="logo" />
              <h3>Password recovery</h3>
              <p>We'll send you instructions in email</p>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your email!',
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
                {response &&
                  response.status &&
                  response.status === 200 && (
                    <Alert
                      message={response.message.detail}
                      type="success"
                      showIcon
                    />
                  )}
                {response &&
                  response.status &&
                  response.status !== 200 && (
                    <Alert
                      message="Something went wrong. Please try again later."
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
                    Forget password
                  </Button>
                </FormItem>
                <div className="go-back">
                  <Link to="/">Go back</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
const ForgetPasswordForm = Form.create()(ForgetPassword);

ForgetPassword.propTypes = {};

const mapStateToProps = createStructuredSelector({
  forgetPassword: makeSelectForgetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    forgetAction: payload => dispatch(a.forgetPassword(payload)),
    reset: () => dispatch(a.resetResponse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgetPassword', reducer });
const withSaga = injectSaga({ key: 'forgetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgetPasswordForm);
