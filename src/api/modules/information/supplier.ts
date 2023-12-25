import api from '../../index'

export default {
  // 获取供应商列表
  getSupplierDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Supplier/QueryDataList', data)
  },
  // 新增供应商
  AddSupplierDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Supplier/SaveData', data)
  },
  // 删除供应商
  delSupplierDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_Supplier/DeleteData', array)
  },
  // 获取编辑供应商详情
  getEditSupplierDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_Supplier/GetTheData', id)
  },
  // 获取地址
  getAddressDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Address/QueryDataList', data)
  },
  // 添加地址
  AddAddressDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Address/SaveData', data)
  },
  // 获取编辑地址详情
  getEditAddressDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_Address/GetTheData', id)
  },
  // 删除地址
  delAddressDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_Address/DeleteData', array)
  },
  // 修改地址启用停用
  EditAddressDataIsEnable(id: NonNullable<string>) {
    return api.post(`/PB/PB_Address/ModifyEnable?id=${id}`)
  },
  // 修改地址默认
  EditAddressDataIsDefault(id: NonNullable<string>) {
    return api.post(`/PB/PB_Address/ModifyDefault?id=${id}`)
  },
  // 导入供应商模板
  ImportSupplierDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Supplier/Import', data)
  },
}
