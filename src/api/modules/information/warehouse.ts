import api from '../../index.ts'

export default {
  // 获取仓库列表
  getWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetDataList', data)
  },
  // 新增仓库
  AddWarehouse(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/SaveData', data)
  },
  // 删除仓库
  delWarehouseDataList(array: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/DeleteData', array)
  },
  // 获取巷道
  getRoadwayDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/GetDataList', data)
  },
  // 新增巷道
  AddRoadway(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/SaveData', data)
  },
  // 获取货架
  getGoodsShelves(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/GetDataList', data)
  },
}
