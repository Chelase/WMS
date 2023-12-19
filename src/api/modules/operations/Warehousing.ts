import api from '@/api/index'

export function getdataListAPI(data) {
  return api({
    url: '/TD/TD_InStorage/GetDataList',
    method: 'post',
    data,
  })
}
