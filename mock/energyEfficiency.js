import Mock from 'mockjs'

const List = []
List.push(Mock.mock({
  id: +Mock.Random.guid(),
  author: '@first',
  imono: '1001',
  registNo: '0002',
  shipId: '001',
  shipNameEn: 'Ship1',
  shipNameCn: '船舶1',
  shipName: '船舶1',
  voyageCode: 'V046',
  voyageName: 'V046',
  startDate: '2019-10-10 10:20',
  endDate: '2019-12-30 02:30',
  startPort: '南通',
  startPortName: '南通',
  startPortNameCn: '南通',
  endPort: '防城港',
  endPortName: '防城港',
  endPortNameCn: '防城港',
  EEOI: '200',
  CO2Emission: '500',
  speedRatio: '20',
  LoadUtilization: '100',
  shipCompany: '公司1',
  status: 'lock',
  children: [
    {
      id: +Mock.Random.guid(),
      author: '@first',
      imono: '1001',
      registNo: '0002',
      shipId: '001',
      shipNameEn: 'Ship1',
      shipNameCn: '船舶1',
      shipName: '船舶1',
      voyageCode: 'V046-1',
      voyageName: 'V046-1',
      startDate: '2019-10-10 10:20',
      endDate: '2019-11-10 0:30',
      startPort: '南通',
      startPortName: '南通',
      startPortNameCn: '南通',
      endPort: '德黑兰港',
      endPortName: '德黑兰港',
      endPortNameCn: '德黑兰港',
      EEOI: '100',
      CO2Emission: '500',
      speedRatio: '15',
      LoadUtilization: '90',
      shipCompany: '公司1',
      status: 'empty'
    },
    {
      id: +Mock.Random.guid(),
      author: '@first',
      imono: '1001',
      registNo: '0002',
      shipId: '001',
      shipNameEn: 'Ship1',
      shipNameCn: '船舶1',
      shipName: '船舶1',
      voyageCode: 'V046-2',
      voyageName: 'V046-2',
      startDate: '2019-11-10 12:30',
      endDate: '2019-12-30 02:30',
      startPort: '德黑兰港',
      startPortName: '德黑兰港',
      startPortNameCn: '德黑兰港',
      endPort: '防城港',
      endPortName: '防城港',
      endPortNameCn: '防城港',
      EEOI: '100',
      CO2Emission: '400',
      speedRatio: '20',
      LoadUtilization: '80',
      shipCompany: '公司1',
      status: 'empty'
    }
  ]
}))

const portList = []
portList.push(Mock.mock({
  id: +Mock.Random.guid(),
  author: '@first',
  shipId: '001',
  nameEn: 'Ship1',
  nameCn: '船舶1',
  taskId: 'V046',
  isEU: '1',
  arrTime: '2019-12-29 10:30',
  arrZone: 'utc',
  deptTime: '2019-12-30 10:30',
  deptZone: 'utc',
  distance: '500',
  inPort: '港界内',
  portWork: '防城港',
  shorePower: '200',
  objective: '装货/登离乘客',
  arrCargoInfo: {
    cargoTons: '',
    ballastTons: '',
    allBoxNum: '',
    heavyBoxNum: '',
    peopleNum: '',
    carsNum: ''
  },
  deptCargoInfo: {
    cargoTons: '',
    ballastTons: '',
    allBoxNum: '',
    heavyBoxNum: '',
    carsNum: '',
    peopleNum: ''
  },
  oilTons: [
    {
      oilId: +Mock.Random.guid(),
      oilType: '高硫重油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '低硫重油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '超低硫重油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '高硫轻油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '低硫轻油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '超低硫轻油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '柴油',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '甲醇',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '乙醇',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '丙烷',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    },
    {
      oilId: +Mock.Random.guid(),
      oilType: '丁烷',
      arrOilTons: '',
      deptOilTons: '',
      addOil: '',
      addOilTime: '',
      addOilNumber: '',
      outOil: '',
      outOilTime: '',
      correctOil: ''
    }
  ]
}))
export default [
  {
    url: '/energyEfficiency/voyageList',
    type: 'get',
    response: config => {
      const { shipName, voyageName, shipCompany, startDate, endDate, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
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
    url: '/energyEfficiency/portList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: portList.length,
          items: portList
        }
      }
    }
  },

  {
    url: '/energyEfficiency/createVoyage',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/energyEfficiency/updateVoyage',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/energyEfficiency/createPort',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/energyEfficiency/updatePort',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/energyEfficiency/createDrift',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/energyEfficiency/createSpec',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
