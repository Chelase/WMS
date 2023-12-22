import { ref } from 'vue'
import locationAPI from '@/api/modules/information/location.ts'

const datalist = ref()
const useLocationStore = defineStore('location', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await locationAPI.getLocationDataList(data)
    datalist.value = res
  }
  return {
    getdataList,
    datalist,
  }
})
export default useLocationStore
