import request from './utils/request'
const testHost = 'https://api.chinamall66.com/'  // https://apiminiv4.i-top.cn
const proHost = 'https://api.chinamall66.com/'

const NODE_ENV = process.env.NODE_ENV
const baseUrl = NODE_ENV === 'development' ? testHost : proHost


  /**
   * 城市列表
   *  接口地址: /apimini/common/getprovincelist
   *  可传参数：
   *  @params {string}
   */
  // export function getProductList (params) {
  //   return request.post(baseUrl + '/apimini/common/getprovincelist', params)
  // }
  //登录接口
  export function UrlLogin (params) {
    return request.post(baseUrl + 'admin/login', params)
  }
  //用户列表接口
  export function UrlUser (params) {
    return request.post(baseUrl + 'user/list', params)
  }
   //用户编辑接口
   export function UrlUserEdit (params) {
    return request.post(baseUrl + 'user/update', params)
  }
  //新增标签接口
  export function UrlLabelAdd (params) {
    return request.post(baseUrl + 'tag/create', params)
  }
  //标签列表接口
  export function UrlLabel (params) {
    return request.post(baseUrl + 'tag/list', params)
  }
  //更改标签名
  export function UrlLabelEdit (params) {
    return request.post(baseUrl + 'tag/update', params)
  }

  //文字素材管理接口
  export async function UrltextStock (params) {
    return request.post(baseUrl + 'textStock/list', params)
  }
   //更改文字素材管理接口
   export function UrltextStockEdit (params) {
    return request.post(baseUrl + 'textStock/update', params)
  }
   //更改文字素材管理接口
   export function UrltextStockAdd (params) {
    return request.post(baseUrl + 'textStock/create', params)
  }
   //新增推广管理接口
   export function UrlChannelAdd (params) {
    return request.post(baseUrl + 'channel/create', params)
  }
   //推广管理接口
   export function UrlChannel (params) {
    return request.post(baseUrl + 'channel/list', params)
  }
 //更改推广管理接口
  export function UrlChannelEdit (params) {
    return request.post(baseUrl + 'channel/update', params)
  }

  //获取视频管理列表
  export function videoList (params) {
    return request.post(baseUrl + 'video/list', params)
  }
  //获取视频地址前缀
  export function configQuery (params) {
    return request.post(baseUrl + 'config/query', params)
  }