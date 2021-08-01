import request from '@/utils/request'

// 获取组织结构
const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}
/**
 *  获取员工的简单列表
 * **/
 const getEmployeeSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}

//删除部门
const delDepartments = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
//添加部门
const addDepartments = data => { 
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

//编辑部门
const updateDepartments = data => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

export {
  getDepartments,
  delDepartments,
  addDepartments,
  getEmployeeSimple,
  updateDepartments
}