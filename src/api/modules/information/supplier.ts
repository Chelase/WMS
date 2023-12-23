import api from '../../index'

export default {
  // 获取供应商列表
  getSupplierDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Supplier/QueryDataList', data)
  },
  // 新增供应商

  // 删除供应商
  delSupplierDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_Supplier/DeleteData', array)
  }
}
