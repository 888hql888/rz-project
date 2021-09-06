// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'
import Excelimport from './Excelimport'
import uploadImg from './uploadImg'
import fullScreen from './fullScreen'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('Excelimport', Excelimport)
    Vue.component('uploadImg', uploadImg)
    Vue.component('fullScreen', fullScreen)
  }
}
