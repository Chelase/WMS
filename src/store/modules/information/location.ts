import { ref } from 'vue'
import locationAPI from '@/api/modules/information/location.ts'

const datalist = ref()
const storage = ref()
const bystor = ref()
const lanedata = ref()
const rackdata = ref()
const thedata = ref()
const useLocationStore = defineStore('location', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.getLocationDataList(data)
    datalist.value = res
  }
  const getstoredataList = async () => {
    const res = await locationAPI.getstorageDataList()
    storage.value = res
  }
  const getbystordataList = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.getbystorDataList(data)
    bystor.value = res
  }
  const getLaneDataList = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.getLaneDataList(data)
    lanedata.value = res
  }
  const getRackDataList = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.getRackDataList(data)
    rackdata.value = res
  }
  const SaveData = async (data: NonNullable<unknown>) => {
    await locationAPI.SaveData(data)
  }
  const DeleteData = async (data: NonNullable<unknown>) => {
    await locationAPI.DeleteData(data)
  }
  const GetTheData = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.GetTheData(data)
    thedata.value = res
  }
  return {
    GetTheData,
    thedata,
    DeleteData,
    getdataList,
    getRackDataList,
    datalist,
    SaveData,
    getstoredataList,
    getbystordataList,
    storage,
    bystor,
    getLaneDataList,
    lanedata,
    rackdata,
  }
})
export default useLocationStore
