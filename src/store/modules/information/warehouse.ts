import { ref } from 'vue'
import warehouseApi from '@/api/modules/information/warehouse.ts'

const useWarehouseStore = defineStore('warehouse', () => {
  const warehouseList = ref([])
  const Warehouse_Totals = ref(0)
  const WarehouseFormData = ref({
    Code: '',
    Name: '',
    Type: '',
    Remarks: '',
  })
  const CreateTimes = ref('')
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
    await warehouseApi.AddWarehouseDataList(data)
  }

  // 获取编辑仓库详情
  const GetEditWarehouseList = async (id: NonNullable<unknown>) => {
    const { Data: { Code, Name, Type, Remarks, CreateTime } } = await warehouseApi.GetEditWarehouseDataList(id)
    WarehouseFormData.value = {
      Code,
      Name,
      Type,
      Remarks,
    }
    CreateTimes.value = CreateTime
  }

  // 编辑仓库
  const EditWarehouseData = async (data: NonNullable<unknown>) => {
    await warehouseApi.EditWarehouseDataList(data)
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
    await warehouseApi.AddRoadwayDataList(data)
  }

  // 获取货架
  const getGoodsShelvesData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getGoodsShelvesDataList(data)
    GoodsShelvesDataList.value = Data
    GoodsShelvesTotal.value = Total
  }

  // 新增货架
  const AddGoodsShelvesData = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddGoodsShelvesDataList(data)
  }

  return {
    warehouseList,
    Warehouse_Totals,
    WarehouseFormData,
    CreateTimes,
    RoadwayDataList,
    RoadwayTotal,
    GoodsShelvesDataList,
    GoodsShelvesTotal,
    getWarehouse,
    AddWarehouseList,
    GetEditWarehouseList,
    EditWarehouseData,
    delWarehouseData,
    getRoadwayData,
    AddRoadwayData,
    getGoodsShelvesData,
    AddGoodsShelvesData,
  }
})

export default useWarehouseStore
