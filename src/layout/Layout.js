import React, { Component } from 'react';
import ReactDom from 'react-dom';

import UploadFile from '../components/uploadFile/UploadFile';
import { getUploadJS } from '../services/uploadFiles';

class Layout extends Component {
  state = {
    compName: ''
  }

  setCompName = (compName) => {
    this.setState({
      compName
    }, () => {
      this.displayUploadJS();
    });
  }

  displayUploadJS = () => {
    getUploadJS(this.state.compName).then((res) => {
      // ReactDom.hydrate(res.html, this.target);
      this.setState({
        html: res.html
      });
    });
  }

  render() {
    return (
      <>
        <UploadFile
          setCompName={this.setCompName}
        />
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </>
    );
  }
}

export default Layout;