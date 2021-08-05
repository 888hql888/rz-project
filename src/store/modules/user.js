import { login, logout, getUserInfonfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  CLEAR_USER:(state) => {
    state.name = ''
    state.token = ''
    removeToken()
  },
  SET_USERINFO:(state,value) => {
      state.userInfo = value
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile.trim(), password: password }).then(response => {
        // console.log(response,'res')
        const { data } = response
        commit('SET_TOKEN',data)
        setToken(data)
        resolve()
      }).catch(error => {
        console.log(8888)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfonfo().then(response => {
        const { data } = response
        // console.log(data,'data 53')
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {username} = data
        commit('SET_NAME', username)
        commit('SET_USERINFO',data)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        resetRouter()
        commit('CLEAR_USER')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

