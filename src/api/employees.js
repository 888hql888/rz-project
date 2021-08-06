import request from '@/utils/request'

const getEmployeeList = (params) => {
    return request({
      url: '/sys/user',
      params
    })
}
const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

const addEmployee = (data) => {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
export { getEmployeeList , delEmployee ,addEmployee} 