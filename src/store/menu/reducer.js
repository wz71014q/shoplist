import * as actype from './action-type';

let defaultState = {
  account: '', // 注册账户
  password: '', // 注册密码
  clicktgt: '' // 点击对象
}

// 首页表单数据
export const formMenu = (state = defaultState , action) => {
  switch(action.type){
    case actype.REGISTERACC:
      return {...state, ...{account: action.account}};
    case actype.REGISTERPAS:
      return {...state, ...{password: action.password}};
    case actype.CLICKTARGET:
      return {...state, ...{clicktgt: action.clicktgt}};
    default:
      return state;
  }
}