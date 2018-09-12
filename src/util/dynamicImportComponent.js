import React, { Component } from 'react';

export function dynamic(component) {
  return class dynamicWrapper extends Component {
    state = {
      LoadedComp: null
    }

    componentDidMount() {
      this.mounted = true;
      if (typeof component === 'function') {
        component()
          .then(res => res.default)
          .then((resComp) => {
            if (this.mounted) {
              this.setState({
                LoadedComp: resComp
              });
            }
          }).catch((error) => {
            console.error(error);
          })
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