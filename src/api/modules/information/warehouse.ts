import api from '../../index.ts'

export default {
  // 获取仓库列表
  getWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetDataList', data)
  },
  // 新增仓库
  AddWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/SaveData', data)
  },
  // 获取编辑仓库详情
  GetEditWarehouseDataList(id: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetTheData', id)
  },
  // 编辑仓库
  EditWarehouseDataList(data: NonNullable<unknown>) {
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
  AddRoadwayDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/SaveData', data)
  },
  // 获取货架
  getGoodsShelvesDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/GetDataList', data)
  },
  // 新增货架
  AddGoodsShelvesDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/SaveData', data)
  },
}
