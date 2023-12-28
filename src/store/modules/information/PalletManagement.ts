import { ref } from 'vue'
import PalletManagement from '@/api/modules/information/PalletManagement.ts'

const datalist = ref()
const Tuodata = ref()
const getThedata = ref()
const usePalletManagementStore = defineStore('metering', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await PalletManagement.getPalletDataList(data)
    datalist.value = res
  }
  const DeleteData = async (data: NonNullable<unknown>) => {
    await PalletManagement.DeleteData(data)
  }
  const GetAllData = async () => {
    const res = await PalletManagement.GetAllData()
    Tuodata.value = res
  }
  const SaveData = async (data: NonNullable<unknown>) => {
    const res = await PalletManagement.SaveData(data)
    Tuodata.value = res
  }
  const GetTheData = async (data: NonNullable<unknown>) => {
    const res = await PalletManagement.GetTheData(data)
    getThedata.value = res
  }
  const DisableTheData = async (data: NonNullable<unknown>) => {
    await PalletManagement.DisableTheData(data)
  }
  const EnableTheData = async (data: NonNullable<unknown>) => {
    await PalletManagement.EnableTheData(data)
  }
  return {
    EnableTheData,
    DisableTheData,
    getThedata,
    GetTheData,
    SaveData,
    Tuodata,
    GetAllData,
    DeleteData,
    getdataList,
    datalist,
  }
})
export default usePalletManagementStore
