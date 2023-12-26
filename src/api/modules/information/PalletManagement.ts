import api from '../../index.ts'

export default {
  getPalletDataList(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/GetDataList', data)
  },
  DeleteData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/DeleteData', data)
  },
  GetAllData() {
    return api.post('/PB/PB_TrayType/GetAllData')
  },
  SaveData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/SaveData', data)
  },
  GetTheData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/GetTheData', data)
  },
  DisableTheData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/DisableTheData', data)
  },
  EnableTheData(data: NonNullable<unknown>) {
    return api.post('/PB/PB_Tray/EnableTheData', data)
  },
}
