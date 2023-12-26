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
  // 删除上下料点
  delMaterialPointDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_FeedPoint/DeleteData', array)
  },
  // 启用与停用料点
  IsEnableMaterialPoint(id: NonNullable<string>, Enable: NonNullable<boolean>) {
    return api.post(`/PB/PB_FeedPoint/Enable?id=${id}&enable=${Enable}`)
  },
  // 获取物料清单
  getMaterialPointBoMDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_MaterialPoint/GetDataList', data)
  },
  // 添加物料
  AddMaterialPointBoMDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_MaterialPoint/SaveDatas', data)
  },
  // 删除物理老
  delMaterialPointBoMDataList(PointId: NonNullable<string>, array: NonNullable<any>) {
    return api.post(`/PB/PB_MaterialPoint/DeleteData?PointId=${PointId}`, array)
  },
}
