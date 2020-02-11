import request from './utils/request'
const testHost = 'https://apiminiv4.i-top.cn'
const proHost = 'https://apiminiv4.i-top.cn'

const NODE_ENV = process.env.NODE_ENV
const baseUrl = NODE_ENV === 'development' ? testHost : proHost


  /**
   * 城市列表
   *  接口地址: /apimini/common/getprovincelist
   *  可传参数：
   *  @params {string}
   */
  export function getProductList (params) {
    return request.post(baseUrl + '/apimini/common/getprovincelist', params)
  }