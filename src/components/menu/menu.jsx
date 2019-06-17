import React, {Component} from 'react'
import logo from '../../img/logo.svg'
import iconAccount from '../../icon/icon-account.svg'
import './menu.css'
import '../../icon/coffeeicon/iconfont.css'
import store from '../../store/store'
import {registacc} from '../../store/menu/action'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuSwitch: true,
      menuMore: false
    }
  }
  goMenuMore() {
    this.setState({
      menuSwitch: !this.state.menuSwitch,
      menuMore: !this.state.menuMore
    })
  }
  goLogin() {
    this.props.transFromMenu(true);
  }
  clickTarget() {
    // console.log('下发数据成功');
    store.dispatch(registacc(1111111111));
  }
  displayText() {
    console.log('555')
    store.dispatch(registacc('你点击了menu'));
  }
  // readyState() {
  //   if (document.readyState) {
  //     console.log('加载完成');
  //   } else {
  //     console.log('loading');
  //   }
  // }
  // componentWillMount() {
  //   this.readyState();
  // }
  // componentDidMount() {
  //   this.readyState();
  // }
  render() {
    let menuhide = this.state.menuSwitch
      ? ''
      : 'hide';
    let iconSwitch = this.state.menuSwitch
      ? <i
          className="iconfont icon-menu"
          onClick={this
          .goMenuMore
          .bind(this)}
          alt="menuIcon">&#xe672;</i>
      : <i
        className="iconfont icon-menu"
        onClick={this
        .goMenuMore
        .bind(this)}
        alt="menuIcon">&#xe604;</i>;
    let menuSwitch = this.state.menuSwitch
      ? 'menuMain'
      : 'menuMain hide';
    let menuMore = this.state.menuMore
      ? 'menuMore'
      : 'menuMore hidden';
    const menuList = [
      '门店',
      '星享俱乐部',
      '菜单',
      '<hr></hr>',
      '星巴克移动应用',
      '星礼卡',
      '星巴克臻选<sup>TM</sup>',
      '咖啡星讲堂',
      '上海烘培工坊',
      '关于星巴克',
      '帮助中心',
      '<hr></hr>'
    ];
    const listItems = menuList.map((item, index) =><li key = {index}
    dangerouslySetInnerHTML = {{ __html: item }} onClick={this.clickTarget.bind(this)}></li>);
    // dangerouslySetInnerHTML：将JS中的标签转化为HTML语言
    return (
      <div className="menuHome">
        <div className="menuHead">
          <a
            href="https://www.starbucks.com.cn/"
            target="_blank"
            rel="noopener noreferrer"><img src={logo} className="icon-logo" alt="logo"/></a>
          <a className={menuhide} onClick={this.displayText.bind(this)}>门店</a>
          <a className={menuhide}>我的账户</a>
          <a className={['moremenu', menuhide].join(' ')}>菜单</a>
          {iconSwitch}{/* react拼接class的方法 */}
        </div>
        <div className={menuSwitch}>
          <p className="menuMainTxt">心情惬意，来杯咖啡吧&nbsp;<i className="iconfont coffee" alt="coffee">&#xe6de;</i>
            {/* 引用阿里icon库的icon */}
          </p>
          <div className="loginbar">
            <div>
              <img src={iconAccount} className="icon-account" alt="iconAccount"/>
              <span className="loginBtn" onClick={this.goLogin.bind(this)}>登录</span>
            </div>
            <div className="regedit">注册</div>
          </div>
        </div>
        <div className={menuMore}>
          <ul className="listul">
            {listItems}
            <div className="loginbar">
              <div>
                <img src={iconAccount} className="icon-account" alt="iconAccount"/>
                <span className="loginBtn" onClick={this.goLogin.bind(this)}>登录</span>
              </div>
              <div className="regedit">注册</div>
            </div>
          </ul>
          <div className="footbar">
            <ul>
              <li>
                <a>English</a>
                |
                <a>
                  隐私政策</a>
                |
                <a>
                  使用条款</a>
              </li>
              <li>
                <img className="icpcicon" src={require("../../icon/icpicon.png")} alt="icp"/>{/* react引入图片的方法 */}
                <a>沪公网安备31010402000318号</a>
                |
              </li>
              <li>
                <a>沪ICP备17003747号</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Menu