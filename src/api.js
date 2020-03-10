import request from './utils/request'
const testHost = 'https://api.chinamall66.com/'  // https://apiminiv4.i-top.cn
const proHost = 'https://apiminiv4.i-top.cn'

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
   //新增用户列表接口
   export function UrlUserAdd (params) {
    return request.post(baseUrl + 'user/create', params)
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
  // 删除标签
  export function UrlLabelDelte (params) {
    return request.post(baseUrl + 'tag/delete', params)
  }
  
  //文字素材管理接口
  export function UrltextStock (params) {
    return request.post(baseUrl + 'textStock/list', params)
  }
   //更改文字素材管理接口
   export function UrltextStockEdit (params) {
    return request.post(baseUrl + 'textStock/update', params)
  }
  // 文字素材删除接口
  export function UrltextStockDelete (params) {
    return request.post(baseUrl + 'textStock/delete', params)
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
  // 推广管理删除接口
  export function UrlChannelDelete (params) {
    return request.post(baseUrl + 'channel/delete', params)
  }
  // 视频管理
  export function UrlVideo (params) {
    return request.post(baseUrl + 'video/list', params)
  }
  export function UrlVideoquery (params) {
    return request.post(baseUrl + 'config/query', params)
  }