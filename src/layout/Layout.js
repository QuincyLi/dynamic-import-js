import React, { Component } from 'react';
import ReactDom from 'react-dom';
// import babel from '@babel/standalone';

import { capture, captureWay } from '../util/loadES6Module';
import { getUploadJS } from '../services/uploadFiles';
import UploadFile from '../components/uploadFile/UploadFile';

class Layout extends Component {
  state = {
    compName: '',
    Widget: null
  }

  componentDidCatch(err) {
    console.log(err);
  }

  setCompName = (compName) => {
    this.setState({
      compName
    }, () => {
      this.displayUploadJS();
    });
  }

  displayUploadJS = () => {
    // getUploadJS(this.state.compName).then((res) => {
    //   const widget = eval(res.html);
    //   const widget = new Function(res.html)
    //   this.setState({
    //     Widget: widget
    //   });
    // });

    // capture(this.state.compName).then((res) => {
    //   console.log(res);
    // });

    // capture(this.state.compName).then((html) => {
    //   this.setState({
    //     html
    //   });
    //   // ReactDom.hydrate(html, this.div);
    // });

    captureWay(this.state.compName).then((Widget) => {
      this.setState({
        Widget
      });
    });
    // import(`${this.state.compName}`).then((res) =>{
    //   console.log(res);
    // });
  }

  render() {
    const { Widget } = this.state;
    return (
      <>
        <UploadFile
          setCompName={this.setCompName}
        />
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
        {Widget ? <Widget 
        
        /> : <span>Loading...</span>}
      </>
    );
  }
}

export default Layout;