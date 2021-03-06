import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import {startLoading,endLoading,showLoading,hideLoading} from './loading'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    showLoading()
    if (store.getters.token) {
      // config.headers['token'] = getToken()
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    hideLoading()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  
  response => {
    const res = response.data
    hideLoading()
    // if the custom code is not 20000, it is judged as an error.
    return res 
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    hideLoading()
    return Promise.reject(error)
  }
)

export default service
