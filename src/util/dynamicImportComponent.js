import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { getUploadJS } from '../services/uploadFiles';
export function dynamic(component) {
  return class dynamicWrapper extends Component {
    state = {
      LoadedComp: null
    }

    componentDidMount() {
      this.mounted = true;
      if (typeof component === 'string' && component) {
        getUploadJS(component).then((res) => {
          ReactDom.hydrate(res.html);
        });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { LoadedComp } = this.state;
      return LoadedComp ? <LoadedComp /> : (<span>Loading...</span>);
    }
  }
}