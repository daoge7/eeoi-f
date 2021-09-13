import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: +Mock.Random.guid(),
    imono: '@increment(10000)',
    registNo: '@increment(50000)',
    shipName: '@name',
    shipNameCn: '@cname',
    'shipTypeCode|1': ['1', '2', '3', '4', '5', '6'],
    'shipSubTypeCode|1': ['101', '102', '103', '104', '105', '106'],
    shipFlag: '@region',
    shipClass: 'CCS',
    owner: '@ctitle(3,5)',
    'owner_id|1': ['1', '2', '3'],
    operator: '@ctitle(3,5)',
    'operator_id|1': ['1', '2', '3'],
    manager: '@ctitle(3,5)',
    'manager_id|1': ['1', '2', '3'],
    builder: '@ctitle(3,5)',
    'builder_id|1': ['1', '2', '3'],
    finishDate: +Mock.Random.date('T'),
    contractDate: +Mock.Random.date('T'),
    display_time: '@datetime',
    'gross|1': ['1', '2', '3', '4', '5', '6'],
    net: '@float(0, 100, 2, 2)',
    eediImp: '1',
    eedi: '@float(0, 100, 2, 2)',
    passengers: '@float(0, 100, 2, 2)',
    cars: '@float(0, 100, 2, 2)',
    dwt: '@float(0, 100, 2, 2)',
    speed: '@float(0, 100, 2, 2)',
    eeoi: '@float(0, 100, 2, 2)',
    'iceCode|1': ['IA Super', 'IA', 'IB', 'IC'],
    isNX: '√',
    mrvContacts: 'zhangsan',
    mrvPost: 'xx负责人',
    mrvPhone: '88180018',
    mrvEmail: 'aa@qq.com',
    teu: '@float(0, 100, 2, 2)',
    lastwuDate: +Mock.Random.date('T'),
    'manageTypeCode|1': ['1', '2', '3'],
    'testTypeCode|1': ['1', '2', '3'],
    eiv: '',
    remark: '',
    shipMde: {
      '1': {
        type: '5S60MC',
        ratedPower: '8833.00',
        ratedSpeed: '105.00',
        consumpRate: '15',
        energyId: '1',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      },
      '2': {
        type: '6S50MC-C',
        ratedPower: '11149.00',
        ratedSpeed: '110.00',
        consumpRate: '20',
        energyId: '2',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      }
    },
    shipPM: {
      '1': {
        num: '1',
        type: '6EY18AL',
        ratedPower: '660.00',
        ratedSpeed: '900.00',
        consumpRate: '10',
        energyId: '1',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      },
      '2': {
        num: '2',
        type: 'GE 45C-8 ',
        ratedPower: '750.00',
        ratedSpeed: '',
        consumpRate: '5',
        energyId: '2',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      }
    },
    shipBoiler: {
      '1': {
        type: '1111',
        energyId: '660.00',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      },
      '2': {
        type: '2222',
        energyId: '660.00',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      }
    },
    shipIncinerator: {
      '1': {
        type: '1111',
        energyId: '1',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      },
      '2': {
        type: '2222',
        energyId: '1',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      }
    },
    shipInert: {
      '1': {
        type: '1111',
        energyId: '1',
        ratedPower: '100.00',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      },
      '2': {
        type: '2222',
        energyId: '1',
        ratedPower: '200.00',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T')
      }
    },
    shipGasTurbines: {
      '1': {
        type: '1111',
        oilType: '轻燃油',
        ratedPower: '100.00'
      },
      '2': {
        type: '2222',
        oilType: '重燃油',
        ratedPower: '200.00'
      }
    },
    shipGenerator: {
      '1': {
        type: '1111',
        ratedPower: '660.00',
        ratedVoltage: '200',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T'),
        isShaftGen: '1'
      },
      '2': {
        type: '1111',
        ratedPower: '660.00',
        ratedVoltage: '100',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T'),
        isShaftGen: '1'
      }
    },
    battery: {
      '1': {
        type: '1111',
        ratedPower: '660.00',
        ratedVoltage: '200',
        source: '沪东重机有限公司',
        produceTime: +Mock.Random.date('T'),
        isShaftGen: '1'
      }
    },
    shipMainProp: {
      '1': {
        type: '5S60MC',
        ratedPower: '8833.00',
        ratedSpeed: '105.00'
      },
      '2': {
        type: '5S60MC',
        ratedPower: '8833.00',
        ratedSpeed: '105.00'
      }
    },
    shipPropeller: {
      '1': {
        type: '5S60MC',
        count: '8833.00',
        certNO: '105.00',
        material: '100.00',
        weight: '200',
        diameter: '150',
        pitch: '20',
        ypCount: '2',
        turnTo: 'right',
        iceCode: 'IA',
        source: '沪东重机有限公司'
      },
      '2': {
        type: '5S60MC',
        count: '8833.00',
        certNO: '105.00',
        material: '100.00',
        weight: '200',
        diameter: '150',
        pitch: '20',
        ypCount: '2',
        turnTo: 'right',
        iceCode: 'IA',
        source: '沪东重机有限公司'
      }
    }
  }))
}

export default [
  {
    url: '/ship/list',
    type: 'get',
    response: config => {
      const { operator, nameOrimo, startSpeed, endSpeed, shipTypeCode, shipSubTypeCode, gross, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (operator && item.operator.indexOf(operator) < 0) return false
        if (nameOrimo && (item.shipName.indexOf(nameOrimo) < 0 && item.shipNameCn.indexOf(nameOrimo) < 0 && item.shipName.indexOf(nameOrimo) < 0 && item.imono.indexOf(nameOrimo) < 0 && item.registNo.indexOf(nameOrimo) < 0)) return false
        if ((startSpeed && item.speed >= startSpeed) && (endSpeed && item.speed <= endSpeed)) return false
        if (shipTypeCode && item.shipTypeCode !== shipTypeCode) return false
        if (shipSubTypeCode && item.shipSubTypeCode !== shipSubTypeCode) return false
        if (gross && item.gross !== gross) return false
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
    url: '/ship/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/ship/getfullInfo',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/ship/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/ship/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/ship/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
