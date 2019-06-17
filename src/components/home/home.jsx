import React, { Component } from 'react';
// import asyncComponent from '../../utils/asyncComponent';
import './home.css';
import Menu from '../../components/menu/menu';
import Detail from '../../components/detail/detail';
import Login from '../login/login';
// const Menu = asyncComponent(() => import("../../components/menu/menu"))
// const Detail = asyncComponent(() => import("../../components/detail/detail"))
// 模块加载：asyncComponent函数返回值是一个react组件，组件内部帮你做好了then()方法的操作
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromMlogin: false
    };
  }
  componentDidUpdate() {
    console.log('home update');
  }
  transFromMenu(fromMlogin) {
    // 用props传值
    this.setState({
      fromMlogin
    });
  }
  render() {
    return (
      <div className="home">
        <Menu transFromMenu={(fromMlogin) => { this.transFromMenu(fromMlogin); }} />
        <Detail />
        <Login fromMlogin={this.state.fromMlogin} transFromMenu={(fromMlogin) => { this.transFromMenu(fromMlogin); }} />
      </div>
    );
  }
}

export default Home;
