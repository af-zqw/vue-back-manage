import {getRequest, postRequest} from '../lib/axios'

// 表格表单弹窗
export const getTableData = (params) => {
  return getRequest('table', params)
}

// 折线图
export const getLineCharData = (params) => {
  return getRequest('line/char', params)
}

// 柱状图
export const getBarCharData = (params) => {
  return getRequest('bar/char', params)
}

// 饼图
export const getPieCharData = (params) => {
  return getRequest('pie/char', params)
}

// 设备管理
export const getDeviceData = (params) => {
  return postRequest('device', params)
}
