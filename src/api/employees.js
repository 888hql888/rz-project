import request from '@/utils/request'

const getEmployeeList = (params) => {
    return request({
      url: '/sys/user',
      params
    })
}

export { getEmployeeList } 