import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    userId: '',
    num: i + 1,
    ccsCode: '@increment(10000)',
    imoid: '@increment(20000)',
    nameCn: '@title(5, 10)',
    nameEn: '@title(5, 10)',
    'parentCompany|1': ['公司1', '公司2', '公司3', '公司4', '公司5'],
    'companyType|1': ['船公司', '主管机关', '验证机构'],
    registerAdressCn: '@city(true)',
    registerAdressEn: '@city(true)',
    officeAdressCn: '@city(true)',
    officeAdressEn: '@city(true)',
    contactPerson: '@cname',
    contactTel: '@increment(10000)',
    contactEmail: '@email',
    'businessScope|1': ['集装箱船', '散货船', '油轮', '其它'],
    businessLine: '@title(5, 10)',
    certificateNo: '@increment(10000)',
    certificateDate: +Mock.Random.date('T'),
    remark: '@title(5, 10)',
    code: '@increment(10000)',
    iacs: '@increment(200)',
    compandyIds: []
  }))
}

export default [
  {
    url: '/shipcompany/usercompanylist',
    type: 'get',
    response: config => {
      const { userId, name, adress, code, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (userId && item.userId.indexOf(userId) < 0) return false
        if (name && item.name.indexOf(name) < 0) return false
        if (adress && item.adress.indexOf(adress) < 0) return false
        if (code && item.code.indexOf(code) < 0) return false
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
    url: '/shipcompany/list',
    type: 'get',
    response: config => {
      const { name, adress, code, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (adress && item.adress.indexOf(adress) < 0) return false
        if (code && item.code.indexOf(code) < 0) return false
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
    url: '/shipCompany/list',
    type: 'get',
    response: config => {
      const { name, adress, code, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (adress && item.adress.indexOf(adress) < 0) return false
        if (code && item.code.indexOf(code) < 0) return false
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
    url: '/shipCompany/detail',
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
    url: '/shipCompany/pv',
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
    url: '/shipCompany/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/shipCompany/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

