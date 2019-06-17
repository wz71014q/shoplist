import React, {Component} from 'react';
import './login.css'
import eventProxy from 'react-eventproxy'

class Detail extends Component {
  constructor(props){
    super(props)
    this.state={
      // value: ''
    }
  }
  loginStart() {
    let acc = this.refs.refAccount.value;
    let pas = this.refs.refPassword.value;
    let accountInf = {acc: acc, pas: pas};
    if(acc !== '' || pas !== ''){
      this.props.transFromMenu(false); // 通过props给父组件传值
      eventProxy.trigger('account', accountInf); // 通过eventProxy状态分发
    } else {
      alert('账号或密码错误！');
    }
  }
  loginHide() {
    this.props.transFromMenu(false);
  }
  render() {
    let loginStatus = this.props.fromM_login ? 'loginContainer' : 'loginContainer loginHide'
    return (
      <div className={loginStatus}>
        <div className="mask" onClick = {this.loginHide.bind(this)}></div>
        <div className="loginwrap">
        <form className="loginer">
          <label htmlFor="account">账号: </label>
          <input type="text" name="account" ref='refAccount' placeholder="请输入账号" value = {this.state.value}/>
          <hr></hr>
          <label htmlFor="password">密码: </label>
          <input type="text" name="password" ref='refPassword' placeholder="请输入密码"/>
        </form>
        <div className="submit">
          <input type="button" value="确定" onClick = {this.loginStart.bind(this)}/>
          <input type="button" value="取消" onClick = {this.loginHide.bind(this)}/>
        </div>
        </div>
      </div>
    )
  }
}

export default Detail