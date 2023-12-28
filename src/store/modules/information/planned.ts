import { ref } from 'vue'
import plannedApi from "@/api/modules/information/planned.ts";

const usePlannedStore = defineStore('planned', () => {
  // 计划列表
  const PlannedData = ref([])
  // 计划总条数
  const PlannedTotal = ref(0)

  // 获取计划列表
  const getPlannedData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await plannedApi.getPlannedDataList(data)
    PlannedData.value = Data
    PlannedTotal.value = Total
  }

  return {
    PlannedData,
    PlannedTotal,
    getPlannedData,
  }
})

export default usePlannedStore
