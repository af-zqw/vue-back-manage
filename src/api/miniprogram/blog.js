/**
 * 管理博客
 */
import { getRequest, postRequest } from '@/lib/miniprogramAxios'

export const fetchList = (params) => {
  return getRequest('blog/list', params)
}
