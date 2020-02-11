/**
 * Created by 60411 on 2020/2/11.
 */
import axios from 'axios'
import { MessageBox, Loading } from 'element-ui'
// import cookie from 'js-cookie'

axios.defaults.timeout = 25000

let loading = {close() {return }}
axios.interceptors.request.use((request) => {
  // 如果刷新消息不需loading
  if (!request['0']) {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.5)'
    })
  }
  return request
})

axios.interceptors.response.use(response => {
    loading.close()
    return Promise.resolve(response.data)
  }, err => {
    loading.close()
    MessageBox(err.message)
    return Promise.resolve(err)
  }
)

const request = axios

export default request
