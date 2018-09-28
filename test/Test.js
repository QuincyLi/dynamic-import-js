import React, { Component } from 'react';
import { Input } from 'antd';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      test: 123
    }
    // this.clickHandler.bind(this);
  }
  clickHandler() {
    this.setState({
      test: 321
    });
  }
  render() {
    return (
      <div>
        <Input />
        <button onClick={this.clickHandler.bind(this)} >Click me</button>
        {this.state.test}
      </div>
    );
  }
}

export default Test;