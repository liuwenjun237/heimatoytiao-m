import request from '@/utiles/request'
export function getArticles (data) {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: data
  })
}
export function getConArticle (articleId) {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export function collectArticle (articleID) {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections/',
    data: {
      target: articleID
    }
  })
}
// 取消收藏
export function deCollectArticle (articleId) {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${articleId}`
  })
}
