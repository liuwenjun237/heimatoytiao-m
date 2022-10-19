import request from '@/utiles/request'
// 获取评论
export function getComments (data) {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: data
  })
}
// 点赞评论
export function addCommentLike (target) {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export function deleteCommentLike (target) {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 发布评论
export function publishComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
