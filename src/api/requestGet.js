import request from "@/utils/request";
export function getQueryPage(url, query) {
  return request({
    url: url,
    method: "get",
    params: query
  });
}
export function getQueryAll(url, params) {
  return request({
    url: url,
    method: "get",
    params: params
  });
}
export function getQueryInfo(url, id) {
  return request({
    url: url,
    method: "get",
    params: { id }
  });
}
export function getQueryDic(url) {
  return request({
    url: url,
    method: "get"
  });
}
// 燃油类型字典分页条件查询
export function savemanuinfor() {
  return request({
    url: "/fuel/findFuelList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 30
    }
  });
}
// 能源形式字典分页条件查询
export function getSituation() {
  return request({
    url: "/energyForm/findEnergyFormList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 30
    }
  });
}
// 船旗国字典查询
export function saveOrUpdateGcState() {
  return request({
    url: "/gcState/findGcStateList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 300,
      enName: ""
    }
  });
}
// 港口
export function savefindGcCityList() {
  return request({
    url: "/gcCity/findGcCityList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 300
    }
  });
}
// 船型
export function savefindShipTypeList() {
  return request({
    url: "/shipType/findShipTypeList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 50
    }
  });
}
// 船型细分
export function savefindShipSubList() {
  return request({
    url: "/shipSub/findShipSubList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 50
    }
  });
}
// 船级
export function savefindClassificatList() {
  return request({
    url: "/classificat/findClassificatList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 50
    }
  });
}
// 总吨位
export function savefindDicGrossTonList() {
  return request({
    url: "/dicGrossTon/findDicGrossTonList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 50
    }
  });
}
// 船龄范围字典分页条件查询
export function findShipAgeList() {
  return request({
    url: "/shipAge/findShipAgeList",
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 20
    }
  });
}
// dcs报告可生成列表
export function getDcsPeriodTime(shipId, year, rptType) {
  return request({
    url:
      "/mrv/getDcsPeriodTime?shipId=" +
      shipId +
      "&year=" +
      year +
      "&rptType=" +
      rptType,
    method: "get"
  });
}
// 油类类型新查询字典
export function getFuelType(shipId) {
  return request({
    url: "/energyEfficiency/getFuelType?shipId=" + shipId,
    method: "get"
  });
}
// 油类类型新查询字典
export function getTfc(shipId) {
  return request({
    url: "/shipManager/getTfc?shipId=" + shipId,
    method: "get"
  });
}
// 获取燃油类型接口
export function getshipType() {
  return request({
    url: "/shipManager/getFuelType",
    method: "get"
  });
}
// 油类类型新查询字典
export function getVoyageDetailInfo(voyageId) {
  return request({
    url: "/energyEfficiency/getVoyageDetailInfo?voyageId=" + voyageId,
    method: "get"
  });
}
// 年份
export function getYears() {
  return request({
    url: "/getYears",
    method: "get"
  });
}
// 通过内河船ID获取该船下APP用户
export function findAppUserByShipId(id) {
  return request({
    url: `/sysUser/findAppUserByShipId/${id}`,
    method: "get"
  });
}
// 根据IMO查询船队名称和ID
export function findOiShipInfoByImoNo(imoNo) {
  return request({
    url: `/flagDocChange/findOiShipInfoByImoNo/${imoNo}`,
    method: "get"
  });
}
// 查询所有FLAG/DOC变更
export function findAllFlagDocChangeOrderByEffectiveDateDesc(shid) {
  return request({
    url: `/flagDocChange/findAllByshipIdOrderByEffectiveDateDesc/${shid}`,
    method: "get"
  });
}
// 查询单个FLAG/DOC变更
export function findFlagDocChangeById(id) {
  return request({
    url: `/flagDocChange/findFlagDocChangeById/${id}`,
    method: "get"
  });
}
// 根据船舶id获取航次信息和是否转换船旗
export function getTasksByShipId(shipId) {
  return request({
    url: "/energyEfficiency/getTasksByShipId?shipId=" + shipId,
    method: "get"
  });
}
// 获取软件
export function getSoftWareDownLoad() {
  return request({
    url: "/sysDocNotice/getSoftWareDownLoad",
    method: "get"
  });
}
// 获取资料
export function findAllSysDocNoticeListAndSysFiles(info) {
  return request({
    url:
      "/sysDocNotice/findAllSysDocNoticeListAndSysFiles?pageNum=" +
      info.currentPage +
      "&pageSize=" +
      info.pageSize,
    method: "get"
  });
}
// 下载文件接口
export function downloadFile(path, fileName) {
  return request({
    url: "/sysDocNotice/downloadFile?path=" + path + "&fileName=" + fileName,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json"
    },
    method: "get"
  });
}
// 船型细分
export function findShipSubByShipType(id) {
  return request({
    url: `/shipSub//findShipSubByShipType/${id}`,
    method: "get"
  });
}

// 期初量额外信息
export function findShipOther(id) {
  return request({
    url: `/flagDocChange/flatChangeLatest/${id}`,
    method: "get"
  });
}
