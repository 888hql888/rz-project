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
// 给角色分配权限
const  assignPerm = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
//获取角色详情
const getRoleDetail = (id) =>{
  return request({
    url:`/sys/role/${id}`
  })
}



export {getRoleList,getCompanyInfo,addRole,deleteRole,assignPerm,getRoleDetail}