/**
 * 管理轮播图
 */
import { getRequest, postRequest } from '@/lib/miniprogramAxios'

// 获取轮播图列表
export const fetchList = (params) => {
  return getRequest('swiper/list', params)
}

// 删除单张轮播图
export const del = (params) => {
  return getRequest('swiper/del', params)
}
