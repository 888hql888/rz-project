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
const importEmployee = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
 const  saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
 const getPersonalDetail = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
const updatePersonal = (data) => {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
const getJobDetail = (id) => {
  return request({
    url: `/employees/${id}/jobs`
  })
}


/**
 * 保存岗位信息
 * ****/
const updateJob = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
/** *
 * 给用户分配角色
 * ***/
const assignRoles = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
export {
  getEmployeeList , 
  delEmployee ,
  addEmployee , 
  importEmployee,
  saveUserDetailById,
  getPersonalDetail,
  updatePersonal,
  getJobDetail,
  updateJob,
  assignRoles
} 