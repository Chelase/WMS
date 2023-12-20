import api from '../../index.ts'

export default {
  // 获取仓库列表
  getWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetDataList', data)
  },
  // 新增及编辑仓库
  AddWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/SaveData', data)
  },
  // 获取编辑仓库详情
  GetEditWarehouseDataList(id: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetTheData', id)
  },
  // 删除仓库
  delWarehouseDataList(array: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/DeleteData', array)
  },
  // 获取巷道
  getRoadwayDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/GetDataList', data)
  },
  // 获取巷道编辑详情
  GetEditRoadwaySlideover(id: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/GetTheData', id)
  },
  // 新增及编辑巷道
  AddRoadwayDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Laneway/SaveData', data)
  },
  // 获取货架
  getGoodsShelvesDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/GetDataList', data)
  },
  // 获取货架编辑详情
  GetEditGoodsShelvesData(id: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/GetTheData', id)
  },
  // 新增及编辑货架
  AddGoodsShelvesDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Rack/SaveData', data)
  },
}
