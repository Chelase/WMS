import api from '@/api/index'

export function getdataListAPI(data) {
  return api({
    url: '/TD/TD_InStorage/GetDataList',
    method: 'post',
    data,
  })
}
export function GetTreeDataListAPI() {
  return api({
    url: '/PB/PB_MaterialType/GetTreeDataList',
    method: 'post',
  })
}
