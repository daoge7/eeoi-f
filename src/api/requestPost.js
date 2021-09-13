import request from '@/utils/request'

export function postFormData(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function deleteDataById(url, id) {
  return request({
    url: url,
    method: 'post',
    id: id
  })
}
// 数据评估
export function dataAssessment(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
// 导出异常数据
export function downloadDataAssessment(url, data) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 航段监测
export function segmentMonitoring(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
// 导出异常数据
export function downloadSegmentMonitoring(url, data) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 生成dcs报告
export function generatorImoRpt(data) {
  return request({
    url: '/mrv/generatorImoRpt',
    method: 'post',
    data,
    timeout: 10*60*1000
  })
}
// 删除报告
export function deleteImoStdRpt(data) {
  return request({
    url: '/mrv/deleteImoStdRpt',
    method: 'post',
    data
  })
}
// 锁定和解锁报告
export function imoLockOrUnlock(data) {
  return request({
    url: '/mrv/imoLockOrUnlock',
    method: 'post',
    data
  })
}
// 标记报告状态
export function imoStdRptStatusTag(data) {
  return request({
    url: '/mrv/imoReport',
    method: 'post',
    data
  })
}
// 查询报告
export function getImoStdRpts(data) {
  return request({
    url: '/mrv/getImoStdRpts',
    method: 'post',
    data
  })
}
// 保存生成dcs报告接口
export function saveImoRpt(data) {
  return request({
    url: '/mrv/saveImoRpt',
    method: 'post',
    data
  })
}

// 手动填写报告
export function saveManualDcs(data) {
  return request({
    url: '/mrv/saveManualDcs',
    method: 'post',
    data
  })
}
// 查看填写报告
export function getManuleDcs(data) {
  return request({
    url: '/mrv/getManuleDcs',
    method: 'post',
    data
  })
}
// 导出dcs报表
export function downLoadDcs(data) {
  return request({
    url: '/mrv/downLoadDcs',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 导出coll报表
export function downLoadCollectionData(data) {
  return request({
    url: '/mrv/downLoadCollectionData',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
export function downLoadBdnData(data) {
  return request({
    url: '/mrv/downLoadBdnData',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
export function downLoadManualImoBdnData(data) {
  return request({
    url: '/sysPcappVersion/downloadFile?path=' + data.bdnFileDir + '&fileName=' + data.bdnFileName,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
export function downLoadManualImoCdData(data) {
  return request({
    url: '/sysPcappVersion/downloadFile?path=' + data.cdFileDir + '&fileName=' + data.cdFileName,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
export function downLoadManualBdnData(data) {
  return request({
    url: '/mrv/downLoadBdnData',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 内河船添加APP用户
export function saveAppUser(data) {
  return request({
    url: '/sysUser/saveAppUser',
    method: 'post',
    data
  })
}
// 增加期初量
export function saveAndUpdatePeriodOil(data) {
  return request({
    url: '/mrv/saveAndUpdatePeriodOil',
    method: 'post',
    data
  })
}
// 查询期初量
export function getPeriodOil(data) {
  return request({
    url: '/mrv/getPeriodOil',
    method: 'post',
    data
  })
}
// 删除期初量
export function deletePeriodOil(data) {
  return request({
    url: '/mrv/deletePeriodOil',
    method: 'post',
    data
  })
}
// 锁定期初量
export function lockOrUnlock(data) {
  return request({
    url: '/mrv/lockOrUnlock',
    method: 'post',
    data
  })
}
// 保存和更新船舶理论能耗
export function saveAndUpdateTfc(data) {
  return request({
    url: '/shipManager/saveAndUpdateTfc',
    method: 'post',
    data
  })
}
// 删除理论能耗
export function deleteTfc(data) {
  return request({
    url: '/shipManager/deleteTfc',
    method: 'post',
    data
  })
}
// 管理报告接口
export function getEudcs(data) {
  return request({
    url: '/mrv/getEudcs',
    method: 'post',
    data
  })
}
// 生成欧盟排放报告
export function generatorEuDcs(data) {
  return request({
    url: '/mrv/generatorEuDcs',
    method: 'post',
    data
  })
}
// 解锁或锁定欧盟报告
export function lockOrUnlockEuDcs(data) {
  return request({
    url: '/mrv/lockOrUnlockEuDcs',
    method: 'post',
    data
  })
}
// 删除报告接口
export function deleteEuDcs(data) {
  return request({
    url: '/mrv/deleteEuDcs',
    method: 'post',
    data
  })
}
// 欧盟报告下载接口
export function downEuDcs(data) {
  return request({
    url: '/mrv/downEuDcs',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 保存欧盟报告接口
export function saveEuDcs(data) {
  return request({
    url: '/mrv/saveEuDcs',
    method: 'post',
    data
  })
}
// 单船年度能效数据统计和能效指标统计接口
export function singalShipYear(data) {
  return request({
    url: '/mrv/singalShipYear',
    method: 'post',
    data
  })
}
// 单船年度能效数据和能效指标导出接口
export function downLoadSigalShip(data) {
  return request({
    url: '/mrv/downLoadSigalShip',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 公司年度能效数据和能效理论数据导出
export function downLoadComPanyShip(data) {
  return request({
    url: '/mrv/downLoadComPanyShip',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 公司年年度能效数据和能效理论数据接口
export function shipComPanyYear(data) {
  return request({
    url: '/mrv/shipComPanyYear',
    method: 'post',
    data
  })
}
// 下载利比亚报告
export function imoReportLibya(data) {
  return request({
    url: '/mrv/imoReportLibya',
    method: 'post',
    data
  })
}
// 添加FLAG/DOC变更
export function saveFlagDocChange(data) {
  return request({
    url: '/flagDocChange/saveFlagDocChange',
    method: 'post',
    data
  })
}
// 能效趋势分析图表
export function getEnergyEfficencyTrend(data) {
  return request({
    url: '/mrv/getEnergyEfficencyTrend',
    method: 'post',
    data
  })
}
// 能效比较分析图表
export function getCompareAnalysisData(data) {
  return request({
    url: '/mrv/getCompareAnalysisData',
    method: 'post',
    data
  })
}
// 能效趋势分析列表
export function getEnergyEfficencyTrendData(data) {
  return request({
    url: '/mrv/getEnergyEfficencyTrendData',
    method: 'post',
    data
  })
}
// 能效比较分析列表
export function getCompareAnalysisDatas(data) {
  return request({
    url: '/mrv/getCompareAnalysisDatas',
    method: 'post',
    data
  })
}
// 能效趋势分析下载
export function downLoadEnergyEfficencyTrendData(data) {
  return request({
    url: '/mrv/downLoadEnergyEfficencyTrendData',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 导出能效比较分析数据下载
export function downLoadCompareAnalysisData(data) {
  return request({
    url: '/mrv/downLoadCompareAnalysisData',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 批量删除FLAG/DOC变更
export function deleteMultiFlagDocChangeById(data) {
  return request({
    url: '/flagDocChange/deleteMultiFlagDocChangeById',
    method: 'post',
    data
  })
}
// cmsa报告查询接口lits
export function getCmsaStdRpt(data) {
  return request({
    url: '/energyEfficiency/getCmsaStdRpt',
    method: 'post',
    data
  })
}
// cmsa报告查询接口
export function getCmsaRpt(data) {
  return request({
    url: '/energyEfficiency/getCmsaRpt',
    method: 'post',
    data
  })
}
// 删除cmsa报告接口
export function deleteCmsaRpt(data) {
  return request({
    url: '/energyEfficiency/deleteCmsaRpt',
    method: 'post',
    data
  })
}
// 解锁或锁定cmsa报告
export function lockOrUnLockCmsaRpt(data) {
  return request({
    url: '/energyEfficiency/lockOrUnLockCmsaRpt',
    method: 'post',
    data
  })
}
// cmsa报告导出接口
export function downLoadCmsaRpt(data) {
  return request({
    url: '/energyEfficiency/downLoadCmsaRpt',
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// cmsa报告状态标记
export function cmsaRptStatusTag(data) {
  return request({
    url: '/energyEfficiency/cmsaRptStatusTag',
    method: 'post',
    data
  })
}
// 图表数据
export function getEnergyEfficencyTrendMessage(data) {
  return request({
    url: '/mrv/getEnergyEfficencyTrendMessage',
    method: 'post',
    data
  })
}
