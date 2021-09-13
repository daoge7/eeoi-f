import Mock from 'mockjs'

const DataAssessmentList = []
const UploadMRVReportList = []
const EmissionReportList = []
const count = 4
const List1 = []
List1.push({
  displayDate: '2019-10-10',
  CO2PerDay: '10.01',
  CO2PerTransportWork: '20.23',
  Averagespeed: '30.5',
  CO2PerNauticalMile: '45.5',
  FuelDay: '20.8',
  FuelTransportwork: '55.5',
  FuelNauticalMile: '39.5'
})
for (let i = 0; i < count; i++) {
  DataAssessmentList.push(Mock.mock({
    id: +Mock.Random.guid(),
    num: i + 1,
    'shipCompany|1': ['1', '2'],
    'VesselName|1': ['1', '2'],
    'Year|1': ['2017', '2018'],
    VesselName: '船舶1',
    Date: '2019-10-10 10:20',
    FuelConsumptionPerNauticalMile: '0.09',
    CO2NauticalMile: '0.27',
    FuelTransportWork: '4.86',
    CO2TransportWork: '15.22',
    DailyFOAtSea: '26.0',
    DailyFOAtPort: '',
    Speed: '12.5874'
  }))
}
UploadMRVReportList.push(Mock.mock({
  id: +Mock.Random.guid(),
  author: '@first',
  imono: '9469974',
  registNo: '0002',
  shipId: '001',
  shipName: 'PACIFIC CREATION  / 明立',
  startDate: '2019-10-10 10:20',
  endDate: '2019-12-30 02:30',
  ManagementCompany: '香港明华船务有限公司',
  FlagState: 'Hong Kong, China',
  GrossTonnage: '94710',
  VesselType: '散货船',
  DesignSpeed: '15.0',
  status: 'lock'
}))
EmissionReportList.push(Mock.mock({
  id: +Mock.Random.guid(),
  author: '@first',
  imono: '9469974',
  registNo: '0002',
  shipId: '001',
  shipName: 'PACIFIC CREATION  / 明立',
  startDate: '2019-10-10 10:20',
  endDate: '2019-12-30 02:30',
  ManagementCompany: '香港明华船务有限公司',
  FlagState: 'Hong Kong, China',
  GrossTonnage: '94710',
  VesselType: '散货船',
  DesignSpeed: '15.0',
  status: 'lock'
}))

export default [
  {
    url: '/MRVReport/DataAssessment',
    type: 'get',
    response: config => {
      const { shipCompany, shipName, Year, page = 1, limit = 20, sort } = config.query

      let mockList = DataAssessmentList.filter(item => {
        if (shipCompany && item.shipCompany !== shipCompany) return false
        if (shipName && item.shipName !== shipName) return false
        if (Year && item.year.indexOf(Year) < 0) return false
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
    url: '/MRVReport/DiagramExhibition',
    type: 'get',
    response: config => {
      // const { shipCompany, VesselName, VesselType, Year } = config.query
      const xData = ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5', '2019.6', '2019.7', '2019.8', '2019.9', '2019.10', '2019.11', '2019.12']
      const legendData = ['CO2PerDay', 'CO2PerTransportWork', 'Averagespeed', 'CO2PerNauticalMile', 'FuelDay', 'FuelTransportwork', 'FuelNauticalMile']
      const seriesData = [
        {
          name: 'CO2PerDay',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 25.5, 23.8, 18.8, 35.5, 38.5, 26.2, 30.5]
        },
        {
          name: 'CO2PerTransportWork',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        },
        {
          name: 'Averagespeed',
          type: 'bar',
          yAxisIndex: 1,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: 'CO2PerNauticalMile',
          type: 'bar',
          yAxisIndex: 1,
          data: [44.01, 88.23, 95.5, 85.5, 55.8, 55.5, 60.8, 80.8, 99.5, 39.5, 48.2, 66.5]
        },
        {
          name: 'FuelDay',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        },
        {
          name: 'FuelTransportwork',
          type: 'bar',
          yAxisIndex: 1,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: 'FuelNauticalMile',
          type: 'bar',
          yAxisIndex: 1,
          data: [44.01, 88.23, 95.5, 85.5, 55.8, 55.5, 60.8, 80.8, 99.5, 39.5, 48.2, 66.5]
        }
      ]
      return {
        code: 20000,
        data: {
          chartTitle: 'xx公司/xx船舶 能效趋势分析',
          xData: xData, // x轴数据（数组）
          legendData: legendData, // 图标
          seriesData: seriesData, // 图标图形、颜色数据以及
          listData: List1
        }
      }
    }
  },
  {
    url: '/MRVReport/uploadInfoList',
    type: 'get',
    response: config => {
      const { shipName, voyageName, shipCompany, startDate, endDate, page = 1, limit = 20, sort } = config.query

      let mockList = UploadMRVReportList.filter(item => {
        if (shipName && (item.imono.indexOf(shipName) < 0 && item.registNo.indexOf(shipName) < 0 && item.shipNameEn.indexOf(shipName) < 0 && item.shipNameCn.indexOf(shipName) < 0)) return false
        if (voyageName && item.voyageName.indexOf(voyageName) < 0) return false
        if (shipCompany && item.shipCompany.indexOf(shipCompany) < 0) return false
        if (startDate && item.startDate < startDate) return false
        if (endDate && item.endDate > endDate) return false
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
    url: '/MRVReport/createUploadInfo',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/MRVReport/updateUploadInfo',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/MRVReport/EmissionReport',
    type: 'get',
    response: config => {
      const { shipCompany, shipName, shipType, voyageLine, startYear, endYear, page = 1, limit = 20, sort } = config.query

      let mockList = EmissionReportList.filter(item => {
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

