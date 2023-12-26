import api from '../../index.ts'

export default {
  // 获取计划
  getPlannedDataList(data: NonNullable<unknown>) {
    return api.post('/PD/PD_Plan/GetDataList', data)
  },
  // 删除计划
  delPlannedDataList(array: NonNullable<unknown>) {
    return api.post('/PD/PD_Plan/DeleteData', array)
  },
  // 启用与停用料点
  IsStatus(id: NonNullable<string>, Status: NonNullable<boolean>) {
    return api.post(`/PD/PD_Plan/Status?Id=${id}&status=${Status}`)
  },
}
