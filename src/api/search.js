import request from '@/utiles/request'
export function getSearchSuggestion (q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export function getSearchResults (params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
