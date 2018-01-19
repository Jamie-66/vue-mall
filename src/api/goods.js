import http from './public'
// 商品列表
export const getGoods = (params) => {
  return http.fetchGet('/consumer/goods/getGoodsList', params)
}
// 商品详情
export const getGoodsDet = (params) => {
  return http.fetchGet('/consumer/goods/getGoods', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchGet('/consumer/cart/getCartPage', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchGet('/consumer/cart/addCart', params)
}
// 加入购物车--本地
export const addCart1 = (params) => {
  return http.fetchPost('/goods/addCart1', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/consumer/cart/delCart', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/consumer/cart/delCart', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/users/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchGet('/consumer/cart/delCartAll', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchGet('/consumer/address/getAddressList', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchGet('/consumer/address/updateAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchGet('/consumer/address/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchGet('/consumer/address/delAddress', params)
}
// 获取收货地址详情
export const addressDet = (params) => {
  return http.fetchGet('/consumer/address/getAddressById', params)
}
// 设置默认收货地址
export const addressDef = (params) => {
  return http.fetchGet('/consumer/address/setDefaultAddress', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/users/payMent', params)
}
// 订单列表
export const orderList = (params) => {
  return http.fetchPost('/users/orderList', params)
}
// 生成订单
export const createOrder = (params) => {
  return http.fetchGet('/consumer/order/addOrderByCart', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost('/users/delOrder', params)
}
// 商品足迹
export const footPrint = (params) => {
  return http.fetchGet('/consumer/behavior/getBehaviorPage', params)
}
