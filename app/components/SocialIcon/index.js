import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid ${props => props.color};
  margin: 15px 5px;
  i {
    line-height: 30px;
    color: ${props => props.color};
    font-size: 18px;
    svg {
      margin-top: -7px;
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
const SocialIcon = props => {
  const { icon } = props;
  return (
    <Wrapper {...props}>
      <Icon type={icon} />
      {props.children}
    </Wrapper>
  );
};

SocialIcon.propTypes = {};

export default SocialIcon;
