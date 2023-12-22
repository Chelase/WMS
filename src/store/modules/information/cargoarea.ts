import { ref } from 'vue'
import CargoAreaApi from '@/api/modules/information/CargoArea.ts'

const useCargoAreaStore = defineStore('CargoArea', () => {
  const CargoAreaData = ref([])
  const warehouseData = ref([])
  const QueryData = ref([])
  const CargoAreaFormData = ref({
    Code: '',
    Type: '',
    StorId: '',
    Name: '',
  })
  const CargoAreaTotal = ref(0)
  const CreateTimes = ref('')
  const BoMData = ref([])

  // 获取货区列表
  const getCargoAreaData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await CargoAreaApi.getCargoAreaDataList(data)
    CargoAreaData.value = Data
    CargoAreaTotal.value = Total
  }

  // 获取仓库
  const getCargoAreaWarehouseData = async () => {
    const { Data } = await CargoAreaApi.getCargoAreaWarehouseDataList()
    warehouseData.value = Data
  }

  // 获取货区
  const getQueryData = async () => {
    const { Data: { EnumItems } } = await CargoAreaApi.getQueryDataList()
    QueryData.value = EnumItems
  }

  // 添加货区
  const AddCargoAreaData = async (data: NonNullable<unknown>) => {
    await CargoAreaApi.AddCargoAreaDataList(data)
  }

  // 获取货区编辑详情
  const getEditCargoAreaData = async (id: NonNullable<unknown>) => {
    const { Data: { Code, Id, Name, Type, CreateTime } } = await CargoAreaApi.getEditCargoAreaDataList(id)
    CargoAreaFormData.value = {
      Code,
      Type,
      StorId: Id,
      Name,
    }
    CreateTimes.value = CreateTime
  }

  // 获取物料清单
  const getBoMData = async (data: NonNullable<unknown>) => {
    const { Data } = await CargoAreaApi.getBoMDataList(data)
    BoMData.value = Data
  }

  return {
    CargoAreaData,
    warehouseData,
    QueryData,
    CargoAreaFormData,
    CargoAreaTotal,
    CreateTimes,
    BoMData,
    getCargoAreaData,
    getCargoAreaWarehouseData,
    getQueryData,
    AddCargoAreaData,
    getEditCargoAreaData,
    getBoMData,
  }
})

export default useCargoAreaStore
