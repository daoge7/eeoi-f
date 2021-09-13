import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: +Mock.Random.guid(),
    num: i+1,
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    name: '@title(1,5)', 
    'type|1': ['1', '2', '3'],
    display_time: '@datetime',
    table_name: 'xxx',
    dataId: '123456789',
    'content|1': ['登录系统', '操作XX表，对id为XXXXXXXXX的数据进行删除操作', '操作XX表，对id为XXXXXXXXX的数据进行修改操作']
  }))
}

export default [
  {
    url: '/sysLog/logList',
    type: 'get',
    response: config => {
      const { name,type, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (type && item.type !== type) return false
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
    url: '/sysLog/logDetail',
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
  }
]
