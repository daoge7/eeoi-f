import Mock from 'mockjs'

const List = []
List.push(Mock.mock({
  id: +Mock.Random.guid(),
  num: 1,
  author: '@first',
  name: '系统管理',
  code: 'SysManage',
  url: '',
  timestamp: +Mock.Random.date('T'),
  display_time: '@datetime',
  parent: '0',
  'funcStatus|1': ['1', '0'],
  remark: '',
  children: [
    {
    id: +Mock.Random.guid(),
    num: 101,
    author: '@first',
    name: '用户管理',
    code: 'UserManage',
    url: '/sysManage/sysUser',
    timestamp: +Mock.Random.date('T'),
    display_time: '@datetime',
    parent: '1',
    'funcStatus|1': ['1', '0'],
    remark: ''
    },
    {
      id: +Mock.Random.guid(),
      num: 102,
      author: '@first',
      name: '角色管理',
      code: 'RoleManage',
      url: '/sysManage/sysRole',
      timestamp: +Mock.Random.date('T'),
      display_time: '@datetime',
      parent: '1',
      'funcStatus|1': ['1', '0'],
      remark: ''
    }]
}))
List.push(Mock.mock({
  id: +Mock.Random.guid(),
  num: 2,
  author: '@first',
  name: '船公司管理',
  code: 'ShipCompany',
  url: '/shipCompany/list',
  timestamp: +Mock.Random.date('T'),
  display_time: '@datetime',
  parent: '0',
  'funcStatus|1': ['1', '0'],
  remark: ''
}))
List.push(Mock.mock({
  id: +Mock.Random.guid(),
  num: 3,
  author: '@first',
  name: '船队管理',
  code: 'ShipManage',
  url: '',
  timestamp: +Mock.Random.date('T'),
  display_time: '@datetime',
  parent: '0',
  'funcStatus|1': ['1', '0'],
  remark: '',
  children: [{
    id: +Mock.Random.guid(),
    num: 301,
    author: '@first',
    name: '船舶列表',
    code: 'ShipList',
    url: '/ship/list',
    timestamp: +Mock.Random.date('T'),
    display_time: '@datetime',
    parent: '3',
    'funcStatus|1': ['1', '0'],
    remark: ''
  }]
}))
export default [
  {
    url: '/sysFunc/funcList',
    type: 'get',
    response: config => {
      const { name, status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.funcStatus !== status) return false
        if (name && item.name.indexOf(name) < 0) return false
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
    url: '/sysFunc/funcDetail',
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
    url: '/sysFunc/createFunc',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/sysFunc/updateFunc',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
