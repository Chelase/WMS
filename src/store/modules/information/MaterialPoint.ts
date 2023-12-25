import { ref } from 'vue'
import MaterialPointApi from "@/api/modules/information/MaterialPoint.ts";

const useMaterialPointStore = defineStore('MaterialPoint', () => {
  const MaterialPointData = ref([])
  const MaterialPointTotal = ref(0)

  const getMaterialPointData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await MaterialPointApi.getMaterialPointDataList(data)
    MaterialPointData.value = Data
    MaterialPointTotal.value = Total
  }

  return {
    MaterialPointData,
    MaterialPointTotal,
    getMaterialPointData,
  }
})

export default useMaterialPointStore
