import api from '../../index'

export default {
  // 获取上下料点
  getMaterialPointDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_FeedPoint/GetDataList', data)
  },
  // 获取巷道
  getByStorDataList(StorId: NonNullable<string>) {
    return api.post(`/PB/PB_Laneway/GetDataListByStor?StorId=${StorId}`)
  },
  // 新增料点
  AddMaterialPointDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_FeedPoint/SaveData', data)
  },
  // 获取编辑料点详情
  getEditMaterialPointDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_FeedPoint/GetTheData', id)
  },
}
