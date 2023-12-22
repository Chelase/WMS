import api from '../../index'

export default {
  // 获取货区表格
  getCargoAreaDataList(data: NonNullable<object>) {
    return api.post('/PB/PB_StorArea/GetDataList', data)
  },
  // 获取仓库
  getCargoAreaWarehouseDataList() {
    return api.get('/Base/Base_UserStor/GetStorage')
  },
  // 获取货区下拉
  getQueryDataList() {
    return api.get('/Base/Base_Enum/GetByCode?code=StorAreaType')
  },
  // 新增货区
  AddCargoAreaDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_StorArea/SaveData', data)
  },
  // 获取货区编辑详情
  getEditCargoAreaDataList(id: NonNullable<unknown>) {
    return api.post('/PB/PB_StorArea/GetTheData', id)
  },
  // 删除货区数据
  delCargoAreaDataList(array: NonNullable<any>) {
    return api.post('/PB/PB_StorArea/DeleteData', array)
  },
  // 获取物料清单
  getBoMDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_AreaMaterial/GetDataList', data)
  },
  // 删除物料
  delBoMDataList(AreaId: NonNullable<string>, array: NonNullable<any>) {
    return api.post(`/PB/PB_AreaMaterial/DeleteData?AreaId=${AreaId}`, array)
  },
  // 获取物料类型树列表
  getBoMTreeDataList() {
    return api.post('/PB/PB_MaterialType/GetTreeDataList')
  },
  // 获取物料
  getBoMQueryDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Material/QueryDataList', data)
  },
  // BoM添加物料
  AddBoMQuerySaveData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_AreaMaterial/SaveDatas', data)
  },
}
