import api from '@/api/index'

export default {
  getdataListAPI(data: NonNullable<unknown>) {
    return api.post('/TD/TD_OutStorage/GetDataList', data)
  },
}
