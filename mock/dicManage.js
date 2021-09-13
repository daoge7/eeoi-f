import Mock from 'mockjs'

const fuelOilList = []
fuelOilList.push({
  id: '10000',
  num: 1,
  fuelOilName: '重燃油HFO',
  fuelOilCode: '1',
  fuelCarbonContent: '0.85',
  convertOfoilAndCO2: '3.11',
  upateDate: '2019-12-15',
  remark: '含硫量大于0.5%'
})

const subShipTypeList = []
subShipTypeList.push(Mock.mock({
  id: '10000',
  num: 1,
  subShipTypeCode: '101',
  subShipTypeName: '灵便型',
  'shipType|1': ['1', '2'],
  upateDate: '2019-12-15',
  remark: '20191215上海中远海运要求添加'
}))

const dicEvaluationList = []
dicEvaluationList.push({
  id: '10000',
  num: 1,
  paramName: '每日主机油耗',
  paramValue: '30%',
  upateDate: '2019-12-15 14:01:37'
})

const gcFlagStateList = []
gcFlagStateList.push({
  id: '10000',
  num: 1,
  ISOCode: '5002',
  nameEn: 'ARGENTINA',
  nameCn: '阿根廷',
  briefEn: 'SANLORENZO',
  briefCn: '圣洛伦索',
  twoCode: 'ECSLO',
  threeCode: 'ECSLO',
  isAuthorizedCountry: '1',
  upateDate: '2019-12-15',
  remark: ''
})

const gcCityList = []
gcCityList.push({
  id: '10000',
  num: 1,
  portCode: 'DKAAL',
  portNameEn: 'Aalborg',
  portNameCn: '奥尔堡',
  portName: '',
  portNation: '所属国家',
  nationCn: '丹麦',
  nationEn: 'Denmark',
  nationThreeCode: '',
  province: '',
  branch: '',
  upateDate: '2019-12-15',
  remark: ''
})

const gcClassList = []
gcClassList.push({
  id: '10000',
  num: 1,
  code: '代码',
  IACS: 'IACS标准两位代码',
  isIACS: '是否IACS',
  abbrn: '船级社名称缩写',
  fullName: '船级社全称',
  nation: '船级社所在国',
  addr: '船级社详细地址',
  phone: '船级社电话',
  fax: '船级社传真号',
  telex: '电传',
  email: '船级社电子邮箱',
  website: '船级社主页',
  telegraph: '电报',
  cnFullName: '船级社中文全称',
  cnAddr:'船级社中文详细地址',
  postCode: '邮政编码'
})
    

export default [
  {
    url: '/dicManage/fuelOilList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: fuelOilList.length,
          items: fuelOilList
        }
      }
    }
  },
  {
    url: '/dicManage/subShipTypeList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: subShipTypeList.length,
          items: subShipTypeList
        }
      }
    }
  },
  {
    url: '/dicManage/dicEvaluationList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: dicEvaluationList.length,
          items: dicEvaluationList
        }
      }
    }
  },
  {
    url: '/dicManage/gcFlagStateList',
    type: 'get',
    response: config => {
      const { threeCode, gcFlagName, gcFlagBrief, page = 1, limit = 20 } = config.query

      let mockList = gcFlagStateList.filter(item => {
        if (threeCode && item.threeCode.indexOf(threeCode) < 0) return false
        if (gcFlagName && item.nameCn.indexOf(gcFlagName) < 0 && item.nameEn.indexOf(gcFlagName) < 0) return false
        if (gcFlagBrief && item.briefCn.indexOf(gcFlagBrief) < 0 && item.briefEn.indexOf(gcFlagBrief) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/dicManage/gcCityList',
    type: 'get',
    response: config => {
      const { portCode, portName, portNation, page = 1, limit = 20 } = config.query

      let mockList = gcCityList.filter(item => {
        if (portCode && item.portCode.indexOf(portCode) < 0) return false
        if (portName && item.portNameEn.indexOf(portName) < 0 && item.portNameEn.indexOf(portName) < 0) return false
        if (portNation && item.nationEn.indexOf(portNation) < 0 && item.nationCn.indexOf(portNation) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/dicManage/gcClassList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: gcClassList.length,
          items: gcClassList
        }
      }
    }
  },
  {
    url: '/dicManage/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/dicManage/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

