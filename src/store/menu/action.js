import * as actype from './action-type';

// 注册账户
export const registacc = account => {
  return {
    type: actype.REGISTERACC,
    account
  }
}
// reducer的方法第一个参数state是当前保存在store中的数据，第二个参数action是一个容器，用于：
// type - 一个简单的字符串常量，例如ADD, UPDATE, DELETE等。
// payload - 用于更新状态的数据
// 注册密码
export const registpas = password => {
  return {
    type: actype.REGISTERPAS,
    password
  }
}

// 点击选项
export const registcli = clicktgt => {
  return {
    type: actype.CLICKTARGET,
    clicktgt
  }
}