/**
 *
 * Footer
 *
 */

import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Footter() {
  return (
    <Footer
      style={{
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      All rights reserved ©2018.
    </Footer>
  );
}

Footter.propTypes = {};

export default Footter;
