import { Loading } from 'element-ui'
 
let loadingCount = 0
let loading
 
const startLoading = (options = {}) => {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)',
        ...options,
    })
}
 
const endLoading = () => {
    loading.close()
}
 
 const showLoading = (options) => {
    if (loadingCount === 0) {
        startLoading(options)
    }
    loadingCount += 1
}
const hideLoading = () => {
    if (loadingCount <= 0) {
        return
    }
    loadingCount -= 1
    if (loadingCount === 0) {
        endLoading()
    }
}

export {startLoading,endLoading,showLoading,hideLoading}