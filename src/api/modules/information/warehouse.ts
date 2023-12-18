import api from '../../index.ts'

export default {
  // 获取仓库列表
  getWarehouseDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Storage/GetDataList', data)
  },
}
