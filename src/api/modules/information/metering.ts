import api from '../../index.ts'

export default {
  getmeteringDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Measure/GetDataList', data)
  },
  Deletedatalist(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Measure/DeleteData', data)
  },
}
