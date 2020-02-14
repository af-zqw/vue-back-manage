/**
 * 管理歌单
 */
import { getRequest, postRequest } from '@/lib/miniprogramAxios'

/**
 * 获取歌单列表
 */
export const fetchList = (params) => {
  return getRequest('playlist/list', params)
}

/**
 * 查询单条歌单
 */
export const fetchById = (params) => {
  return getRequest('playlist/getById', params)
}

/**
 * 提交修改歌单信息
 */
export const update = (params) => {
  return postRequest('playlist/updatePlaylist', params)
}

/**
 * 删除单条歌单
 */
export const del = (params) => {
  return getRequest('playlist/del', params)
}