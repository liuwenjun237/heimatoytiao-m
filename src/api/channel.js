import request from '@/utiles/request'
export function getAllChannels (data) {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export function addUserChannels (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [data]
    }
  })
}
export function deleteUserChannels (data) {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${data}`
  })
}
