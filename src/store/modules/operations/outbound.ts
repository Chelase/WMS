import { ref } from 'vue'
import outboundAPI from '@/api/modules/operations/outbound.ts'

const datalist = ref([])
const useOutboundStore = defineStore('outbound', () => {
  const getdataList = async (data: NonNullable<unknown>) => {
    const res = await outboundAPI.getdataListAPI(data)
    datalist.value = res
  }
  return {
    getdataList,
    datalist,
  }
})
export default useOutboundStore
