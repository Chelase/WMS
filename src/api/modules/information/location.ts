import api from '../../index.ts'

export default {
  getLocationDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Location/GetDataList', data)
  },
  getstorageDataList() {
    return api.get('/Base/Base_UserStor/GetStorage')
  },
  getbystorDataList(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_StorArea/GetDataListByStor?StorId=${data}`)
  },
  getLaneDataList(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_Laneway/GetDataListByStor?StorId=${data}`)
  },
  getRackDataList(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_Rack/GetDataListByStor?StorId=${data}`)
  },
  SaveData(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_Location/SaveData`, data)
  },
  DeleteData(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_Location/DeleteData`, data)
  },
  GetTheData(data: NonNullable<unknown>) {
    return api.post(`/PB/PB_Location/GetTheData`, data)
  },
}
