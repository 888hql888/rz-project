import request from '@/utils/request'

export function login(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

export function getUserInfonfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}



export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
/** *
 *  获取某个用户的基本信息
 *
 * ***/
 export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

