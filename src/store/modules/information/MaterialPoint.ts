import { ref } from 'vue'
import MaterialPointApi from '@/api/modules/information/MaterialPoint.ts'

const useMaterialPointStore = defineStore('MaterialPoint', () => {
  const MaterialPointData = ref([])
  const MaterialPointTotal = ref(0)
  const ByStorData = ref([])
  const AddMaterialPontFormData = ref({
    Code: '',
    LaneId: '',
    Name: '',
    StorId: '',
    Type: '',
  })
  const MaterialPontCreateTime = ref('')

  // 获取上下料点
  const getMaterialPointData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await MaterialPointApi.getMaterialPointDataList(data)
    MaterialPointData.value = Data
    MaterialPointTotal.value = Total
  }

  // 获取巷道
  const getByStorData = async (StorId: NonNullable<string>) => {
    const { Data } = await MaterialPointApi.getByStorDataList(StorId)
    ByStorData.value = Data
  }

  // 获取编辑料点详情
  const getEditMaterialPontData = async (id: NonNullable<object>) => {
    const { Data: { Code, LaneId, Name, StorId, Type, CreateTime } } = await MaterialPointApi.getEditMaterialPointDataList(id)
    AddMaterialPontFormData.value = {
      Code,
      LaneId,
      Name,
      StorId,
      Type,
    }
    MaterialPontCreateTime.value = CreateTime
  }

  return {
    MaterialPointData,
    MaterialPointTotal,
    ByStorData,
    AddMaterialPontFormData,
    MaterialPontCreateTime,
    getMaterialPointData,
    getByStorData,
    getEditMaterialPontData,
  }
})

export default useMaterialPointStore
