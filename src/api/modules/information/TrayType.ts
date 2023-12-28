import api from '../../index'

export default {
  // 获取托盘类型
  getTrayTypeDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayType/GetDataList', data)
  },
  // 新增及编辑托盘类型
  AddTrayTypeDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayType/SaveData', data)
  },
  // 获取编辑托盘详情
  getEditTrayTypeDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_TrayType/GetTheData', id)
  },
  // 删除托盘类型
  delTrayTypeDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_TrayType/DeleteData', array)
  },
  // 获取分区管理列表
  getPartitioningDataList(typeId: NonNullable<string>) {
    return api.post(`/PB/PB_TrayZone/GetDataListByType?typeId=${typeId}`)
  },
  // 添加分区
  AddPartitioningDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayZone/SaveData', data)
  },
  // 获取分区编辑详情
  getEditPartitioningDataList(id: NonNullable<object>) {
    return api.post('/PB/PB_TrayZone/GetTheData', id)
  },
  // 删除分区
  delPartitioningDataList(array: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayZone/DeleteData', array)
  },
  // 获取托盘类型物料
  getTrayTypeBoMList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayMaterial/GetDataList', data)
  },
  // 添加物料
  AddTrayTypeBoMList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_TrayMaterial/SaveDatas', data)
  },
}
