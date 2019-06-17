import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({component});
    }
    render() {
      const Thiscomponet = this.state.component;
      return Thiscomponet ? <Thiscomponet {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}
