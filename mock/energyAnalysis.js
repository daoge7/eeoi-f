import Mock from 'mockjs'

const List1 = []
List1.push({
  displayDate: '2019-10-10',
  EEOI: '10.01',
  fuelPerMile: '10.01',
  fuelPerTransport: '20.1',
  CO2Distance: '10.5',
  CO2Transport: '22.4',
  reductionRatio: '10.01',
  loadUtilization: '44.01'
})
const FuelConsumptionList = []
FuelConsumptionList.push({
  displayDate: '2019-10-10',
  mainEnginekgForDay: '',
  mainEnginekgForMile: '',
  auxiliarykgForDay: '',
  auxiliarykgForMile: '',
  auxiliarykgForDayAnchor: '',
  cargoOilHeatkgForTons: '',
  cargoOilHeatkgForTonsAndMile: '',
  cargoOilHandkgForTons: '',
  ballastkg: ''
})

export default [
  {
    url: '/energyAnalysis/TrendAnalysis',
    type: 'get',
    response: config => {
      const { shipCompany, shipType, shipSubType, grossScope, ageLimit, shipName, startYear, endYear, rollingCycle, rollingCycleUnit, checkedAnalyzeItems } = config.query
      const xData = ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5', '2019.6', '2019.7', '2019.8', '2019.9', '2019.10', '2019.11', '2019.12']
      const legendData = ['EEOI', 'fuelPerMile', 'reductionRatio', 'loadUtilization']
      // 数据和legendData里面key保持对应
      // { key: 'EEOI', display_name: 'EEOI(g/t∙nm)' },
      // { key: 'fuelPerMile', display_name: '每海里油耗(kg/nm)' },
      // { key: 'fuelPerTransport', display_name: '每运输单位油耗(kg/kt∙nm)' },
      // { key: 'CO2Distance', display_name: '每海里CO2排放(100kg/nm)' },
      // { key: 'CO2Transport', display_name: '每运输单位CO2排放(10kg/t)' },
      // { key: 'reductionRatio', display_name: '降速比(%)' },
      // { key: 'loadUtilization', display_name: '载货量利用率(%)' }
      const seriesData = [
        {
          name: 'EEOI',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 25.5, 23.8, 18.8, 35.5, 38.5, 26.2, 30.5]
        },
        {
          name: 'fuelPerMile',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        },
        {
          name: 'reductionRatio',
          type: 'bar',
          yAxisIndex: 1,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: 'loadUtilization',
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
    url: '/energyAnalysis/ComparisonAnalysis',
    type: 'get',
    response: config => {
      const { shipCompany1, shipType1, shipSubType1, grossScope1, ageLimit1, shipName1,
        shipCompany2, shipType2, shipSubType2, grossScope2, ageLimit2, shipName2,
        shipCompany3, shipType3, shipSubType3, grossScope3, ageLimit3, shipName3,
        startYear, endYear, computingUnit, checkedAnalyzeItems } = config.query
      const xData = ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5', '2019.6', '2019.7', '2019.8', '2019.9', '2019.10', '2019.11', '2019.12']
      const legendData = ['EEOI', '每海里油耗', '降速比(%)', '载货量利用率(%)']
      // 数据和legendData里面key保持对应
      // { key: 'EEOI', display_name: 'EEOI(g/t∙nm)' },
      // { key: 'fuelPerMile', display_name: '每海里油耗(kg/nm)' },
      // { key: 'reductionRatio', display_name: '降速比(%)' },
      // { key: 'loadUtilization', display_name: '载货量利用率(%)' }
      // { key: 'CO2Distance', display_name: '每海里CO2排放' },
      // { key: 'CO2Transport', display_name: '单位运输量CO2排放' }
      const seriesData = [
        {
          name: 'EEOI',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 25.5, 23.8, 18.8, 35.5, 38.5, 26.2, 30.5]
        },
        {
          name: '每海里油耗',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        },
        {
          name: '降速比(%)',
          type: 'bar',
          yAxisIndex: 1,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: '载货量利用率(%)',
          type: 'bar',
          yAxisIndex: 1,
          data: [44.01, 88.23, 95.5, 85.5, 55.8, 55.5, 60.8, 80.8, 99.5, 39.5, 48.2, 66.5]
        }
      ]
      return {
        code: 20000,
        data: {
          chartTitle: 'xx公司/xx船舶能效比较分析',
          xData: xData, // x轴数据（数组）
          legendData: legendData, // 图标
          seriesData: seriesData, // 图标图形、颜色数据以及
          listData: List1
        }
      }
    }
  },
  {
    url: '/energyAnalysis/RelevantAnalysis',
    type: 'get',
    response: config => {
      const { shipCompany, shipType, shipSubType, grossScope, ageLimit, shipName, startYear, endYear, computingUnit, checkedAnalyzeItems } = config.query
      const xData = ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5', '2019.6', '2019.7', '2019.8', '2019.9', '2019.10', '2019.11', '2019.12']
      const legendData = ['EEOI', 'fuelPerMile', 'reductionRatio', 'loadUtilization']
      // 数据和legendData里面key保持对应
      // { key: 'EEOI', display_name: 'EEOI(g/t∙nm)' },
      // { key: 'fuelPerMile', display_name: '每海里油耗(kg/nm)' },
      // { key: 'reductionRatio', display_name: '降速比(%)' },
      // { key: 'loadUtilization', display_name: '载货量利用率(%)' }
      // { key: 'CO2Distance', display_name: '每海里CO2排放' },
      // { key: 'CO2Transport', display_name: '单位运输量CO2排放' }
      const seriesData = [
        {
          name: 'EEOI',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 25.5, 23.8, 18.8, 35.5, 38.5, 26.2, 30.5]
        },
        {
          name: 'fuelPerMile',
          type: 'line',
          yAxisIndex: 0,
          data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        },
        {
          name: 'reductionRatio',
          type: 'bar',
          yAxisIndex: 1,
          data: [10.01, 20.23, 30.5, 45.5, 20.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: 'loadUtilization',
          type: 'bar',
          yAxisIndex: 1,
          data: [44.01, 88.23, 95.5, 85.5, 55.8, 55.5, 60.8, 80.8, 99.5, 39.5, 48.2, 66.5]
        }
      ]
      return {
        code: 20000,
        data: {
          chartTitle: 'xx公司/xx船舶 油耗分析',
          xData: xData, // x轴数据（数组）
          legendData: legendData, // 图标
          seriesData: seriesData, // 图标图形、颜色数据以及
          listData: []
        }
      }
    }
  },
  {
    url: '/energyAnalysis/FuelConsumption',
    type: 'get',
    response: config => {
      const { shipCompany, shipType, shipSubType, grossScope, ageLimit, shipName, startYear, endYear, computingUnit, checkedAnalyzeItems } = config.query
      const xData = ['2019.1', '2019.2', '2019.3', '2019.4', '2019.5', '2019.6', '2019.7', '2019.8', '2019.9', '2019.10', '2019.11', '2019.12']
      const legendData = ['主机油耗kg/天(海上)', '主机油耗kg/海里(海上)', '辅机油耗kg/天(海上)', '辅机油耗kg/海里(海上)']
      const seriesData = [
        {
          name: '主机油耗kg/天(海上)',
          type: 'line',
          data: [20, 29, 50.5, 45.5, 120.8, 200.5, 78.8, 17.8, 85.5, 65.5, 82.2, 30.5]
        },
        {
          name: '主机油耗kg/海里(海上)',
          type: 'line',
          data: [10.01, 20.23, 30.5, 80.5, 60.8, 55.5, 25.8, 12.8, 75.5, 55.5, 61.2, 12.5]
        },
        {
          name: '辅机油耗kg/天(海上)',
          type: 'line',
          data: [29.01, 50.23, 50.5, 45.5, 29.8, 55.5, 60.8, 80.8, 99.5, 40.5, 55.2, 66.5]
        },
        {
          name: '辅机油耗kg/海里(海上)',
          type: 'line',
          data: [44.01, 88.23, 95.5, 85.5, 55.8, 155.5, 60.8, 120.8, 99.5, 100.5, 48.2, 96.5]
        }
      ]
      return {
        code: 20000,
        data: {
          chartTitle: 'xx公司/xx船舶 油耗分析',
          xData: xData, // x轴数据（数组）
          legendData: legendData, // 图标
          seriesData: seriesData, // 图标图形、颜色数据以及
          listData: FuelConsumptionList
        }
      }
    }
  }
]

