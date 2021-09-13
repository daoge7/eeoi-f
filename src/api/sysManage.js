import request from '@/utils/request'

// user
export function userList(query) {
  return request({
    url: '/sysUser/userList',
    method: 'get',
    params: query
  })
}
export function userShipCompanyList(query) {
  return request({
    url: '/gcClient/findGcClientlist',
    method: 'get',
    params: query
  })
}

export function userDetail(id) {
  return request({
    url: '/sysUser/userDetail',
    method: 'get',
    params: { id }
  })
}

export function createSysUser(data) {
  return request({
    url: '/sysUser/createUser',
    method: 'post',
    data
  })
}

export function updateSysUser(data) {
  return request({
    url: '/sysUser/createUser',
    method: 'post',
    data
  })
}

export function deleteSysUser(data) {
  return request({
    url: '/sysUser/deleteUser',
    method: 'post',
    data
  })
}

// role
export function roleList(query) {
  return request({
    url: '/sysRole/roleList',
    method: 'get',
    params: query
  })
}

export function roleDetail(roleId) {
  return request({
    url: '/sysRole/roleDetail',
    method: 'get',
    params: { roleId }
  })
}

export function createSysRole(data) {
  return request({
    url: '/sysRole/saveRole',
    method: 'post',
    data
  })
}

export function updateSysRole(data) {
  return request({
    url: '/sysRole/updateRole',
    method: 'post',
    data
  })
}
// dic
export function dicList(query) {
  return request({
    url: '/sysDic/dicList',
    method: 'get',
    params: query
  })
}

export function dicDetail(id) {
  return request({
    url: '/sysDic/dicDetail',
    method: 'get',
    params: { id }
  })
}

export function createSysDic(data) {
  return request({
    url: '/sysDic/createDic',
    method: 'post',
    data
  })
}

export function updateSysDic(data) {
  return request({
    url: '/sysDic/updateDic',
    method: 'post',
    data
  })
}
// func
export function funcList(query) {
  return request({
    url: '/sysFunc/funcList',
    method: 'get',
    params: query
  })
}

export function funcDetail(id) {
  return request({
    url: '/sysFunc/funcDetail',
    method: 'get',
    params: { id }
  })
}

export function createSysFunc(data) {
  return request({
    url: '/sysFunc/createFunc',
    method: 'post',
    data
  })
}

export function updateSysFunc(data) {
  return request({
    url: '/sysFunc/updateFunc',
    method: 'post',
    data
  })
}

// syslog
export function logList(query) {
  return request({
    url: '/sysLog/logList',
    method: 'get',
    params: query
  })
}

export function logDetail(id) {
  return request({
    url: '/sysLog/logDetail',
    method: 'get',
    params: { id }
  })
}

// sysShipAuth
export function authUserList(query) {
  return request({
    url: '/sysUser/userList',
    method: 'get',
    params: query
  })
}

export function authShipList(query) {
  return request({
    url: '/sysShipAuth/shipList',
    method: 'get',
    params: query
  })
}
