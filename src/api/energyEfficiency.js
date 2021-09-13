import request from '@/utils/request'

export function voyageList(query) {
  return request({
    url: '/energyEfficiency/voyageList',
    method: 'get',
    params: query
  })
}
export function getRawVoyagePortByVoyageId(query) {
  return request({
    url: '/energyEfficiency/getRawVoyagePortByVoyageId',
    method: 'get',
    params: query
  })
}
export function getPortInfo(query) {
  return request({
    url: '/portArrDept/getPortInfo',
    method: 'get',
    params: query
  })
}

export function portList(query) {
  return request({
    url: '/energyEfficiency/portList',
    method: 'get',
    params: { query }
  })
}

export function createVoyage(data) {
  return request({
    url: '/energyEfficiency/createVoyage',
    method: 'post',
    data
  })
}

export function updateVoyage(data) {
  return request({
    url: '/energyEfficiency/updateVoyage',
    method: 'post',
    data
  })
}

export function createPort(data) {
  return request({
    url: '/energyEfficiency/createAndUpdatePortAndAnchorOrDrifting',
    method: 'post',
    data
  })
}

export function updatePort(data) {
  return request({
    url: '/energyEfficiency/createAndUpdatePortAndAnchorOrDrifting',
    method: 'post',
    data
  })
}
export function createIceAndRescue(data) {
  return request({
    url: '/energyEfficiency/createAndUpdateIceClassAndRescue',
    method: 'post',
    data
  })
}
export function deleteVolage(data) {
  return request({
    url: '/energyEfficiency/deleteVolageList',
    method: 'post',
    data
  })
}
export function deletePort(data) {
  return request({
    url: '/energyEfficiency/deleteVolagePortList',
    method: 'post',
    data
  })
}
export function deleteSpec(data) {
  return request({
    url: '/energyEfficiency/deleteVolageIceClassAndRescueList',
    method: 'post',
    data
  })
}
export function lockOrUnlock(data) {
  return request({
    url: '/energyEfficiency/lockVoyageSatus',
    method: 'post',
    data
  })
}
export function generatorVolage(data) {
  return request({
    url: '/energyEfficiency/generatorVoyageInfo',
    method: 'post',
    data
  })
}
