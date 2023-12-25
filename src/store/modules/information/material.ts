import { ref } from 'vue'
import materialApi from '@/api/modules/information/material.ts'

const useMaterialStore = defineStore('material', () => {
  const MaterialTreeData = ref([])
  const MaterialFormData = ref({
    Code: '',
    Name: '',
    ParentId: '',
    Remarks: '',
  })
  const MaterialCreateTime = ref('')
  const MaterialEditId = ref('')

  // 获取物料类型树形列表
  const getMaterialTreeData = async (data: NonNullable<unknown>) => {
    const { Data } = await materialApi.getMaterialTreeDataList(data)
    MaterialTreeData.value = Data
  }

  // 获取物料类型编辑详情
  const getEditMaterialData = async (id: NonNullable<object>) => {
    const { Data: { Code, Name, Remarks, ParentId, CreateTime, Id } } = await materialApi.getEditMaterialTreeDataList(id)
    MaterialFormData.value = {
      Code,
      Name,
      ParentId,
      Remarks,
    }
    MaterialCreateTime.value = CreateTime
    MaterialEditId.value = Id
  }

  return {
    MaterialTreeData,
    MaterialFormData,
    MaterialCreateTime,
    MaterialEditId,
    getMaterialTreeData,
    getEditMaterialData,
  }
})

export default useMaterialStore
