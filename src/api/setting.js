import request from '@/utils/request'

const getRoleList = (params) => {
    return request({
      url: '/sys/role',
      params
    })
}
const getCompanyInfo = (companyId) => {
  return request({
    url: `/company/${companyId}`
  })
}
const addRole = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
const deleteRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}


export {getRoleList,getCompanyInfo,addRole,deleteRole}