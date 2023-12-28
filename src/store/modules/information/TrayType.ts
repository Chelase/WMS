import { ref } from 'vue'
import TrayTypeApi from '@/api/modules/information/TrayType.ts'

const useTrayTypeStore = defineStore('TrayType', () => {
  // 托盘类型列表
  const TrayTypeData = ref([])
  // 托盘类型总页数
  const TrayTypeTotal = ref(0)
  // 托盘类型编辑数据
  const EditTrayTypeFrom = ref({
    Code: '',
    High: 0,
    IsZone: false,
    Length: 0,
    Name: '',
    Width: 0,
  })
  // 其他编辑需要的负载
  const TrayTypeEditForm = ref({
    CreatorId: '',
    CreateTime: '',
    Id: '',
  })
  // 分区管理数据
  const PartitioningData = ref([])
  // 分区编辑数据
  const EditAddPartitioningForm = ref({
    Code: '',
    IsDefault: false,
    Name: '',
    TrayTypeId: '',
    X: 0,
    Y: 0,
  })
  // 分区编辑其他负载
  const AddPartitioningEditForm = ref({
    Id: '',
    CreatorId: '',
    CreateTime: '',
  })
  // 托盘类型物料列表
  const TrayTypeBoMData = ref([])
  // 托盘类型物料总条数
  const TrayTypeBoMDataTotal = ref(0)

  // 获取托盘类型列表
  const getTrayTypeData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await TrayTypeApi.getTrayTypeDataList(data)
    TrayTypeData.value = Data
    TrayTypeTotal.value = Total
  }

  // 获取编辑托盘类型详情
  const getEditTrayTypeData = async (id: NonNullable<object>) => {
    const { Data: { Code, CreateTime, CreatorId, High, Id, IsZone, Length, Width, Name } } = await TrayTypeApi.getEditTrayTypeDataList(id)
    EditTrayTypeFrom.value = {
      Code,
      High,
      IsZone,
      Length,
      Name,
      Width,
    }
    TrayTypeEditForm.value = {
      CreatorId,
      CreateTime,
      Id,
    }
  }

  // 获取分区管理数据
  const getPartitioningData = async (typeId: NonNullable<string>) => {
    const { Data } = await TrayTypeApi.getPartitioningDataList(typeId)
    PartitioningData.value = Data
  }

  // 获取分区编辑详情
  const getEditPartitioningData = async (id: NonNullable<object>) => {
    const { Data: { Code, CreateTime, CreatorId, Id, IsDefault, Name, TrayTypeId, X, Y } } = await TrayTypeApi.getEditPartitioningDataList(id)
    EditAddPartitioningForm.value = {
      Code,
      IsDefault,
      Name,
      TrayTypeId,
      X,
      Y,
    }
    AddPartitioningEditForm.value = {
      Id,
      CreatorId,
      CreateTime,
    }
  }

  // 获取托盘类型物料清单
  const getTrayTypeBoMData = async (data: NonNullable<unknown>) => {
    const { Data, Total } = await TrayTypeApi.getTrayTypeBoMList(data)
    TrayTypeBoMData.value = Data
    TrayTypeBoMDataTotal.value = Total
  }

  return {
    TrayTypeData,
    TrayTypeTotal,
    EditTrayTypeFrom,
    TrayTypeEditForm,
    PartitioningData,
    EditAddPartitioningForm,
    AddPartitioningEditForm,
    TrayTypeBoMData,
    TrayTypeBoMDataTotal,
    getTrayTypeData,
    getEditTrayTypeData,
    getPartitioningData,
    getEditPartitioningData,
    getTrayTypeBoMData,
  }
})

export default useTrayTypeStore
