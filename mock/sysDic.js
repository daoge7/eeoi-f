import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: +Mock.Random.guid(),
    num: i+1,
    'code|1': ['USER_STATUS', 'ROLE_STATUS', 'DIC_STATUS'],
    'title|1': ['用户状态', '角色状态', '字典状态'],
    'dicStatus|1': ['1', '0'],
    'dicType|1': ['1'],
    dicValue: '1.正常;2.冻结',
    createTimestamp: +Mock.Random.date('T'),
    updateTimestamp: +Mock.Random.date('T'),
    remark: ''
  }))
}

export default [
  {
    url: '/sysDic/dicList',
    type: 'get',
    response: config => {
      const { name,status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.dicStatus !== status) return false
        if (name && item.code.indexOf(name) < 0 && item.title.indexOf(name) < 0) return false
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
    url: '/sysDic/dicDetail',
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
    url: '/sysDic/createDic',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/sysDic/updateDic',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
