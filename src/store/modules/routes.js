import {constantRoutes,asyncRoutes} from '@/router'
const state = {
  allRoters:[...constantRoutes] || [] //所有的路由  默认拥有大部分静态路由
}

const mutations = {
  SET_ALLROUTERS(state,value){
      state.allRoters = value
  }
}

const actions = {
  getPermissionRoute(store) {
    console.log(store,'store')
    //  let userMenus = store.user.userInfo.roles.menus
     let userMenus = store.rootState.user.userInfo.roles.menus
     console.log(userMenus,'userMenus')
     let new_arr = []
     asyncRoutes.map(item => {
       if(userMenus.includes(item.name)){
         new_arr.push(item)
       }
       //以下是来恢复所有的权限
      //  new_arr.push(item)

     })
    //  //整合符合的路由
     store.commit('SET_ALLROUTERS',[...constantRoutes,...new_arr])
     return new_arr
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

