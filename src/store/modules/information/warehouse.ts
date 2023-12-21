import { ref } from 'vue'
import warehouseApi from '@/api/modules/information/warehouse.ts'

const useWarehouseStore = defineStore('warehouse', () => {
  const warehouseList = ref([])
  const Warehouse_Totals = ref(0)
  const WarehouseFormData = ref({
    code: '',
    name: '',
    type: '',
    remarks: '',
  })
  const CreateTimes = ref('')
  const SlideoverFormData = ref({
    Code: '',
    name: '',
  })
  const RoadwayDataList = ref([])
  const RoadwayTotal = ref(0)
  const GoodsShelvesDataList = ref([])
  const GoodsShelvesTotal = ref(0)

  // 获取仓库列表
  const getWarehouse = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getWarehouseDataList(data)
    if (Data) {
      warehouseList.value = Data
    }
    if (Total) {
      Warehouse_Totals.value = Total
    }
  }

  // 新增及编辑仓库
  const AddWarehouseList = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddWarehouseDataList(data)
  }

  // 获取编辑仓库详情
  const GetEditWarehouseList = async (id: NonNullable<unknown>) => {
    const { Data: { Code, Name, Type, Remarks, CreateTime } } = await warehouseApi.GetEditWarehouseDataList(id)
    WarehouseFormData.value = {
      code: Code,
      name: Name,
      type: Type,
      remarks: Remarks,
    }
    CreateTimes.value = CreateTime
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

  // 获取编辑巷道详情
  const getEditRoadwaySlideoverData = async (id: NonNullable<unknown>) => {
    const { Data: { Code, Name, CreateTime } } = await warehouseApi.GetEditRoadwaySlideover(id)
    SlideoverFormData.value = {
      Code,
      name: Name,
    }
    CreateTimes.value = CreateTime
  }

  // 添加巷道
  const AddRoadwayData = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddRoadwayDataList(data)
  }

  // 删除巷道
  const delRoadwaySlideoverData = async (array: NonNullable<unknown>) => {
    await warehouseApi.delRoadwaySlideoverDataList(array)
  }

  // 获取货架
  const getGoodsShelvesData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await warehouseApi.getGoodsShelvesDataList(data)
    GoodsShelvesDataList.value = Data
    GoodsShelvesTotal.value = Total
  }

  // 获取编辑货架详情
  const getEditGoodsShelvesData = async (id: NonNullable<unknown>) => {
    const { Data: { Code, Name, CreateTime } } = await warehouseApi.GetEditGoodsShelvesData(id)
    SlideoverFormData.value = {
      Code,
      name: Name,
    }
    CreateTimes.value = CreateTime
  }

  // 新增及编辑货架
  const AddGoodsShelvesData = async (data: NonNullable<unknown>) => {
    await warehouseApi.AddGoodsShelvesDataList(data)
  }

  // 删除货架
  const delGoodsShelvesData = async (array: NonNullable<unknown>) => {
    await warehouseApi.delGoodsShelvesDataList(array)
  }

  return {
    warehouseList,
    Warehouse_Totals,
    WarehouseFormData,
    CreateTimes,
    SlideoverFormData,
    RoadwayDataList,
    RoadwayTotal,
    GoodsShelvesDataList,
    GoodsShelvesTotal,
    getWarehouse,
    AddWarehouseList,
    GetEditWarehouseList,
    delWarehouseData,
    getRoadwayData,
    getEditRoadwaySlideoverData,
    AddRoadwayData,
    delRoadwaySlideoverData,
    getGoodsShelvesData,
    getEditGoodsShelvesData,
    AddGoodsShelvesData,
    delGoodsShelvesData,
  }
})

export default useWarehouseStore
