import { ref } from 'vue'
import meteringAPI from '@/api/modules/information/metering.ts'

const datalist = ref()
const useMeteringStore = defineStore('metering', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await meteringAPI.getmeteringDataList(data)
    datalist.value = res
  }
  const Delete = async (data: NonNullable<unknown>) => {
    await meteringAPI.Deletedatalist(data)
  }
  return {
    getdataList,
    datalist,
    Delete,
  }
})
export default useMeteringStore
