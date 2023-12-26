import { ref } from 'vue'
import meteringAPI from '@/api/modules/information/metering.ts'

const datalist = ref()
const getdata = ref()
const useMeteringStore = defineStore('metering', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await meteringAPI.getmeteringDataList(data)
    datalist.value = res
  }
  const Delete = async (data: NonNullable<unknown>) => {
    await meteringAPI.Deletedatalist(data)
  }
  const SaveDate = async (data: NonNullable<unknown>) => {
    await meteringAPI.SaveDate(data)
  }
  const GetTheData = async (data: NonNullable<unknown>) => {
    const res = await meteringAPI.GetTheData(data)
    getdata.value = res
  }
  return {
    GetTheData,
    SaveDate,
    getdata,
    getdataList,
    datalist,
    Delete,
  }
})
export default useMeteringStore
