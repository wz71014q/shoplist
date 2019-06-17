function addToCart(data) {
  // 创建action
  return {
    type: 'TEST',
    payload: { data }
  }
}

export const homeReducer = function(state=[], action) {
  return state;
}// 创建reducer