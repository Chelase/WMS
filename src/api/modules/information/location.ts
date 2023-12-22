import api from '../../index.ts'

export default {
  getLocationDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Location/GetDataList', data)
  },
}
