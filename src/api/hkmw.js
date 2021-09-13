import request from '@/utils/request'

export function internalList(query) {
  return request({
    url: '/hkmw/internalList',
    method: 'get',
    params: query
  })
}

export function createInternal(data) {
    return request({
        url: '/hkmw/createInternal',
        method: 'post',
        data
    })
}
export function submitInternal(data) {
  return request({
      url: '/hkmw/submitInternal',
      method: 'post',
      data
  })
}
export function todoList() {
  return request({
    url: '/todolist',
    method: 'get'
  })
}

export function internalDetail(bussinessId) {
  return request({
    url: '/hkmw/internalDetail',
    method: 'get',
    params: { bussinessId }
  })
}

export function wlOldList(bussinessId) {
  return request({
    url: '/taskhistorylist',
    method: 'get',
    params: { bussinessId }
  })
}

export function auditInternal(data) {
  return request({
      url: '/hkmw/auditInternal',
      method: 'post',
      data
  })
}