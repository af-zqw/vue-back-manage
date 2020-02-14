/**
 * 管理小程序,需要启动node项目
 */
import axios from 'axios'
const base = 'http://localhost:3000/'

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
