import Mock from 'mockjs'

const List = []
const count = 2

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'jobNum|1': ['SQA20190820LMING001', 'SQA20191120LMING005'],
    jobStartDate: '2019-08-20',
    internalPurpose: '确保HSQE管理体系有效运行',
    internalDate: '2020-01-20',
    internalProject: '船舶SSP规定的所有项目',
    'jobStatus|1': ['1', '2'],
    notifyDate: '2019-08-20',
    'notifiedDeptOrShip|1': ['机务部', '明景'],
    notifiedPerson: '',
    remark: '备注描述等'
  }))
}

const todoList = [
  {
    id: '001',
    jobNum: 'SQA20191120LMING005',
    name: '内审通知',
    date: '2019-05-04'
  }, {
    id: '002',
    jobNum: 'SQA20191120LMING005',
    name: '船舶险情报告',
    date: '2019-05-04'
  }
]

export default [
  {
    url: '/hkmw/internalList',
    type: 'get',
    response: config => {
      const { jobNum, jobStatus, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (jobNum && item.jobNum.indexOf(jobNum) < 0) return false
        if (jobStatus && item.jobStatus !== jobStatus) return false
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
    url: '/hkmw/createInternal',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/hkmw/submitInternal',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/hkmw/todoList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: todoList.length,
          items: todoList
        }
      }
    }
  },
  {
    url: '/hkmw/internalDetail',
    type: 'get',
    response: config => {
      const { id } = config.query
      const item = {
        id: '001',
        jobNum: 'SQA20191120LMING005',
        name: '内审通知',
        date: '2019-05-04'
      }
      return {
        code: 20000,
        data: item
      }
    }
  }
  
]
