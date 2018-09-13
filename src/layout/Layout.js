import React, { Component } from 'react';
import UploadFile from '../components/uploadFile/UploadFile';
import { dynamic } from '../util/dynamicImportComponent';

class Layout extends Component {
  render() {
    return (
      <>
        <UploadFile />
      </>
    );
  }
}

export default Layout;