import api from '../../index'

export default {
  // 获取物料类型树状列表
  getMaterialTreeDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_MaterialType/GetTreeDataList', data)
  },
  // 添加物料类型
  AddMaterialDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_MaterialType/SaveData', data)
  },
  // 删除物料类型
  delMaterialTreeDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_MaterialType/DeleteData', array)
  },
  // 获取编辑物料类型详情
  getEditMaterialTreeDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_MaterialType/GetTheData', id)
  },
}
