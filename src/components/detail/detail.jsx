import React, { Component } from 'react';
import './detail.css';
import eventProxy from 'react-eventproxy';
import store from '../../store/store';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false
    };
  }
  unsubscribe() {
    store.subscribe(() =>
      console.log(store.getState()));
  }
  componentDidUpdate() {
    console.log('detail update');
    eventProxy.on('account', (account) => {
      // 状态监听
      this.setState({
        account
      });
    });
    this.unsubscribe();
  }

  render() {
    let data = store.getState().account ? 'FALSE' : 'TRUE';
    let loginStatus = this.state.account ? (<div className="blank">已登录<br />
    账号：{this.state.account.acc}<br />密码：{this.state.account.pas}
                                            </div>) : <div className="blank">{data}</div>;
    return (
      <div className="detailHome">
        {loginStatus}
      </div>
    );
  }
}

export default Detail;
