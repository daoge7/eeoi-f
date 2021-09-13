import Mock from 'mockjs'

const AnnualDataList = []
const AnnualTargetList=[]
const CompanyAnnualDataList = []
const CompanyAnnualTargetList = []
const count = 5

for (let i = 0; i < count; i++) {
  AnnualDataList.push(Mock.mock({
    id: '@increment',
    num: i + 1,
    'shipCompany|1': ['1', '2'],
    'shipName|1': ['1', '2'],
    'shipType|1': ['1', '2'],
    'voyageLine|1': ['1', '2'],
    'year|1': ['2017', '2018'],
    FreightVolume: '',
    voyageMileage: '',
    NoLoadMileage: '',
    TurnoverVolume: '',
    BoxTurnover: '',
    heavyOil: '',
    lightOil: '',
    dieselOil: '',
    propane: '',
    butane: '',
    NaturalGas: '',
    inPortHeavyOil: '',
    inPortLightOil: '',
    inPortDieselOil: '',
    inPortPropane: '',
    inPortButane: '',
    inPortNaturalGas: ''
  }))
}

for (let i = 0; i < count; i++) {
  AnnualTargetList.push(Mock.mock({
    id: '@increment',
    num: i + 1,
    'shipCompany|1': ['1', '2'],
    'shipName|1': ['1', '2'],
    'shipType|1': ['1', '2'],
    'voyageLine|1': ['1', '2'],
    'year|1': ['2017', '2018'],
    averageOfEEOIForT: '', //EEOI【CO2排放强度】 平均值(g/t·nm)
    averageOfCargoCarried: '', //载货量利用率 平均值
    averageOfSpeed: '', //降速比平均值
    CO2Distance: '', //每海里CO2排放 平均值(kg/nm)
    CO2Transport: '', //单位运输量CO2排放 平均值(kg/t)
    FuelTransportForT: '', //单位周转量能耗 (g/t·nm)
    averageOfEEOIForTEU: '', //EEOI【CO2排放强度】 平均值(g/TEU·nm)
    averageCO2TEU: '', //每TEU CO2排放 平均值(kg/TEU)
    FuelTransportForTEU: '', //单位周转量能耗 (g/TEU*海里)
    averageETUUseRatio: '' //箱位利用率平均值
  }))
}

for (let i = 0; i < count; i++) {
  CompanyAnnualDataList.push(Mock.mock({
    id: '@increment',
    num: i + 1,
    'shipCompany|1': ['1', '2'],
    'year|1': ['2017', '2018'],
    FreightVolume: '',
    voyageMileage: '',
    NoLoadMileage: '',
    TurnoverVolume: '',
    heavyOil: '',
    lightOil: '',
    dieselOil: '',
    propane: '',
    butane: '',
    NaturalGas: '',
    inPortHeavyOil: '',
    inPortLightOil: '',
    inPortDieselOil: '',
    inPortPropane: '',
    inPortButane: '',
    inPortNaturalGas: ''
  }))
}

for (let i = 0; i < count; i++) {
  CompanyAnnualTargetList.push(Mock.mock({
    id: '@increment',
    num: i + 1,
    'shipCompany|1': ['1', '2'],
    'shipName|1': ['1', '2'],
    'shipType|1': ['1', '2'],
    'voyageLine|1': ['1', '2'],
    'year|1': ['2017', '2018'],
    averageOfEEOIForT: '', //EEOI【CO2排放强度】 平均值(g/t·nm)
    averageOfCargoCarried: '', //载货量利用率 平均值
    averageOfSpeed: '', //降速比平均值
    CO2Distance: '', //每海里CO2排放 平均值(kg/nm)
    CO2Transport: '', //单位运输量CO2排放 平均值(kg/t)
    FuelTransportForT: '', //单位周转量能耗 (g/t·nm)
    averageOfEEOIForTEU: '', //EEOI【CO2排放强度】 平均值(g/TEU·nm)
    averageCO2TEU: '', //每TEU CO2排放 平均值(kg/TEU)
    FuelTransportForTEU: '', //单位周转量能耗 (g/TEU*海里)
    averageETUUseRatio: '' //箱位利用率平均值
  }))
}

export default [
  {
    url: '/energyStatistics/AnnualData',
    type: 'get',
    response: config => {
      const { shipCompany, shipName, shipType, voyageLine, startYear, endYear, page = 1, limit = 20, sort } = config.query

      let mockList = AnnualDataList.filter(item => {
        if (shipCompany && item.shipCompany !== shipCompany) return false
        if (shipName && item.shipName !== shipName) return false
        if (shipType && item.shipType !== shipType) return false
        if (voyageLine && item.voyageLine !== voyageLine) return false
        if (startYear && item.year.indexOf(startYear) < 0) return false
        if (endYear && item.year.indexOf(endYear) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

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
    url: '/energyStatistics/AnnualTarget',
    type: 'get',
    response: config => {
      const { shipCompany, shipName, shipType, voyageLine, startYear, endYear, page = 1, limit = 20, sort } = config.query

      let mockList = AnnualTargetList.filter(item => {
        if (shipCompany && item.shipCompany !== shipCompany) return false
        if (shipName && item.shipName !== shipName) return false
        if (shipType && item.shipType !== shipType) return false
        if (voyageLine && item.voyageLine !== voyageLine) return false
        if (startYear && item.year.indexOf(startYear) < 0) return false
        if (endYear && item.year.indexOf(endYear) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

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
    url: '/energyStatistics/CompanyAnnualData',
    type: 'get',
    response: config => {
      const { shipCompany, startYear, endYear, page = 1, limit = 20, sort } = config.query

      let mockList = CompanyAnnualDataList.filter(item => {
        if (shipCompany && item.shipCompany !== shipCompany) return false
        if (startYear && item.year.indexOf(startYear) < 0) return false
        if (endYear && item.year.indexOf(endYear) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

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
    url: '/energyStatistics/CompanyAnnualTarget',
    type: 'get',
    response: config => {
      const { shipCompany, shipName, shipType, voyageLine, startYear, endYear, page = 1, limit = 20, sort } = config.query

      let mockList = CompanyAnnualTargetList.filter(item => {
        if (shipCompany && item.shipCompany !== shipCompany) return false
        if (shipName && item.shipName !== shipName) return false
        if (shipType && item.shipType !== shipType) return false
        if (voyageLine && item.voyageLine !== voyageLine) return false
        if (startYear && item.year.indexOf(startYear) < 0) return false
        if (endYear && item.year.indexOf(endYear) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]

