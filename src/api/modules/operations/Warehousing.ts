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
export function GetDataList(data) {
  return api({
    url: '/PB/PB_Location/GetDataList',
    method: 'post',
    data,
  })
}
export function QueryStorageDataAPI() {
  return api({
    url: '/PB/PB_Storage/QueryStorageData',
    method: 'post',
  })
}
export function QueryDataListAPI(data) {
  return api({
    url: '/PB/PB_Material/QueryDataList',
    method: 'post',
    data,
  })
}
export function QueryDatagongListAPI(data) {
  return api({
    url: '/PB/PB_Supplier/QueryDataList',
    method: 'post',
    data,
  })
}
