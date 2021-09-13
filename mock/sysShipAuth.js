import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: +Mock.Random.guid(),
    imono:'@increment(10000)',
    registNo:'@increment(50000)',
    shipName:'@name',
    shipNameCn:'@cname',
    'company|1': ['机构1', '机构2', '机构3', '机构4', '机构5', '机构6'],
    'shipTypeCode|1': ['1', '2', '3', '4', '5', '6'],
    'area|1': ['区域1', '区域2', '区域3', '区域4', '区域5', '区域6']
  }))
}

export default [
  {
    url: '/sysShipAuth/shipList',
    type: 'get',
    response: config => {
      const { nameOrimo, company, type, area, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (nameOrimo && (item.shipName.indexOf(nameOrimo)<0 && item.shipNameCn.indexOf(nameOrimo)<0 && item.shipName.indexOf(nameOrimo)<0 && item.imono.indexOf(nameOrimo)<0 && item.registNo.indexOf(nameOrimo)<0)) return false
        if (company && item.company.indexOf(company)<0) return false
        if (type && item.shipTypeCode !== type) return false
        if (area && item.area.indexOf(area)<0) return false
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