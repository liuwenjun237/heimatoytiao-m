import request from '@/utiles/request'
// import store from '@/store/index'
// export  login = (data) => {
//   return request({
//     method: 'POST',
//     url: '/v1_0/authorizations',
//     data
//   })
// }
export function login (data) {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export function SendMs (mobile) {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export function getUserChannels () {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export function addFollow (target) {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注
export function daleteFollow (target) {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 获取用户信息
export function getUserProfile () {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 更新用户昵称
export function fixUserName (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
