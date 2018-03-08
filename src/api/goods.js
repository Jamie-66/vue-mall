import http from './public'
// 活动轮播
export const getActivities = (params) => {
  return http.fetchGet('/consumer/activity/getActivityList', params)
}
// 商品列表
export const getGoods = (params) => {
  return http.fetchGet('/consumer/goods/getGoodsList', params)
}
// 商品详情
export const getGoodsDet = (params) => {
  return http.fetchGet('/consumer/goods/getGoods', params)
}
// 商品评价列表
export const getGoodsEvalList = (params) => {
  return http.fetchGet('/consumer/order/getGoodsEvaluateList', params)
}
// 商品评价
export const setGoodsEval = (params) => {
  return http.fetchGet('/consumer/order/setGoodsEvaluate', params)
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
// 修改购物车商品数量
export const cartEditNum = (params) => {
  return http.fetchGet('/consumer/cart/updateCartNum', params)
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
  return http.fetchGet('/consumer/order/getOrderList', params)
}
// 生成订单
export const createOrder = (params) => {
  return http.fetchGet('/consumer/order/addOrderByCart', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/consumer/order/delOrder', params)
}
// 修改订单状态
export const setOrderState = (params) => {
  return http.fetchGet('/consumer/order/setOrderState', params)
}
// 商品足迹
export const footPrint = (params) => {
  return http.fetchGet('/consumer/behavior/getBehaviorPage', params)
}
// 收藏列表
export const getCollections = (params) => {
  return http.fetchGet('/consumer/collect/getCollectGoodsPage', params)
}
// 添加收藏
export const collectionAdd = (params) => {
  return http.fetchGet('/consumer/collect/save', params)
}
// 删除收藏
export const collectinDel = (params) => {
  return http.fetchGet('/consumer/collect/delete', params)
}
