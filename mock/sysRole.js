import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: +Mock.Random.guid(),
    createTimestamp: +Mock.Random.date('T'),
    updateTimestamp: +Mock.Random.date('T'),
    author: '@first',
    name: 'code' + i,
    title: '角色' + i,
    'roleStatus|1': ['1', '0'],
    display_time: '@datetime',
    remark: ''
  }))
}

export default [
  {
    url: '/sysrole/roleList',
    type: 'get',
    response: config => {
      const { name, status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.roleStatus !== status) return false
        if (name && item.code.indexOf(name) < 0 && item.name.indexOf(name) < 0) return false
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
    url: '/sysRole/roleDetail',
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
    url: '/sysRole/createRole',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/sysRole/updateRole',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

