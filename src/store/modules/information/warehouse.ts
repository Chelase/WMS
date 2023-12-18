import { ref } from 'vue'
import warehouseApi from '@/api/modules/information/warehouse.ts'

const useWarehouseStore = defineStore('warehouse', () => {
  const warehouseList = ref([])
  const Warehouse_Totals = ref(0)
  const RoadwayDataList = ref([])
  const RoadwayTotal = ref(0)
  const GoodsShelvesDataList = ref([])
  const GoodsShelvesTotal = ref(0)

  // 获取仓库列表
  const getWarehouse = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getWarehouseDataList(data)
    warehouseList.value = Data
    Warehouse_Totals.value = Total
  }

  // 新增仓库
  const AddWarehouseList = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddWarehouse(data)
  }

  // 删除仓库
  const delWarehouseData = async (array: NonNullable<unknown>) => {
    await warehouseApi.delWarehouseDataList(array)
  }

  // 获取巷道
  const getRoadwayData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getRoadwayDataList(data)
    RoadwayDataList.value = Data
    RoadwayTotal.value = Total
  }

  // 添加巷道
  const AddRoadwayData = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddRoadway(data)
  }

  // 获取货架
  const getGoodsShelvesData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getGoodsShelves(data)
    GoodsShelvesDataList.value = Data
    GoodsShelvesTotal.value = Total
  }

  return {
    warehouseList,
    Warehouse_Totals,
    RoadwayDataList,
    RoadwayTotal,
    GoodsShelvesDataList,
    GoodsShelvesTotal,
    getWarehouse,
    AddWarehouseList,
    delWarehouseData,
    getRoadwayData,
    AddRoadwayData,
    getGoodsShelvesData,
  }
})

export default useWarehouseStore
