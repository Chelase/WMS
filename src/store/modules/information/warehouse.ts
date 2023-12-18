import { ref } from 'vue'
import warehouseApi from '@/api/modules/information/warehouse.ts'

const useWarehouseStore = defineStore('warehouse', () => {
  const warehouseList = ref([])

  const getWarehouse = async (data: NonNullable<unknown>) => {
    const { Data } = await warehouseApi.getWarehouseDataList(data)
    warehouseList.value = Data
  }

  return {
    warehouseList,
    getWarehouse,
  }
})

export default useWarehouseStore
