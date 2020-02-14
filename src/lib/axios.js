import axios from 'axios'
// 网址:http://rap2.taobao.org/
const base = 'http://rap2api.taobao.org/app/mock/234485/'

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}
