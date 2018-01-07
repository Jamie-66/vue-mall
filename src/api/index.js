import http from './public'
// 登录
export const userLogin = (params) => {
  return http.fetchGet('/consumer/loginSubmit', params)
}
// 短信验证码
export const identifyCode = (params) => {
  return http.fetchGet('/sms/send', params)
}
// 退出登录
export const loginOut = (params) => {
  return http.fetchPost('/consumer/cUser/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/consumer/cUser/loginUser', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchGet('/consumer/cUser/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/users/upload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/users/updateheadimage', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/goods/productHome', params)
}
// 修改用户信息
export const editUser = (params) => {
  return http.fetchGet('/consumer/cUser/editUser', params)
}
// 修改密码
export const editPassword = (params) => {
  return http.fetchGet('/consumer/cUser/updatePassword', params)
}

