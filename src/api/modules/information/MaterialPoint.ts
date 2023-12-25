import api from '../../index'

export default {
  // 获取上下料点
  getMaterialPointDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_FeedPoint/GetDataList', data)
  }
}
