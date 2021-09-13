import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    num: i + 1,
    author: '@first',
    nameEn: '@name',
    nameCn: '@cname',
    account: '@title(1, 2)',
    'userStatus|1': ['1', '0'],
    timestamp: +Mock.Random.date('T'),
    display_time: '@datetime',
    'userDept|1': ['1', '2'],
    'userRole|1': ['1', '2', '3', '4'],
    email: 'aaa@qq.com',
    phone: '12345678',
    remark: '',
    'manageShips|1': ['船舶1，船舶2，船舶3，船舶4，船舶5，船舶6，船舶7', '船舶2，船舶3，船舶4', '船舶5，船舶6，船舶7，船舶8', '船舶9', '船舶10']
  }))
}

export default [
  {
    url: '/sysUser/userList',
    type: 'get',
    response: config => {
      const { account, userdept, userstatus, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (userstatus && item.userStatus !== userstatus) return false
        if (userdept && item.userDept !== userdept) return false
        if (account && item.name.indexOf(account) < 0 && item.name.indexOf(account) < 0 && item.nameCn.indexOf(account) < 0) return false
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
    url: '/sysUser/userDetail',
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
    url: '/sysUser/createuser',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/sysUser/updateUser',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

