import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../components/home/home';


export default class RouteConfig extends Component {
  render() {
    const root =
      (<Router><Route path="/" exact component={Home} />{/* exact表示开启严格匹配 */}</Router>);
    return (
      root
    );
  }
}
