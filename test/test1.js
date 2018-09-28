import React, { Component } from 'react';

class Test extends Component {
  constructor() {
    this.state = {
      test: 123
    }
  }
  clickHandler = () => {
    this.state({
      test: 321
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler} />
        {this.state.test}
      </div>
    );
  }
}

export default Test;